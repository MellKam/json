export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONArray = JSONValue[] | readonly JSONValue[];
export type JSONObject = { [x: string]: JSONValue } & {
  [x: string]: JSONValue | undefined;
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
    if (isJSONValue(value[key]) || typeof value[key] === "undefined") continue;
    return false;
  }
  return true;
};

export const isJSONValue = (value: unknown): value is JSONValue => {
  return isJSONPrimitive(value) || isJSONObject(value) || isJSONArray(value);
};
