import EmptyState from './EmptyState';
import { formatCurrency, formatDate } from '../utils/formatters';

const TransactionsTable = ({ transactions, selectedRole, onEdit }) => {
  if (!transactions.length) {
    return (
      <EmptyState
        title="No transactions found"
        message="Try changing your filters or add a new transaction as admin."
      />
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle table-hover mb-0">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col" className="text-end">
              Amount
            </th>
            <th scope="col" className="text-end">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const amountClass = transaction.type === 'income' ? 'text-success' : 'text-danger';

            return (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>
                  <span className={`badge rounded-pill ${transaction.type === 'income' ? 'text-bg-success' : 'text-bg-danger'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className={`text-end fw-semibold ${amountClass}`}>{formatCurrency(transaction.amount)}</td>
                <td className="text-end">
                  {selectedRole === 'admin' ? (
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => onEdit(transaction)}>
                      Edit
                    </button>
                  ) : (
                    <span className="text-muted small">Read-only</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
