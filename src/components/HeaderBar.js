const HeaderBar = ({ selectedRole, onRoleChange, selectedTheme, onThemeToggle }) => {
  const isDarkMode = selectedTheme === 'dark';

  return (
    <header className="dashboard-header py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="d-flex align-items-center gap-3">
          <img src="/finance-logo.svg" alt="Finance Dashboard logo" className="finance-logo" />
          <div>
            <h1 className="h3 mb-1">Finance Dashboard</h1>
            <p className="text-secondary mb-0">Track balance, understand spending, and monitor transaction activity.</p>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end gap-3">
          <div className="form-check form-switch theme-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="themeSwitch"
              checked={isDarkMode}
              onChange={onThemeToggle}
            />
            <label className="form-check-label fw-semibold" htmlFor="themeSwitch">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>

          <div className="role-select-wrap">
            <label htmlFor="roleSelect" className="form-label mb-1 fw-semibold">
              Role
            </label>
            <select
              id="roleSelect"
              className="form-select"
              value={selectedRole}
              onChange={(event) => onRoleChange(event.target.value)}
            >
              <option value="viewer">Viewer (read-only)</option>
              <option value="admin">User (can add/edit)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
