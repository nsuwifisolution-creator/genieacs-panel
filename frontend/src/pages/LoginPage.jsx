import { useState } from "react";
import api from "../api/client";
import Sidebar from "../components/Sidebar";

export default function LogsPage() {
  const [service, setService] = useState("genieacs-cwmp");
  const [logs, setLogs] = useState("");

  const loadLogs = async () => {
    try {
      const response = await api.get(`/logs/services/${service}`);
      setLogs(response.data.logs || "");
    } catch (error) {
      setLogs("Failed to fetch logs.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto md:pt-0 pt-16 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Logs</h1>
        <p className="mt-1 text-slate-500">Service health and operational debugging</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="genieacs-cwmp">genieacs-cwmp</option>
            <option value="genieacs-nbi">genieacs-nbi</option>
            <option value="genieacs-fs">genieacs-fs</option>
            <option value="genieacs-ui">genieacs-ui</option>
          </select>

          <button
            onClick={loadLogs}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Load logs
          </button>
        </div>

        <pre className="mt-6 min-h-[320px] overflow-auto rounded-2xl bg-slate-900 p-4 text-sm text-slate-100">
          {logs || "No logs loaded yet."}
        </pre>
      </main>
    </div>
  );
}
