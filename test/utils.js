import test from "ava";
import {
  isBooleanString,
  isArrayString,
  isNumberString,
  hasNativeDataType,
  isEmpty,
  isDefined,
  removeInnerQuotes,
  hasSameArrayValues,
  validateEmail
} from "../js/utils";

test("isBooleanString returns true if string can be converted to a boolean", t => {
  const actual1 = isBooleanString("true");
  t.true(actual1);

  const actual2 = isBooleanString("false");
  t.true(actual2);

  const actual3 = isBooleanString("TRUE");
  t.false(actual3);

  const actual4 = isBooleanString("1 === 1");
  t.false(actual4);
});

test("isArrayString returns true if string can be converted to an array", t => {
  const actual1 = isArrayString("[]");
  t.true(actual1);

  const actual2 = isArrayString("[100, 200, 300]");
  t.true(actual2);

  const actual3 = isArrayString("1, 2]");
  t.false(actual3);

  const actual4 = isArrayString("[1, 2");
  t.false(actual4);
});

test("isNumberString returns true if string can be converted to a number", t => {
  const actual1 = isNumberString("54645");
  t.true(actual1);

  const actual2 = isNumberString("0");
  t.true(actual2);

  const actual3 = isNumberString("-3232");
  t.true(actual3);

  const actual4 = isNumberString("A1");
  t.false(actual4);

  const actual5 = isNumberString("eight");
  t.false(actual5);
});

test("hasNativeDataType returns true if string can be converted to another data type other than a string", t => {
  const actual1 = hasNativeDataType("54645");
  t.true(actual1);

  const actual2 = hasNativeDataType("[1, 2, 3]");
  t.true(actual2);

  const actual3 = hasNativeDataType("true");
  t.true(actual3);

  const actual4 = hasNativeDataType("foo boo");
  t.false(actual4);

  const actual5 = hasNativeDataType("'string with inner quotes'");
  t.false(actual5);
});

test("isDefined returns true if string can be converted to another data type other than a string", t => {
  const actual1 = isDefined();
  t.false(actual1);

  const actual2 = isDefined(null);
  t.false(actual2);

  const actual3 = isDefined(undefined);
  t.false(actual3);

  const actual4 = isDefined("");
  t.false(actual4);

  const actual5 = isDefined("   ");
  t.false(actual5);

  const actual6 = isDefined("\n\t");
  t.false(actual6);

  const actual7 = isDefined([]);
  t.false(actual7);

  const actual8 = isDefined(false);
  t.true(actual8);

  const actual9 = isDefined(true);
  t.true(actual9);

  const actual10 = isDefined("string");
  t.true(actual10);

  const actual11 = isDefined(0);
  t.true(actual11);

  const actual12 = isDefined(function someMethod() {
  });
  t.true(actual12);

  const actual13 = isDefined(() => {
  });
  t.true(actual13);

  const actual14 = isDefined("\n\t Hello");
  t.true(actual14);

  const actual15 = isDefined([1, 2, 3]);
  t.true(actual15);
});

test("isEmpty returns true if string is an empty string (no visible characters)", t => {
  const actual1 = isEmpty();
  t.true(actual1, "default should return true");

  const actual2 = isEmpty("");
  t.true(actual2);

  const actual3 = isEmpty("   ");
  t.true(actual3);

  const actual4 = isEmpty("\n\t");
  t.true(actual4);

  const actual5 = isEmpty([]);
  t.true(actual5);

  /* eslint-disable no-sparse-arrays, comma-spacing */
  const actual6 = isEmpty([, ,]);
  /* eslint-enable no-sparse-arrays, comma-spacing */
  t.false(actual6);

  const actual7 = isEmpty("\n\t Hello");
  t.false(actual7);
});

test("removeInnerQuotes return a string containing inner quotes", t => {
  const actual1 = removeInnerQuotes("regular sting with no inner quotes");
  const expected1 = "regular sting with no inner quotes";
  t.deepEqual(actual1, expected1);

  const actual2 = removeInnerQuotes("'this string has inner surrounding quotes'");
  const expected2 = "this string has inner surrounding quotes";
  t.deepEqual(actual2, expected2);

  const actual3 = removeInnerQuotes("\"with escaped double quotes\"");
  const expected3 = "with escaped double quotes";
  t.deepEqual(actual3, expected3);

  const actual4 = removeInnerQuotes("\'with escaped single quotes\'");
  const expected4 = "with escaped single quotes";
  t.deepEqual(actual4, expected4);

  const actual5 = removeInnerQuotes("\'with escaped single quotes and an apostrophe (this is Chester's code)\'");
  const expected5 = "with escaped single quotes and an apostrophe (this is Chester's code)";
  t.deepEqual(actual5, expected5);

  const actual6 = removeInnerQuotes(1000);
  const expected6 = 1000;
  t.is(actual6, expected6);
});

test("hasSameArrayValues should return false if array lengths are different or if not all values in the array match", t => {
  t.false(hasSameArrayValues([1, 2, 3, 4, 5, 6], [1, 2, 3, 4]));
  t.false(hasSameArrayValues(["dog", "cat", "bird", "bunny"], ["cat", "rat", "bird"]));
  t.false(hasSameArrayValues(["dog", "cat", "bird"], ["cat", "rat", "bird"]));
});

test("hasSameArrayValues should return true if array contains all the same values in any order", t => {
  t.true(hasSameArrayValues([1, 2, 3, 4], [1, 2, 3, 4]));
  t.true(hasSameArrayValues([1, 2, 3, 4], [4, 3, 2, 1]));
  t.true(hasSameArrayValues(["dog", "cat", "bird"], ["bird", "cat", "dog"]));
  t.true(hasSameArrayValues(["dog ", "   cat   ", "  bird"], ["cat", "dog", " bird      "]));
});

test("validateEmail should return correct value for validation", t => {
  const actual1 = validateEmail();
  t.false(actual1);

  const actual2 = validateEmail(null);
  t.false(actual2);

  const actual3 = validateEmail(undefined);
  t.false(actual3);

  const actual4 = validateEmail("");
  t.false(actual4);

  const actual5 = validateEmail("string");
  t.false(actual5);

  const actual6 = validateEmail("@gmail");
  t.false(actual6);

  // TODO: The regex pattern is allowing kim@example to pass ...
  const actual7 = validateEmail("email@site");
  t.true(actual7);

  const actual8 = validateEmail("ending@missing.");
  t.false(actual8);

  const actual9 = validateEmail("hoser@canada.ca");
  t.true(actual9);

  const actual10 = validateEmail("ontario@resident.on.ca");
  t.true(actual10);

  const actual11 = validateEmail("user@theglobeandmail.com");
  t.true(actual11);

  const actual12 = validateEmail("olduser@theglobeandmail.ca");
  t.true(actual12);
});
