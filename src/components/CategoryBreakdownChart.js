import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/formatters';
import EmptyState from './EmptyState';

const COLORS = ['#198754', '#0d6efd', '#dc3545', '#ffc107', '#20c997', '#6f42c1', '#fd7e14'];

const CategoryBreakdownChart = ({ data }) => {
  if (!data.length) {
    return (
      <EmptyState
        title="No expense categories"
        message="Expense categories will appear here once expense transactions are available."
      />
    );
  }

  return (
    <div className="chart-card card h-100">
      <div className="card-body">
        <h3 className="h6 mb-3">Spending Breakdown</h3>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="amount" nameKey="category" outerRadius={90} innerRadius={45} label>
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
