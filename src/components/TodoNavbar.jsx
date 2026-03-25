import { useState } from "react";
import "./TodoNavbar.css";
import { Link } from "react-router-dom";
import { useUser } from "../Store/userContext";
export const TodoNavbar=({ onSearchChange, onFilterChange, onToggleTheme })=>{
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const {user} = useUser();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value); // Prop function to filter todos
  };

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value); // Prop function to filter by category or status
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return(
    <nav className="navbar">
      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <select onChange={handleFilterChange} className="filter-dropdown">
        <option value="all">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="urgent">Urgent</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
<label className="theme-toggle">
        <input type="checkbox" onChange={onToggleTheme} />
        <span className="slider"></span>
      </label>

      <div className="profile-section">
        <img
          src={user?.profileImage || "/default-profile.png"} // Replace with actual avatar path or use a placeholder
          alt="Profile"
          className="profile-pic"
          onClick={toggleMenu}
        />
        {showMenu && (
          <ul className="profile-menu">
            {/* <li><Link to="/profile" onClick={()=>setShowMenu(false)}>Profile</Link></li> */}
            <li><Link to="/settings" onClick={()=>setShowMenu(false)}>Setting</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );

};