import { genieacsService } from "../services/genieacsService.js";

export const getTasks = async (req, res, next) => {
  try {
    const query = req.query.query || "{}";
    const data = await genieacsService.getTasks(query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const data = await genieacsService.createTask(id, payload);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const retryTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await genieacsService.retryTask(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
