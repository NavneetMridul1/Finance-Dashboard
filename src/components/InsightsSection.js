import EmptyState from './EmptyState';
import { formatCurrency } from '../utils/formatters';

const InsightsSection = ({ insights }) => {
  const { highestSpendingCategory, monthlyComparison, largestExpense } = insights;

  if (!highestSpendingCategory && !monthlyComparison && !largestExpense) {
    return (
      <section aria-label="Insights">
        <h2 className="h5 mb-3">Insights</h2>
        <EmptyState
          title="No insights yet"
          message="Add more transactions to generate spending insights and monthly comparisons."
        />
      </section>
    );
  }

  return (
    <section aria-label="Insights">
      <h2 className="h5 mb-3">Insights</h2>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Highest Spending Category</p>
              {highestSpendingCategory ? (
                <>
                  <h3 className="h6 mb-1">{highestSpendingCategory.category}</h3>
                  <p className="mb-0 text-danger fw-semibold">{formatCurrency(highestSpendingCategory.amount)}</p>
                </>
              ) : (
                <p className="mb-0 text-muted">No expense data yet.</p>
              )}
            </div>
          </article>
        </div>

        <div className="col-12 col-md-4">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Monthly Expense Comparison</p>
              {monthlyComparison ? (
                <>
                  <h3 className="h6 mb-1">{monthlyComparison.latestMonth} vs {monthlyComparison.previousMonth}</h3>
                  <p className={`mb-0 fw-semibold ${monthlyComparison.change > 0 ? 'text-danger' : 'text-success'}`}>
                    {monthlyComparison.change > 0 ? 'Up' : 'Down'} by {formatCurrency(Math.abs(monthlyComparison.change))}
                  </p>
                </>
              ) : (
                <p className="mb-0 text-muted">Need at least two months of data.</p>
              )}
            </div>
          </article>
        </div>

        <div className="col-12 col-md-4">
          <article className="card h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Largest Single Expense</p>
              {largestExpense ? (
                <>
                  <h3 className="h6 mb-1">{largestExpense.description}</h3>
                  <p className="mb-0 text-danger fw-semibold">{formatCurrency(largestExpense.amount)}</p>
                </>
              ) : (
                <p className="mb-0 text-muted">No expense data available.</p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
