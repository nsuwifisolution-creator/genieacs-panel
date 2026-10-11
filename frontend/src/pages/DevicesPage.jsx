import { useEffect, useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import api from "../api/client";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [query, setQuery] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/devices?query=${encodeURIComponent(query)}`);
      setDevices(response.data.devices || []);
    } catch (err) {
      setError("Failed to load devices");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto md:pt-0 pt-16 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Devices</h1>
            <p className="text-slate-500">Manage and search connected CPE devices ({devices.length})</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter JSON query: {\"online\":true} or leave empty for all"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
          </div>
          <button
            onClick={loadDevices}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Search size={16} />
            Search
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Device ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Vendor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Model</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Last Inform</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device._id || device.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-sm text-slate-700 font-mono">{device._id || device.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{device.vendor || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{device.productClass || device.model || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{device.lastInform || "-"}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 ${
                          device.online ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {device.online ? "Online" : "Offline"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
