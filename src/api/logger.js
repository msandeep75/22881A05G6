import axios from 'axios';

const LOG_API_URL = '/evaluation-service/logs';
const ACCESS_TOKEN = process.env.REACT_APP_LOG_API_TOKEN;

/**
 * Sends a log to the remote logging service.
 * @param {('debug'|'info'|'warn'|'error'|'fatal')} level - The log level.
 * @param {('api'|'component'|'hook'|'page'|'state'|'style')} pkg - The frontend package where the log originates.
 * @param {string} message - The log message.
 */
export const log = async (level, pkg, message) => {
  try {
    // The request body is constructed here with the 4 required fields
    const response = await axios.post(
      LOG_API_URL,
      {
        stack: 'frontend',
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    // Log successfully sent. The response includes the logID.
    return response.data;
  } catch (error) {
     // As per instructions, avoid console logging for application logic.
     // This console.error is a developer-facing fallback if the logging API itself fails.
    console.error('CRITICAL: Failed to send log to the evaluation service.', error.response ? error.response.data : error.message);
  }
};