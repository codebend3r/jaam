// JSDOM is a JavaScript implementation of the WHATWG DOM and HTML standards, for use with node.js
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

let window = null;

global.buildDOM = () => {
  const dom = new JSDOM(`<!DOCTYPE html>`, { virtualConsole });
  window = dom.window;

  global.document = window.document;
  global.window = window;
  global.navigator = window.navigator;
  global.virtualConsole = virtualConsole;

  return dom;
}

global.buildDOM();

virtualConsole.on("log", function(message) {
  console.log(message);
});
virtualConsole.on("error", function(message) {
  console.error(message);
});
virtualConsole.on("info", function(message) {
  console.info(message);
});

// must be the same as the object defined in "inc/default/head-inline-js-config.jsp"
window.tgam = {
  env: {},
  meta: {}
};

// https://github.com/tmpvar/jsdom/issues/1137#issuecomment-173039751
window.localStorage = window.sessionStorage = {
  _data: {},
  getItem: key => {
    return this._data.hasOwnProperty(key) ? this._data[key] : null;
  },
  setItem: (key, value) => {
    return this._data[key] = String(value);
  },
  removeItem: key => delete window.localStorage._data[key],
  clear: () => {
    this._data = {};
    return undefined;
  }
};

window.performance = {
  mark(label) {
    return label;
  }
};

window.matchMedia = function(str) {
  let matches = false;
  // Regex to get width
  let match = /min-width: (\d+)px(.*?max-width: (\d+)px)?/g.exec(str);

  if (match !== null) {
    let min = parseInt(match[1]);
    let max = match[3] === undefined ? 0 : parseInt(match[3]);
    matches = match[3] === undefined ? window.width >= min : window.width >= min && window.width < max;
  }
  return {
    matches: matches
  };
};
