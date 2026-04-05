const EmptyState = ({ title, message }) => {
  return (
    <div className="empty-state text-center p-4 border rounded-3 bg-light-subtle">
      <h6 className="fw-semibold mb-2">{title}</h6>
      <p className="text-secondary mb-0">{message}</p>
    </div>
  );
};

export default EmptyState;
