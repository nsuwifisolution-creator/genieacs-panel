import app from "./app.js";
import { connectDB } from "./config/db.js";
import { seedAdmin } from "./utils/seedAdmin.js";

const start = async () => {
  await connectDB();
  await seedAdmin();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✓ GenieACS Panel backend listening on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error("✗ Failed to start server:", err);
  process.exit(1);
});
