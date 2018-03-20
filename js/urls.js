/**
 * @module jam-urls
 */

import {
  hasNativeDataType,
  isDefined,
  removeInnerQuotes
} from "./utils";

let _cachedUrlParams = null;
let _cachedUrl = null;

/**
 * @method getUrlVars
 * @description returns a map of querystrings eg ?foo=bar&fizz=buzz returns {foo: "bar", fizz: "buzz"}
 * @param url {string}
 * @return {object}
 */
export function getUrlVars(url = window.location) {
  const decodedUrl = decodeURIComponent(url);
  const searchParams = getCurrentQueryString(decodedUrl);
  const validParam = searchParams && searchParams.indexOf("=") !== -1;
  const isDifferentUrl = !isDefined(_cachedUrl) || (isDefined(_cachedUrl) && (_cachedUrl !== url));

  let urlParams = null;

  if (!validParam) {
    return {};
  } else if (isDifferentUrl) {
    urlParams = searchParams.split("&")
      .map((query) => {
        return query.indexOf("=") !== -1 ? query.split("=") : [query, true];
      })
      .reduce((result, input) => {
        const property = input[0];
        const value = input[1];
        // the explicit check on `value` !== "" is present because otherwise hasNativeDataType erroneously
        // returns true when `value` is an empty string. This, in turn, causes JSON.parse to blow up.
        const isNativeType = (value !== "") && hasNativeDataType(value);
        const val = isNativeType ? JSON.parse(value) : value;
        result[property] = removeInnerQuotes(val);
        return result;
      }, {});

    _cachedUrl = url;
    _cachedUrlParams = urlParams;

    return urlParams;
  } else {
    return cachedUrlParams();
  }

  return urlParams;
}

/**
 * @method cachedUrlParams
 * @description returns an object containing the url parms
 * @return {object}
 */
export function cachedUrlParams(urlParams = _cachedUrlParams) {
  return urlParams;
}

/**
 * @method getCurrentQueryString
 * @description returns everything after the ? in a url
 *  ie: www.website.com/path?foo=bar&age=30 => foo=bar&age=30
 * @param url {string}
 * @return {string}
 */
export function getCurrentQueryString(url = window.location.href) {
  return url.indexOf("?") !== -1 ? url.substr(url.indexOf("?") + 1) : null;
}

/**
 * @method constructQuery
 * @description take an object, construct into a query, e.g. {page: 1, pageSize: 10} => page=1&pageSize=10
 * @param query {string}
 * @param ignoreStringQuote {boolean} Ignore adding quotes to {string} values
 * @return {string}
 */
export function constructQuery(query, ignoreStringQuote = false) {
  return Object.keys(query).map((param) => {
    const value = query[param];
    let trueValue;
    if (Array.isArray(value)) {
      trueValue = ignoreStringQuote ? value.toString() : "[" + value.toString() + "]";
    } else if (typeof value === "string") {
      trueValue = ignoreStringQuote ? value : "\'" + value + "\'";
    } else {
      trueValue = value;
    }
    return param + "=" + trueValue;
  }).join("&");
}

export function __reset__() {
  _cachedUrlParams = null;
  _cachedUrl = null;
}
