// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: false,

  setupFiles: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  testURL: "http://objectpoint/sites/spws",
  collectCoverage: true,
  testPathIgnorePatterns: ["/lib/"],
  watchPathIgnorePatterns: ["/lib/"],
};
export default config;
