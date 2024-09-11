export declare const products_categories: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
            product_sizes: {
                id: string;
                organization_id: string;
                name: string;
                img: string | null;
                priority: number;
                priority_u: number;
                enabled_u: boolean;
                icon: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            }[];
        };
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            organization_id: string;
        };
        output: {
            product_category: {
                id: string;
                organization_id: string;
                name: string;
                img: string | null;
                priority: number;
                priority_u: number;
                enabled_u: boolean;
                icon: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            };
        };
    }>;
    edit: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name: string;
            organization_id: string;
        };
        output: {};
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: {
            product: {
                id: string;
                organization_id: string;
                name: string;
                img: string | null;
                priority: number;
                priority_u: number;
                enabled_u: boolean;
                icon: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            };
        };
    }>;
    save_order_category: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            organization_id: string;
            categories: {
                id: string;
                priority_u: number;
            }[];
        };
        output: boolean;
    }>;
}>;
