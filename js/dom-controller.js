/**
 * @module jam-dom-controller
 */

import { isDefined } from "./utils";

/**
 * @method focusOnElement
 * @description if element exists and is visible, it will become focused
 * @param {HTMLElement|string} element
 * @return {boolean}
 */
export function focusOnElement(element) {
  let targetElement = null;

  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }

  if (targetElement && isDefined(targetElement.offsetHeight) && targetElement.offsetHeight !== 0) {
    element.focus();
    return true;
  } else {
    return false;
  }

}
