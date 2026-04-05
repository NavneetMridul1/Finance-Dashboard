import { toMonthKey, toMonthLabel } from './formatters';

const sortTransactions = (transactions, sortBy, sortDir) => {
  const direction = sortDir === 'asc' ? 1 : -1;

  return [...transactions].sort((first, second) => {
    if (sortBy === 'amount') {
      return (Number(first.amount) - Number(second.amount)) * direction;
    }

    if (sortBy === 'category') {
      return first.category.localeCompare(second.category) * direction;
    }

    return (new Date(first.date) - new Date(second.date)) * direction;
  });
};

export const getTotals = (transactions) => {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    totalBalance: income - expenses,
  };
};

export const getCategories = (transactions) => {
  const categorySet = new Set();
  transactions.forEach((transaction) => categorySet.add(transaction.category));
  return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
};

export const getFilteredSortedTransactions = (transactions, filters) => {
  const { searchText, typeFilter, categoryFilter, sortBy, sortDir } = filters;
  const searchValue = searchText.trim().toLowerCase();

  const filtered = transactions.filter((transaction) => {
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;

    const matchesSearch =
      !searchValue ||
      transaction.description.toLowerCase().includes(searchValue) ||
      transaction.category.toLowerCase().includes(searchValue);

    return matchesType && matchesCategory && matchesSearch;
  });

  return sortTransactions(filtered, sortBy, sortDir);
};

export const getMonthlyTrend = (transactions) => {
  const monthMap = transactions.reduce((accumulator, transaction) => {
    const monthKey = toMonthKey(transaction.date);
    if (!monthKey) {
      return accumulator;
    }

    if (!accumulator[monthKey]) {
      accumulator[monthKey] = { monthKey, income: 0, expenses: 0 };
    }

    if (transaction.type === 'income') {
      accumulator[monthKey].income += Number(transaction.amount);
    } else {
      accumulator[monthKey].expenses += Number(transaction.amount);
    }

    return accumulator;
  }, {});

  return Object.values(monthMap)
    .sort((first, second) => first.monthKey.localeCompare(second.monthKey))
    .map((entry) => ({
      month: toMonthLabel(entry.monthKey),
      income: Number(entry.income.toFixed(2)),
      expenses: Number(entry.expenses.toFixed(2)),
      balance: Number((entry.income - entry.expenses).toFixed(2)),
    }));
};

export const getExpenseCategoryBreakdown = (transactions) => {
  const categoryTotals = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] = (accumulator[transaction.category] || 0) + Number(transaction.amount);
      return accumulator;
    }, {});

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount: Number(amount.toFixed(2)) }))
    .sort((first, second) => second.amount - first.amount);
};

export const getInsights = (transactions) => {
  if (!transactions.length) {
    return {
      highestSpendingCategory: null,
      monthlyComparison: null,
      largestExpense: null,
    };
  }

  const breakdown = getExpenseCategoryBreakdown(transactions);
  const trend = getMonthlyTrend(transactions);

  const highestSpendingCategory = breakdown.length ? breakdown[0] : null;

  const largestExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .sort((first, second) => Number(second.amount) - Number(first.amount))[0] || null;

  let monthlyComparison = null;
  if (trend.length >= 2) {
    const latest = trend[trend.length - 1];
    const previous = trend[trend.length - 2];

    monthlyComparison = {
      latestMonth: latest.month,
      previousMonth: previous.month,
      latestExpenses: latest.expenses,
      previousExpenses: previous.expenses,
      change: Number((latest.expenses - previous.expenses).toFixed(2)),
    };
  }

  return {
    highestSpendingCategory,
    monthlyComparison,
    largestExpense,
  };
};
