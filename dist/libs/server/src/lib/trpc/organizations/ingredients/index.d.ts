export declare const ingredients: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    get_all: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            organization_id: string;
        };
        output: {
            ingredients: {
                id: string;
                organization_id: string;
                name: string;
            }[];
        };
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            organization_id: string;
        };
        output: {
            ingredient_created: {
                id: string;
                organization_id: string;
                name: string;
            };
        };
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name: string;
            organization_id: string;
        };
        output: {
            ingredient_updated: {
                id: string;
                organization_id: string;
                name: string;
            };
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: {
            igredient_deleted: {
                id: string;
                organization_id: string;
                name: string;
            };
        };
    }>;
    update_ingredient_product_price: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            organization_id: string;
            products_ids: string[];
            ingredients_ids: string[];
            price: number;
        };
        output: boolean;
    }>;
}>;
