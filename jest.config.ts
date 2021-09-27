import type { Config } from "@jest/types";

// Setup environment variables
import dotenv from "dotenv";
dotenv.config();

// Sync object
const config: Config.InitialOptions = {
  verbose: false,
  setupFiles: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  testURL: process.env.TEST_URL,
  testPathIgnorePatterns: ["/lib/"],
  watchPathIgnorePatterns: ["/lib/"],
};
export default config;
