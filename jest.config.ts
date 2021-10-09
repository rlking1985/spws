import type { Config } from "@jest/types";

// Setup environment variables
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TEST_LIST_VIEW_THRESHOLD: string;
      TEST_URL: string;
      TEST_USER_ID: string;
      TEST_USER_NAME: string;
      TEST_USER_PASSWORD: string;
      TEST_USER_VISITOR: string;
    }
  }
}

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
