import { formatCurrency } from '../utils/formatters';

const SummaryCards = ({ totals }) => {
  const cards = [
    {
      label: 'Total Balance',
      value: totals.totalBalance,
      tone: totals.totalBalance >= 0 ? 'success' : 'danger',
    },
    {
      label: 'Income',
      value: totals.totalIncome,
      tone: 'primary',
    },
    {
      label: 'Expenses',
      value: totals.totalExpenses,
      tone: 'warning',
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-12 col-md-4" key={card.label}>
          <article className={`summary-card card h-100 border-${card.tone}`}>
            <div className="card-body">
              <p className="text-secondary mb-1">{card.label}</p>
              <h2 className={`h4 mb-0 text-${card.tone}`}>{formatCurrency(card.value)}</h2>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
