import NewRelic from './NewRelicModule';

export function init(firstScreen) {
  NewRelic.init(firstScreen);
}

export function addUserId(userId) {
  NewRelic.addUserId(userId);
}

export function recordMetric(inEventType, inJson) {
  NewRelic.recordMetric(inEventType, JSON.stringify(inJson));
}

export function interaction(screen) {
  console.log(screen);
  NewRelic.interaction(screen);
}

export function log(inError) {
  NewRelic.logSend(
    'log',
    inError.message,
    inError.stack,
    inError.lineNumber,
    inError.fileName,
    inError.columnNumber,
    inError.name,
  );
}

export function error(inError) {
  NewRelic.logSend(
    'error',
    inError.message,
    inError.stack,
    inError.lineNumber,
    inError.fileName,
    inError.columnNumber,
    inError.name,
  );
}

export function warning(inError) {
  NewRelic.logSend(
    'warning',
    inError.message,
    inError.stack,
    inError.lineNumber,
    inError.fileName,
    inError.columnNumber,
    inError.name,
  );
}

export function critical(inError) {
  NewRelic.logSend(
    'critical',
    inError.message,
    inError.stack,
    inError.lineNumber,
    inError.fileName,
    inError.columnNumber,
    inError.name,
  );
}
