import { useEffect, useState } from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import api from "../api/client";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PresetsPage() {
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "general",
    description: "",
    config: "{}"
  });

  const loadPresets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/presets");
      setPresets(response.data || []);
    } catch (err) {
      setError("Failed to load presets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresets();
  }, []);

  const handleCreatePreset = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        config: JSON.parse(formData.config || "{}")
      };

      await api.post("/presets", payload);
      setFormData({ name: "", category: "general", description: "", config: "{}" });
      setIsModalOpen(false);
      await loadPresets();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create preset");
    }
  };

  const handleDeletePreset = async (id) => {
    if (!confirm("Delete this preset?")) return;
    try {
      await api.delete(`/presets/${id}`);
      await loadPresets();
    } catch (err) {
      setError("Failed to delete preset");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto md:pt-0 pt-16 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Presets</h1>
            <p className="text-slate-500">Reusable configuration templates</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus size={16} />
            New Preset
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {presets.map((preset) => (
                  <tr key={preset._id} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{preset.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{preset.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{preset.description || "-"}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleDeletePreset(preset._id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isModalOpen} title="Create New Preset" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleCreatePreset} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="general">General</option>
                <option value="firmware">Firmware</option>
                <option value="network">Network</option>
                <option value="wifi">WiFi</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Config (JSON)</label>
              <textarea
                value={formData.config}
                onChange={(e) => setFormData({ ...formData, config: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
                rows="4"
              />
            </div>

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
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
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
