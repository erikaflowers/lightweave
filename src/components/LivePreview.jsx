export default function LivePreview() {
  return (
    <div className="lw-preview">
      <h3 className="lw-preview-title">Live Preview</h3>

      <div className="lw-preview-panel">
        {/* Sidebar mockup */}
        <div className="lw-preview-sidebar">
          <div className="lw-preview-sidebar-item lw-preview-sidebar-active">
            <div className="lw-preview-dot" />
            <span>Dashboard</span>
          </div>
          <div className="lw-preview-sidebar-item">
            <div className="lw-preview-dot lw-preview-dot-muted" />
            <span>Settings</span>
          </div>
          <div className="lw-preview-sidebar-item">
            <div className="lw-preview-dot lw-preview-dot-muted" />
            <span>Reports</span>
          </div>
        </div>

        {/* Main content mockup */}
        <div className="lw-preview-main">
          {/* Card */}
          <div className="lw-preview-card">
            <h4 className="lw-preview-card-title">Sample Card</h4>
            <p className="lw-preview-card-text">This text shows how your primary and secondary text colors look on a card surface.</p>
            <p className="lw-preview-card-muted">Muted helper text appears here.</p>
          </div>

          {/* Buttons */}
          <div className="lw-preview-buttons">
            <button className="lw-preview-btn-primary">Primary Action</button>
            <button className="lw-preview-btn-secondary">Secondary</button>
          </div>

          {/* Status badges */}
          <div className="lw-preview-statuses">
            <span className="lw-preview-badge lw-preview-badge-success">Success</span>
            <span className="lw-preview-badge lw-preview-badge-error">Error</span>
            <span className="lw-preview-badge lw-preview-badge-warning">Warning</span>
          </div>

          {/* Chat mockup */}
          <div className="lw-preview-chat">
            <div className="lw-preview-msg-user">
              <p style={{ fontFamily: 'var(--lw-font-chat)' }}>What does the fox say?</p>
            </div>
            <div className="lw-preview-msg-asst">
              <p style={{ fontFamily: 'var(--lw-font-chat)' }}>Ring-ding-ding-ding-dingeringeding! At least, that's what Ylvis tells us.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
