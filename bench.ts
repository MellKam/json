import { z } from "zod";
import { faker } from "@faker-js/faker";
import { JSONValue, isJSONValue } from "./index";

const jsonSchema: z.ZodType<JSONValue> = z.lazy(() =>
  z.union([
    z.union([z.string(), z.number(), z.boolean(), z.null()]),
    z.array(jsonSchema),
    z.record(jsonSchema),
  ])
);

const isJsonSchema = <T extends JSON = JSON>(value: unknown): value is T => {
  return jsonSchema.safeParse(value).success;
};

const json = JSON.parse(faker.datatype.json());

console.time("zod");
Array(10000)
  .fill(0)
  .forEach(() => {
    isJsonSchema(json);
  });
console.timeEnd("zod");

console.time("@mellkam/json");
Array(10000)
  .fill(0)
  .forEach(() => {
    isJSONValue(json);
  });
console.timeEnd("@mellkam/json");
