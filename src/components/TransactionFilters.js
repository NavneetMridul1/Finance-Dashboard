const TransactionFilters = ({ filters, categories, onFiltersChange, onReset }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <label htmlFor="searchText" className="form-label">
              Search
            </label>
            <input
              id="searchText"
              type="text"
              className="form-control"
              placeholder="Search by description or category"
              value={filters.searchText}
              onChange={(event) => onFiltersChange({ searchText: event.target.value })}
            />
          </div>

          <div className="col-6 col-md-2">
            <label htmlFor="typeFilter" className="form-label">
              Type
            </label>
            <select
              id="typeFilter"
              className="form-select"
              value={filters.typeFilter}
              onChange={(event) => onFiltersChange({ typeFilter: event.target.value })}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label htmlFor="categoryFilter" className="form-label">
              Category
            </label>
            <select
              id="categoryFilter"
              className="form-select"
              value={filters.categoryFilter}
              onChange={(event) => onFiltersChange({ categoryFilter: event.target.value })}
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label htmlFor="sortBy" className="form-label">
              Sort By
            </label>
            <select
              id="sortBy"
              className="form-select"
              value={filters.sortBy}
              onChange={(event) => onFiltersChange({ sortBy: event.target.value })}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label htmlFor="sortDir" className="form-label">
              Direction
            </label>
            <select
              id="sortDir"
              className="form-select"
              value={filters.sortDir}
              onChange={(event) => onFiltersChange({ sortDir: event.target.value })}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-outline-secondary" type="button" onClick={onReset}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
