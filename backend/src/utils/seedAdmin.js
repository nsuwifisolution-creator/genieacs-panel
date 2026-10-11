import User from "../models/User.js";

export const seedAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@local";
  const password = process.env.DEFAULT_ADMIN_PASSWORD || "Admin123!";

  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({
      name: "Super Admin",
      email,
      password,
      role: "admin"
    });

    console.log(`✓ Default admin account created: ${email}`);
  }
};
