import * as Sentry from "@sentry/browser";
import config from "../config";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
    if (isLocal) {
        return;
    }

    Sentry.init({ dsn: config.SENTRY_DSN })

}

export function logError(error, errorInfo = null) {
    if (isLocal) {
        return;
    }

    Sentry.withScope((scope) => {
        errorInfo && scope.setExtras(errorInfo);
        Sentry.captureException(error);
    })
}

export function onError(error) {
  let errorInfo = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);
    // possibly extend this to allow better error handling output to the user here, possibly taking in a user friendly message to be associated with the error 
  alert(message);
}
