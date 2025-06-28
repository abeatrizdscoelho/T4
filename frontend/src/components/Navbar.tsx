import { Link } from 'react-router-dom';
import './style.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-purple">
      <div className="container justify-content-center">
        <Link className="navbar-brand logo-text" to="/">World Beauty</Link>
      </div>
    </nav>
  );
}
