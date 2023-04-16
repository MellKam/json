export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONArray = JSONValue[] | readonly JSONValue[];
export type JSONObject = { [x: string]: JSONValue } & {
  readonly [x: string]: JSONValue;
};

export const isJSONPrimitive = (value: unknown): value is JSONPrimitive => {
  return (
    typeof value === "string" ||
    typeof value === "boolean" ||
    value === null ||
    (typeof value === "number" && isFinite(value))
  );
};

export const isJSONArray = (value: unknown): value is JSONArray => {
  if (!Array.isArray(value)) return false;
  return value.every(isJSONValue);
};

export const isJSONObject = (value: unknown): value is JSONObject => {
  if (
    typeof value !== "object" ||
    value === null ||
    value.constructor !== Object
  )
    return false;

  for (const key in value) {
    if (isJSONValue(value[key as keyof typeof value])) continue;
    return false;
  }
  return true;
};

export const isJSONValue = (value: unknown): value is JSONValue => {
  return isJSONPrimitive(value) || isJSONObject(value) || isJSONArray(value);
};

export type JSONOptionalPrimitive = JSONPrimitive | undefined;
export type JSONOptionalValue =
  | JSONOptionalPrimitive
  | JSONOptionalArray
  | JSONOptionalObject;
export type JSONOptionalArray =
  | JSONOptionalPrimitive[]
  | readonly JSONOptionalPrimitive[];
export type JSONOptionalObject = {
  [x: string]: JSONOptionalValue;
} & {
  readonly [x: string]: JSONOptionalValue;
};

export const isJSONOptionalPrimitive = (
  value: unknown
): value is JSONOptionalPrimitive => {
  return isJSONPrimitive(value) || value === undefined;
};

export const isJSONOptionalArray = (value: unknown) => {
  if (!Array.isArray(value)) return false;
  return value.every(isJSONOptinoalValue);
};

export const isJSONOptionalObject = (value: unknown) => {
  if (
    typeof value !== "object" ||
    value === null ||
    value.constructor !== Object
  )
    return false;

  for (const key in value) {
    if (isJSONOptinoalValue(value[key as keyof typeof value])) continue;
    return false;
  }
  return true;
};

export const isJSONOptinoalValue = (
  value: unknown
): value is JSONOptionalValue => {
  return (
    isJSONOptionalPrimitive(value) ||
    isJSONOptionalObject(value) ||
    isJSONOptionalArray(value)
  );
};
