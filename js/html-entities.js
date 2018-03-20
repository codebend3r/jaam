/**
 * @module jam-html-entities
 */

/**
 * @method decode
 * @description decodes a string
 * @param str {string}
 * @return {string}
 */
export function decode(str) {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
}

/**
 * @method encode
 * @description encodes a string
 * @param str {string}
 * @return {string}
 */
export function encode(str) {
  let buf = [];
  let i = str.length - 1;
  for (i; i >= 0; i--) {
    buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
  }
  return buf.join("");
}
