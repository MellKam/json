export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONArray = JSONValue[] | readonly JSONValue[];
export type JSONObject = { [x: string]: JSONValue } & {
  [x: string]: JSONValue | undefined;
};

export const isJsonPrimitive = (value: unknown): value is JSONPrimitive => {
  return (
    typeof value === "string" ||
    typeof value === "boolean" ||
    value === null ||
    (typeof value === "number" && isFinite(value))
  );
};

export const isJsonArray = (value: unknown): value is JSONArray => {
  if (!Array.isArray(value)) return false;
  return value.every(isJsonValue);
};

export const isJsonObject = (value: unknown): value is JSONObject => {
  if (
    typeof value !== "object" ||
    value === null ||
    value.constructor !== Object
  )
    return false;

  for (const key in value) {
    if (isJsonValue(value[key]) || typeof value[key] === "undefined") continue;
    return false;
  }
  return true;
};

export const isJsonValue = (value: unknown): value is JSONValue => {
  return isJsonPrimitive(value) || isJsonObject(value) || isJsonArray(value);
};
