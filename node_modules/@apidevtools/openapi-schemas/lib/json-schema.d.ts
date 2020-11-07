/**
 * A JSON Schema 4.0 definition for an OpenAPI Specification
 */
export interface JsonSchema {
    id?: string;
    $schema?: string;
    title?: string;
    description?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    additionalItems?: boolean | JsonSchema;
    items?: JsonSchema | JsonSchema[];
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    additionalProperties?: boolean | JsonSchema;
    definitions?: {
        [name: string]: JsonSchema;
    };
    properties?: {
        [name: string]: JsonSchema;
    };
    patternProperties?: {
        [name: string]: JsonSchema;
    };
    dependencies?: {
        [name: string]: JsonSchema | string[];
    };
    enum?: string[];
    type?: string | string[];
    allOf?: JsonSchema[];
    anyOf?: JsonSchema[];
    oneOf?: JsonSchema[];
    not?: JsonSchema;
}
