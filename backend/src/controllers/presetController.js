import Preset from "../models/Preset.js";

export const listPresets = async (req, res, next) => {
  try {
    const presets = await Preset.find().sort({ createdAt: -1 });
    res.json(presets);
  } catch (error) {
    next(error);
  }
};

export const createPreset = async (req, res, next) => {
  try {
    const preset = await Preset.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(preset);
  } catch (error) {
    next(error);
  }
};

export const updatePreset = async (req, res, next) => {
  try {
    const { id } = req.params;
    const preset = await Preset.findByIdAndUpdate(id, req.body, { new: true });
    res.json(preset);
  } catch (error) {
    next(error);
  }
};

export const deletePreset = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Preset.findByIdAndDelete(id);
    res.json({ message: "Preset deleted" });
  } catch (error) {
    next(error);
  }
};
