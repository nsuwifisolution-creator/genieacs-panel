import axios from "axios";

const NBI_URL = process.env.GENIEACS_NBI_URL || "http://127.0.0.1:7557";

const api = axios.create({
  baseURL: NBI_URL,
  timeout: 20000
});

export const genieacsService = {
  async getDevices(query = "{}") {
    try {
      const response = await api.get("/devices", {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error("GenieACS getDevices error:", error.message);
      return { devices: [] };
    }
  },

  async getDevice(deviceId) {
    try {
      const response = await api.get(`/devices/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error("GenieACS getDevice error:", error.message);
      throw error;
    }
  },

  async getTasks(query = "{}") {
    try {
      const response = await api.get("/tasks", {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error("GenieACS getTasks error:", error.message);
      return { tasks: [] };
    }
  },

  async createTask(deviceId, payload) {
    try {
      const response = await api.post(`/devices/${deviceId}/tasks`, payload);
      return response.data;
    } catch (error) {
      console.error("GenieACS createTask error:", error.message);
      throw error;
    }
  },

  async retryTask(taskId) {
    try {
      const response = await api.post(`/tasks/${taskId}/retry`);
      return response.data;
    } catch (error) {
      console.error("GenieACS retryTask error:", error.message);
      throw error;
    }
  },

  async getPresets() {
    try {
      const response = await api.get("/presets");
      return response.data;
    } catch (error) {
      console.error("GenieACS getPresets error:", error.message);
      return { presets: [] };
    }
  }
};
