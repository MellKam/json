import { isJsonValue } from "./index";
import { it, expect } from "vitest";

it("Basic tests", () => {
  expect(isJsonValue("abc") === true);
  expect(isJsonValue(true) === true);
  expect(isJsonValue(false) === true);
  expect(isJsonValue(undefined) === false);
  expect(isJsonValue(null) === true);
});

it("Numbers", () => {
  expect(isJsonValue(1) === true);
  expect(isJsonValue(NaN) === false);
  expect(isJsonValue(Infinity) === false);
});

it("Arrays", () => {
  expect(isJsonValue([1, 2, 3]) === true);
  expect(isJsonValue([1, 2, () => 3]) === false);
  expect(isJsonValue([[[1]], 2, [5, 2], [1]]) === true);
});

it("Objects", () => {
  expect(
    isJsonValue({ a: 5, b: "gdsgs", c: true, d: [1, 2, 3], e: null }) === true
  );
  expect(isJsonValue({ a: new Map() }) === false);
  expect(isJsonValue({ a: { b: { c: { d: { e: 5 } } } } }) === true);
});
