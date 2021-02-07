import userIcon from '../../images/user.svg';
import './Header.styles.css';

const Header = () => (
  <header>
    <div className="header-container max-width-limit">
      <h1 className="logo-title">
        <a href="./">MK Bookstore</a>
      </h1>
      <nav className="top-nav">
        <ul>
          <li><a href="/" className="active">Books</a></li>
          <li><a href="./#">Category</a></li>
        </ul>
        <picture className="profile-pic-container">
          <img className="profile-pic" src={userIcon} alt="User Icon" />
        </picture>
      </nav>
    </div>
  </header>
);

export default Header;
