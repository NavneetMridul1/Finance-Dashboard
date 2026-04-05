import BalanceTrendChart from './BalanceTrendChart';
import CategoryBreakdownChart from './CategoryBreakdownChart';
import SummaryCards from './SummaryCards';

const OverviewSection = ({ totals, trendData, breakdownData }) => {
  return (
    <section className="mb-4" aria-label="Dashboard overview">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Overview</h2>
      </div>

      <SummaryCards totals={totals} />

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <BalanceTrendChart data={trendData} />
        </div>
        <div className="col-12 col-lg-5">
          <CategoryBreakdownChart data={breakdownData} />
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
