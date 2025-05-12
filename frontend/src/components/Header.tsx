import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Checkpoint : frontend</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Accueil
          </Link>
          <Link to="/add" className="nav-link">
            Ajouter un pays
          </Link>
        </nav>
      </div>
    </header>
  );
}
