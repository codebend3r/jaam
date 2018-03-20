/**
 * @module jam-utils
 */

import { isNil, get, has, set } from "lodash";

/**
 * @method isBooleanString
 * @description whether string can be converted to a boolean
 * @param val {*}
 * @return {boolean}
 */
export function isBooleanString(val) {
  return typeof val === "string" && (val.trim() === "true" || val.trim() === "false");
}

/**
 * @method isArrayString
 * @description whether string can be converted to an array
 * @param val {*}
 * @return {boolean}
 */
export function isArrayString(val) {
  return typeof val === "string" && (val.trim().charAt(0) === "[" && val.trim().charAt(val.length - 1) === "]");
}

/**
 * @method isNumberString
 * @description whether string can be converted to a number
 * @param val {*}
 * @return {boolean}
 */
export function isNumberString(val) {
  return typeof val === "string" && !isNaN(val);
}

/**
 * @method stringToArray
 * @description converts a string to array
 * @param val {*}
 * @return {Array}
 */
export function stringToArray(val) {
  return val.replace(/[\[\]']+/g, "").split(",").map((el) => el.trim());
}

/**
 * @method toArray
 * @description converts an array like (nodelist) to an array
 * @param val {Array|NodeList}
 * @return {Array}
 */
export function toArray(val) {
  if (!isDefined(val)) {
    return null;
  } else if (isDefined(Array.from)) {
    return Array.from(val);
  } else {
    return [].slice.call(val);
  }
}

/**
 * @method removeInnerQuotes
 * @description removed inner quotes from a string
 * @param val {*}
 * @return {string}
 */
export function removeInnerQuotes(val) {
  return typeof val === "string" ? val.replace(/^['|"]|['|"]$/g, "") : val;
}

/**
 * @method hasNativeDataType
 * @description whether a string can be converted to another data type other than a string
 * @param val {*}
 * @return {boolean}
 */
export function hasNativeDataType(val) {
  return isBooleanString(val) || isArrayString(val) || isNumberString(val);
}

/**
 * @method isEmpty
 * @description whether string is empty or has no visible characters or array has a length of 0
 * @param val {*}
 * @return {boolean}
 */
export function isEmpty(val) {
  return typeof val === "undefined" || (typeof val === "string" && val.trim() === "") || (Array.isArray(val) && val.length === 0);
}

/**
 * @method isEmptyObject
 * @description whether an object is empty, meaning it has no properties
 * @param val {object}
 * @return {boolean}
 */
export function isEmptyObject(val) {
  return isDefined(val) && typeof val === "object" && Object.keys(val).length === 0;
}

/**
 * @method isDefined
 * @description whether variable is not undefined or null and not an empty string
 * @param val {*}
 * @return {boolean}
 */
export function isDefined(val) {
  return (typeof val !== "undefined" && val !== null) && (!isEmpty(val));
}

/**
 * @method hasSameArrayValues
 * @description whether all values in two arrays match, can only compare array of strings or array numbers
 * @param {array} array1
 * @param {array} array2
 * @return {boolean}
 */
export function hasSameArrayValues(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((a) => {
    return array2.some((b) => {
      if (typeof a === "string" && typeof b === "string") {
        return a.trim() === b.trim();
      } else if (typeof a === "number" && typeof b === "number") {
        return a === b;
      }
    });
  });
}

/**
 * @method normalizeObjectStrings
 * @description takes an input object and normalizing property values to lowercase strings
 *    NOTE: this does not recursively loop through sub objects
 * @param {object} data - input object which will loop through each property and if the value is a string, it will make it lowercase or uppercase
 * @param {boolean} [changeToLowercase = true] - whether or not to change to lowercase or uppercase
 * @return {object}
 */
export function normalizeObjectStrings(data, changeToLowercase = true) {
  const keys = Object.keys(data);
  return keys.reduce((accumulator, currentValue) => {
    let obj = accumulator;
    let dataValue = data[currentValue];
    if (typeof dataValue === "string") {
      obj[currentValue] = changeToLowercase ? dataValue.toLowerCase() : dataValue.toUpperCase();
    } else {
      obj[currentValue] = dataValue;
    }
    return obj;
  }, {});
}

/**
 * @method removeDirtyChars
 * @description Remove whitespace characters from a string
 * @param {string} str - the dirty value to be cleaned
 * @return {string}
 */
export function removeDirtyChars(str) {
  return str.replace(/\n|\r|\t|\0/gim, "");
}

/**
 * @method getProp - Deprecated: use lodash/get
 * @description Safely access deeply nested value in JS object.
 * @param {object} obj - The object to query.
 * @param {array|string} prop - The path of the property to get. As an array or string delimited with "."
 * @param {*} def - The value returned for undefined resolved values.
 * @returns {any} - The resolved value, or default if path is not found.
 */
export function getProp(obj, prop, def = null) {
  return get(obj, prop, def); // https://lodash.com/docs/#get
}

/**
 * @method hasProp - Deprecated: use lodash/has
 * @description Safely check deeply nested value in JS object.
 * @param {object} obj - The object to query.
 * @param {array|string} prop - The path of the property to get. As an array or string delimited with "."
 * @returns {boolean} - True if the property exists
 */
export function hasProp(obj, prop) {
  return has(obj, prop); // https://lodash.com/docs/#has
}

/**
 * @method setProp - Deprecated: use lodash/set
 * @description Safely set deeply nested value in JS object. This method mutates object.
 * @param {object} obj - The object to modify.
 * @param {array|string} prop - The path of the property to get. As an array or string delimited with "."
 * @param {*} val - The value to set.
 * @returns {object} - The updated object, or the same object if val is undefined.
 */
export function setProp(obj, prop, val = null) {
  return set(obj, prop, val); // https://lodash.com/docs/#set
}

/**
 * @method validateEmail
 * @description Validate the email address according to regex pattern.
 * Pattern taken from: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
 * @param {string} email - of the subscriber.
 * @returns {boolean} - true if email address is valid.
 */
export function validateEmail(email) {
  if (isNil(email)) {
    return false;
  }
  const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email.toLowerCase());
}
