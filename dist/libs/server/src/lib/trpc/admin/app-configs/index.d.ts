export declare const app_configs: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        user: import("../../utils/decoke-and-verify-token").JWTDecode | null;
    };
    meta: object;
    errorShape: {
        data: {
            code: "UNAUTHORIZED" | "PARSE_ERROR" | "BAD_REQUEST" | "INTERNAL_SERVER_ERROR" | "NOT_IMPLEMENTED" | "FORBIDDEN" | "NOT_FOUND" | "METHOD_NOT_SUPPORTED" | "TIMEOUT" | "CONFLICT" | "PRECONDITION_FAILED" | "UNSUPPORTED_MEDIA_TYPE" | "PAYLOAD_TOO_LARGE" | "UNPROCESSABLE_CONTENT" | "TOO_MANY_REQUESTS" | "CLIENT_CLOSED_REQUEST";
            message: string;
        };
        message: string;
        code: import("@trpc/server/dist/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
    };
    transformer: false;
}, {
    product_modification_group: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            app_product_modifications_groups: {
                id: string;
                name: string;
            }[];
        };
    }>;
    update_product_modification_group: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            name: string;
        };
        output: {
            updated_group: {
                id: string;
                name: string;
            };
        };
    }>;
    product_modifications_of_group: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            apmg: number;
        };
        output: {
            app_product_modifications: {
                id: string;
                apmg: string;
                name: string;
            }[];
        };
    }>;
    check_if_exist_product_id: import("@trpc/server").TRPCMutationProcedure<{
        input: number;
        output: boolean;
    }>;
    add_product_modification_to_group: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            name: string;
            apmg: number;
        };
        output: {
            app_product_modification: {
                id: string;
                apmg: string;
                name: string;
            };
        };
    }>;
    update_product_modification_in_group: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            name: string;
            apmg: number;
        };
        output: {
            update_product_modification: {
                id: string;
                apmg: string;
                name: string;
            };
        };
    }>;
    delete_product_modification_in_group: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            deleted_product_modification: {
                id: string;
            };
        };
    }>;
}>;
