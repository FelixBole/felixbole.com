export interface AllSchemas {
    /**
     * The current version of the schema
     * Helps identify if the received model is in the
     * last version of the schema or not and run some
     * custom logic according to the version
     */
    schema_version: string;
}
