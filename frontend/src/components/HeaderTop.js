import "./HeaderTop.css";

const HeaderTop = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar3">
        <img className="logo-1-icon12" alt="" src="/logo-1@2x.png" />
        <div className="home-parent1">
          <b className="home4">Home</b>
          <b className="home4">About</b>
          <b className="home4">Contact</b>
          <div className="user-wrapper">
            <img className="user-icon" alt="" src="/user@2x.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
