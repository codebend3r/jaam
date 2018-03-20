import test from "ava";
import { encode, decode } from "../js/html-entities";

test("it encodes to HTML entities", t => {
  const str = "Test´†®¥¨©˙∫ø…ˆƒ∆÷∑™ƒ∆æøπ£¨ ƒ™en tést";
  const actual = encode(str);
  const expected = "&#84;&#101;&#115;&#116;&#180;&#8224;&#174;&#165;&#168;&#169;&#729;&#8747;&#248;&#8230;&#710;&#402;&#8710;&#247;&#8721;&#8482;&#402;" +
    "&#8710;&#230;&#248;&#960;&#163;&#168;&#32;&#402;&#8482;&#101;&#110;&#32;&#116;&#233;&#115;&#116;";
  t.is(actual, expected);
});

test("it decodes HTML entities", t => {
  const entities = "&#84;&#101;&#115;&#116;&#180;&#8224;&#174;&#165;&#168;&#169;&#729;&#8747;&#248;&#8230;&#710;&#402;&#8710;&#247;&#8721;&#8482;&#402;" +
    "&#8710;&#230;&#248;&#960;&#163;&#168;&#32;&#402;&#8482;&#101;&#110;&#32;&#116;&#233;&#115;&#116;";
  const actual = decode(entities);
  const expected = "Test´†®¥¨©˙∫ø…ˆƒ∆÷∑™ƒ∆æøπ£¨ ƒ™en tést";
  t.is(actual, expected);
});
