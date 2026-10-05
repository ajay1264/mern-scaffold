import { NavLink } from "react-router-dom";

import {
  Home,
  CheckSquare,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink
          to="/"
          className="sidebar-link"
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className="sidebar-link"
        >
          <CheckSquare size={18} />
          <span>Tasks</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;