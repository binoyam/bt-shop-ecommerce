import { Link } from "react-router-dom";
import "./Nav.css";
import MenuIcon from "../../Assets/Images/icon-menu.svg";
import CloseMenuIcon from "../../Assets/Images/close-for-menu.svg";

function Nav({ isMenuOpen, setIsMenuOpen }) {
  /* OPEN MENU BUTTON FUNCTON */
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  /* CLOSE MENU BUTTON FUNCTON */
  function closeMenu() {
    setIsMenuOpen(false);
  }

  /* CLOSE MENU AFTER CATEGORY SELECTION */
  const handleClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      {!isMenuOpen ? (
        <button onClick={toggleMenu} className="menu-btn">
          <img src={MenuIcon} alt="menu" />
        </button>
      ) : (
        <button onClick={closeMenu} className="close-menu-btn">
          <img src={CloseMenuIcon} alt="close menu" />
        </button>
      )}

      <ul className={isMenuOpen ? "nav-links show" : "nav-links hide"}>
        <li>
          <Link onClick={() => handleClick()} to="/home" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClick()}
            to="/categories/all"
            className="nav-link"
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClick()}
            to="/categories/mens-clothing"
            className="nav-link"
          >
            Men
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClick()}
            to="/categories/womens-clothing"
            className="nav-link"
          >
            Women
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
