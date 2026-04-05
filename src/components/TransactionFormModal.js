import { useEffect, useMemo, useState } from 'react';

const getInitialForm = (transaction) => ({
  id: transaction?.id || null,
  date: transaction?.date || '',
  description: transaction?.description || '',
  category: transaction?.category || '',
  type: transaction?.type || 'expense',
  amount: transaction?.amount || '',
});

const TransactionFormModal = ({ isOpen, transaction, existingCategories, onClose, onSubmit }) => {
  const [form, setForm] = useState(getInitialForm(transaction));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(getInitialForm(transaction));
    setErrors({});
  }, [transaction, isOpen]);

  const categories = useMemo(() => existingCategories.filter(Boolean), [existingCategories]);

  if (!isOpen) {
    return null;
  }

  const validate = () => {
    const nextErrors = {};

    if (!form.date) {
      nextErrors.date = 'Date is required.';
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Description is required.';
    }

    if (!form.category.trim()) {
      nextErrors.category = 'Category is required.';
    }

    if (!form.amount || Number(form.amount) <= 0) {
      nextErrors.amount = 'Amount must be greater than 0.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...form,
      description: form.description.trim(),
      category: form.category.trim(),
      amount: Number(form.amount),
    });
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h3 className="modal-title h5 mb-0">{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="transactionDate">
                    Date
                  </label>
                  <input
                    id="transactionDate"
                    type="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    value={form.date}
                    onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                  />
                  {errors.date ? <div className="invalid-feedback">{errors.date}</div> : null}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="transactionDescription">
                    Description
                  </label>
                  <input
                    id="transactionDescription"
                    type="text"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    placeholder="Example: Grocery Shopping"
                    value={form.description}
                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  />
                  {errors.description ? <div className="invalid-feedback">{errors.description}</div> : null}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="transactionCategory">
                    Category
                  </label>
                  <input
                    id="transactionCategory"
                    type="text"
                    list="transactionCategoryList"
                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                    placeholder="Food, Salary, Travel"
                    value={form.category}
                    onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                  />
                  <datalist id="transactionCategoryList">
                    {categories.map((category) => (
                      <option value={category} key={category} />
                    ))}
                  </datalist>
                  {errors.category ? <div className="invalid-feedback">{errors.category}</div> : null}
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label" htmlFor="transactionType">
                      Type
                    </label>
                    <select
                      id="transactionType"
                      className="form-select"
                      value={form.type}
                      onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label className="form-label" htmlFor="transactionAmount">
                      Amount
                    </label>
                    <input
                      id="transactionAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                      placeholder="0.00"
                      value={form.amount}
                      onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                    />
                    {errors.amount ? <div className="invalid-feedback">{errors.amount}</div> : null}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {transaction ? 'Save Changes' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
};

export default TransactionFormModal;
