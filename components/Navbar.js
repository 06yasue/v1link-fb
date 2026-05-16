export default function Navbar() {
  return (
    <nav className="navbar navbar-default navbar-fixed-top" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: 'none', background: '#fff' }}>
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/" style={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center' }}>
            <i className="material-icons" style={{ marginRight: '8px', color: '#337ab7' }}>bolt</i> V1LINK
          </a>
        </div>

        <div className="collapse navbar-collapse" id="navbar-menu">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/link"><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '5px' }}>add_link</i> Buat Link</a></li>
            <li><a href="/list"><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '5px' }}>analytics</i> Statistik</a></li>
            <li><a href="/settings"><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '5px' }}>settings</i> Pengaturan</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
