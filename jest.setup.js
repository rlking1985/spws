// SPWS Defaults
import { defaults } from "./src/index";

// Import config
import config from "./spws.proxy.config";

// Libraries
import dotenv from "dotenv";

// Access environment variables
dotenv.config();

// Set default web URL (see .env)
defaults.webURL = `//${config.host}:${config.port}/${process.env.TEST_URL}/operations`;

window.rootWebURL = `//${config.host}:${config.port}/${process.env.TEST_URL}`;
