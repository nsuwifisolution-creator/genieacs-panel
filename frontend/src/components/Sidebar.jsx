import { Dashboard, Server, ListTodo, FolderCog, FileText, LogOut, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: Dashboard, to: "/" },
  { label: "Devices", icon: Server, to: "/devices" },
  { label: "Tasks", icon: ListTodo, to: "/tasks" },
  { label: "Presets", icon: FolderCog, to: "/presets" },
  { label: "Users", icon: Users, to: "/users" },
  { label: "Logs", icon: FileText, to: "/logs" }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white md:hidden"
      >
        ☰
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 w-72 min-h-screen bg-slate-900 text-white transition-transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">GenieACS Panel</h1>
          <p className="text-sm text-slate-400 mt-1">ISP Operations Suite</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          <button
            onClick={logout}
            className="mt-6 flex w-full items-center gap-3 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
