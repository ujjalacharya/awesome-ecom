import { JsonSchema } from "./json-schema";
export { JsonSchema };
/**
 * JSON Schema for OpenAPI Specification v1.2
 */
export declare const openapiV1: JsonSchema;
/**
 * JSON Schema for OpenAPI Specification v2.0
 */
export declare const openapiV2: JsonSchema;
/**
 * JSON Schema for OpenAPI Specification v3.0
 */
export declare const openapiV3: JsonSchema;
/**
 * JSON Schemas for every version of the OpenAPI Specification
 */
export declare const openapi: {
    v1: JsonSchema;
    v2: JsonSchema;
    v3: JsonSchema;
};
export default openapi;
