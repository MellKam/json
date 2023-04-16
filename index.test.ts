import { isJSONOptinoalValue, isJSONValue } from "./index";
import { it, expect } from "vitest";

it("Basic tests", () => {
  expect(isJSONValue("abc")).toBeTruthy();
  expect(isJSONValue(true)).toBeTruthy();
  expect(isJSONValue(false)).toBeTruthy();
  expect(isJSONValue(undefined)).toBeFalsy();
  expect(isJSONValue(null)).toBeTruthy();
});

it("Numbers", () => {
  expect(isJSONValue(1)).toBeTruthy();
  expect(isJSONValue(NaN)).toBeFalsy();
  expect(isJSONValue(Infinity)).toBeFalsy();
});

it("Arrays", () => {
  expect(isJSONValue([1, 2, 3])).toBeTruthy();
  expect(isJSONValue([1, 2, () => 3])).toBeFalsy();
  expect(isJSONValue([[[1]], 2, [5, 2], [1]])).toBeTruthy();
});

it("Objects", () => {
  expect(
    isJSONValue({ a: 5, b: "gdsgs", c: true, d: [1, 2, 3], e: null })
  ).toBeTruthy();
  expect(isJSONValue(new Set())).toBeFalsy();
  expect(isJSONValue({ a: new Map() })).toBeFalsy();
  expect(isJSONValue({ a: { b: { c: { d: { e: 5 } } } } })).toBeTruthy();
});

it("Optional", () => {
  expect(isJSONOptinoalValue(undefined)).toBeTruthy();
  expect(isJSONOptinoalValue({ a: undefined, b: [undefined] })).toBeTruthy();
});
