import test from "ava";
import {
  getUrlVars,
  cachedUrlParams,
  getCurrentQueryString,
  constructQuery,
  __reset__
} from "../js/urls";

const page = "https://www.theglobeandmail.com/?foo=bar&test=1&fizz=baz";
const pageComplex = "https://www.theglobeandmail.com/?santa=false&anotherString=torpedos&age=1045&default&_&listOfThings=[99, false, \"earth\"]";

test.beforeEach(() => {
  // start with a clean slate
  __reset__();
});

test("getUrlVars should return an object with the correct properties and data types from an url", t => {
  const actual = getUrlVars(pageComplex);
  const expected = {
    santa: false,
    anotherString: "torpedos",
    age: 1045,
    default: true,
    _: true,
    listOfThings: [99, false, "earth"]
  };
  t.deepEqual(actual, expected);
});

test("cachedUrlParams should return the cached value of getUrlVars method after it's been called at least once", t => {
  const notCachedUrlParams = cachedUrlParams();
  t.is(notCachedUrlParams, null, "cachedUrlParams should start off not cached");

  const firstCall = getUrlVars(page);
  const cachedUrlParam = cachedUrlParams();

  t.deepEqual(firstCall, cachedUrlParam, "cachedUrlParams now have the same value as getUrlVars");

  const secondCall = getUrlVars(page);

  t.deepEqual(secondCall, cachedUrlParam, "cachedUrlParams now have the same value as getUrlVars");
});

test("getCurrentQueryString without url param should return everything after ? character in a url", t => {
  const testUrl = "http://store.testwebsite.com?test=456&hello='people'";
  const actual = getCurrentQueryString(testUrl);
  const expected = "test=456&hello='people'";

  t.deepEqual(actual, expected);
});

test("getCurrentQueryString with url param should return everything after ? character in a url", t => {
  const actual = getCurrentQueryString(page);
  const expected = "foo=bar&test=1&fizz=baz";
  t.deepEqual(actual, expected);
});

test("constructQuery should take in an object and convert it to a url query string", t => {
  const actual = constructQuery({
    someList: [1, 2, 3],
    pageSize: 50,
    label: "production",
    launched: false
  });
  const expected = "someList=[1,2,3]&pageSize=50&label='production'&launched=false";
  t.is(actual, expected);
});
