import { useEffect, useState } from "react";
import { Activity, Wifi, ServerCog, AlertCircle } from "lucide-react";
import api from "../api/client";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DashboardPage() {
  const [devices, setDevices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [devicesRes, tasksRes] = await Promise.all([
          api.get("/devices?query={}"),
          api.get("/tasks?query={}")
        ]);

        setDevices(devicesRes.data.devices || []);
        setTasks(tasksRes.data.tasks || []);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onlineCount = devices.filter((d) => d.online).length;
  const pendingTasks = tasks.filter((t) => t.status !== "completed").length;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-auto md:pt-0 pt-16 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Monitoring overview for GenieACS infrastructure</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              <StatCard title="Total Devices" value={devices.length || 0} icon={ServerCog} tone="blue" />
              <StatCard title="Online" value={onlineCount} icon={Wifi} tone="green" />
              <StatCard title="Active Tasks" value={pendingTasks} icon={Activity} tone="amber" />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Recent device status</h2>

              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">Device ID</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">Vendor</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">Model</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(devices || []).slice(0, 8).map((device) => (
                      <tr key={device._id || device.id} className="border-t border-slate-200">
                        <td className="px-4 py-3 text-sm text-slate-700">{device._id || device.id}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{device.vendor || "-"}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{device.productClass || device.model || "-"}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`rounded-full px-2 py-1 ${
                              device.online
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200 text-slate-700"
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
            </div>
          </>
        )}
      </main>
    </div>
  );
}
