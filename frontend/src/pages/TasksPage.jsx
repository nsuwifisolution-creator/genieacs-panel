import { useEffect, useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import api from "../api/client";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: "",
    taskType: "reboot",
    parameter: "",
    value: ""
  });

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/tasks?query={}");
      setTasks(response.data.tasks || []);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: formData.taskType,
        status: "pending"
      };

      if (formData.taskType === "setParameter") {
        payload.parameterValues = { [formData.parameter]: formData.value };
      } else if (formData.taskType === "getParameter") {
        payload.parameterNames = [formData.parameter];
      }

      await api.post(`/tasks/${formData.deviceId}`, payload);
      setFormData({ deviceId: "", taskType: "reboot", parameter: "", value: "" });
      setIsModalOpen(false);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto md:pt-0 pt-16 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
            <p className="text-slate-500">Provisioning and remote actions</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Task ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Created</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id || task.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-sm text-slate-700 font-mono">{task._id || task.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{task.name || "-"}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{task.created || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isModalOpen} title="Create New Task" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Device ID</label>
              <input
                type="text"
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Task Type</label>
              <select
                value={formData.taskType}
                onChange={(e) => setFormData({ ...formData, taskType: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="reboot">Reboot</option>
                <option value="factoryReset">Factory Reset</option>
                <option value="setParameter">Set Parameter</option>
                <option value="getParameter">Get Parameter</option>
              </select>
            </div>

            {(formData.taskType === "setParameter" || formData.taskType === "getParameter") && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Parameter</label>
                <input
                  type="text"
                  value={formData.parameter}
                  onChange={(e) => setFormData({ ...formData, parameter: e.target.value })}
                  placeholder="e.g., InternetGatewayDevice.ManagementServer.URL"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  required
                />
              </div>
            )}

            {formData.taskType === "setParameter" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  required
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
