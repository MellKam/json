import { isJSONValue } from "./index";
import { it, expect } from "vitest";

it("Basic tests", () => {
  expect(isJSONValue("abc") === true);
  expect(isJSONValue(true) === true);
  expect(isJSONValue(false) === true);
  expect(isJSONValue(undefined) === false);
  expect(isJSONValue(null) === true);
});

it("Numbers", () => {
  expect(isJSONValue(1) === true);
  expect(isJSONValue(NaN) === false);
  expect(isJSONValue(Infinity) === false);
});

it("Arrays", () => {
  expect(isJSONValue([1, 2, 3]) === true);
  expect(isJSONValue([1, 2, () => 3]) === false);
  expect(isJSONValue([[[1]], 2, [5, 2], [1]]) === true);
});

it("Objects", () => {
  expect(
    isJSONValue({ a: 5, b: "gdsgs", c: true, d: [1, 2, 3], e: null }) === true
  );
  expect(isJSONValue({ a: new Map() }) === false);
  expect(isJSONValue({ a: { b: { c: { d: { e: 5 } } } } }) === true);
});
