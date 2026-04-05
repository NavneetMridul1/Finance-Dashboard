import TransactionFilters from './TransactionFilters';
import TransactionsTable from './TransactionsTable';

const TransactionsSection = ({
  filters,
  categories,
  selectedRole,
  transactions,
  onFiltersChange,
  onResetFilters,
  onAdd,
  onEdit,
}) => {
  return (
    <section className="mb-4" aria-label="Transactions">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h2 className="h5 mb-0">Transactions</h2>
        {selectedRole === 'admin' ? (
          <button className="btn btn-primary" type="button" onClick={onAdd}>
            Add Transaction
          </button>
        ) : (
          <span className="badge text-bg-light border text-secondary px-3 py-2">Viewer mode: read-only</span>
        )}
      </div>

      <TransactionFilters
        filters={filters}
        categories={categories}
        onFiltersChange={onFiltersChange}
        onReset={onResetFilters}
      />

      <div className="card">
        <div className="card-body p-0">
          <TransactionsTable transactions={transactions} selectedRole={selectedRole} onEdit={onEdit} />
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;
