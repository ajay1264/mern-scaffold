import { LogOut, User } from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2>MERN Task</h2>
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <div className="user-info">
              <User size={18} />
              <span>{user.name}</span>
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;