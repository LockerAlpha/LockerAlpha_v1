import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span>Locker</span>
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/donate">Donate</Link>
      </nav>
    </header>
  );
}

export default Header;
