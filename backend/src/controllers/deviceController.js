import { genieacsService } from "../services/genieacsService.js";

export const getDevices = async (req, res, next) => {
  try {
    const query = req.query.query || "{}";
    const data = await genieacsService.getDevices(query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getDeviceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await genieacsService.getDevice(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
