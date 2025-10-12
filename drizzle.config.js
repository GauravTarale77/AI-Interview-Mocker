import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_l0Ch9fejqWzo@ep-fragrant-pine-a19heceq-pooler.ap-southeast-1.aws.neon.tech/AI-Interview-Mocker?sslmode=require&channel_binding=require",
  },
  strict: true,
  verbose: true,
});
