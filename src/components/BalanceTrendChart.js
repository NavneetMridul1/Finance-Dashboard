import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import EmptyState from './EmptyState';

const BalanceTrendChart = ({ data }) => {
  if (!data.length) {
    return (
      <EmptyState
        title="No trend data"
        message="Add transactions to generate a month-by-month balance trend."
      />
    );
  }

  return (
    <div className="chart-card card h-100">
      <div className="card-body">
        <h3 className="h6 mb-3">Balance Trend</h3>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#0d6efd"
                fillOpacity={1}
                fill="url(#balanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BalanceTrendChart;
