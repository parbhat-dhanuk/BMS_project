import winston from "winston";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const logDir = "logs";

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const isProd = process.env.NODE_ENV === "production";

// Custom log format (for files)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Cleaner console format (dev friendly)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

const logger = winston.createLogger({
  level: isProd ? "info" : "debug", 
  defaultMeta: { service: "BMS" }, 
  transports: [
    // Console (dev + prod)
    new winston.transports.Console({
      format: consoleFormat,
    }),

    // Error logs (separate file)
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      handleExceptions: true,
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),

    // Combined logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],

  // Catch unhandled errors
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],

  exitOnError: false,
});

export default logger;