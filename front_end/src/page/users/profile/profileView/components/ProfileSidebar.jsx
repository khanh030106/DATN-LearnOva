import { ChevronRight, LogOut, Sparkles } from "lucide-react";
import { sidebarItems } from "../data/profileData";

const ProfileSidebar = ({ activeTab, setActiveTab }) => (
  <aside className="profile-sidebar">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h2>Account</h2>
        <Sparkles size={18} />
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              type="button"
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  </aside>
);

export default ProfileSidebar;
