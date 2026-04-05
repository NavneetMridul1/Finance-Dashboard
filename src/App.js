import { useMemo, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import InsightsSection from './components/InsightsSection';
import OverviewSection from './components/OverviewSection';
import TransactionFormModal from './components/TransactionFormModal';
import TransactionsSection from './components/TransactionsSection';
import { useAppContext } from './context/AppContext';
import {
  getCategories,
  getExpenseCategoryBreakdown,
  getFilteredSortedTransactions,
  getInsights,
  getMonthlyTrend,
  getTotals,
} from './utils/selectors';
import './App.css';

const createTransactionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `txn-${Date.now()}`;
};

function App() {
  const {
    transactions,
    selectedRole,
    selectedTheme,
    filters,
    setRole,
    setTheme,
    setFilters,
    resetFilters,
    addTransaction,
    updateTransaction,
  } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const categories = useMemo(() => getCategories(transactions), [transactions]);

  const filteredTransactions = useMemo(
    () => getFilteredSortedTransactions(transactions, filters),
    [transactions, filters]
  );

  const totals = useMemo(() => getTotals(transactions), [transactions]);
  const trendData = useMemo(() => getMonthlyTrend(transactions), [transactions]);
  const breakdownData = useMemo(() => getExpenseCategoryBreakdown(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  const handleCreate = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleFormSubmit = (formValues) => {
    if (editingTransaction) {
      updateTransaction({ ...formValues, id: editingTransaction.id });
    } else {
      addTransaction({ ...formValues, id: createTransactionId() });
    }

    closeModal();
  };

  const handleThemeToggle = () => {
    setTheme(selectedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`dashboard-page theme-${selectedTheme}`}>
      <main className="container py-4">
        <HeaderBar
          selectedRole={selectedRole}
          onRoleChange={setRole}
          selectedTheme={selectedTheme}
          onThemeToggle={handleThemeToggle}
        />

        <OverviewSection totals={totals} trendData={trendData} breakdownData={breakdownData} />

        <TransactionsSection
          filters={filters}
          categories={categories}
          selectedRole={selectedRole}
          transactions={filteredTransactions}
          onFiltersChange={setFilters}
          onResetFilters={resetFilters}
          onAdd={handleCreate}
          onEdit={handleEdit}
        />

        <InsightsSection insights={insights} />
      </main>

      <TransactionFormModal
        isOpen={isModalOpen}
        transaction={editingTransaction}
        existingCategories={categories}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
