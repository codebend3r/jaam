/**
 * @module jam-logger
 */

import { getUrlVars } from "./urls";
import { isDefined } from "./utils";

const urlVars = getUrlVars();

let filterIsOn = false;

const globalLogger = {
  debugTarget: urlVars.debugTarget,
  debugEnabled: urlVars.debug !== false && (urlVars.debug === true || urlVars.debug === 1 || isDefined(urlVars.debugTarget)),
  traceEnabled: urlVars.trace,
  setDebugTarget,
  debugFilters: [],
  emit(method, ...logArguments) {
    /* eslint-disable no-console */
    if (this.debugEnabled) {
      if (filterIsOn && this.debugFilters.length > 0) {
        this.debugFilters.forEach((filterName) => {
          [...logArguments].forEach((log) => {
            if (typeof log === "string") {
              const logMessage = log.toLowerCase();
              const matches = logMessage.indexOf(filterName) !== -1;

              matches && isDefined(console[method]) && console[method](...logArguments);
            }
          });
        });
      } else {
        if (this.traceEnabled && method !== "trace" && method === "info") {
          isDefined(console.trace) && console.trace(...logArguments);
        } else {
          isDefined(console[method]) && console[method](...logArguments);
        }
      }
    }
    /* eslint-enabled no-console */
  },
  log() {
    this.emit("log", ...arguments);
  },
  info() {
    this.emit("info", ...arguments);
  },
  warn() {
    this.emit("warn", ...arguments);
  },
  table() {
    this.emit("table", ...arguments);
  },
  trace() {
    this.emit("table", ...arguments);
  },
  group() {
    this.emit("group", ...arguments);
  },
  groupCollapsed() {
    this.emit("groupCollapsed", ...arguments);
  },
  groupEnd() {
    this.emit("groupEnd", ...arguments);
  }
};

function setDebugTarget() {
  if (this.debugTarget) {
    this.debugFilters = [cleanFilter(this.debugTarget)];
    filterIsOn = true;
  }
}

function cleanFilter(filterName) {
  return filterName.toLowerCase();
}

globalLogger.setDebugTarget();

export default globalLogger;
