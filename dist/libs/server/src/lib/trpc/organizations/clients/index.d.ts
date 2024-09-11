export declare const clients: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
            clients: {
                id: string;
                organization_id: string;
                name: string;
                address: string;
                email: string | null;
                phone: string | null;
                nif: string;
                created_at: Date;
                updated_at: Date;
                locality: string | null;
                province: string | null;
                cp: string | null;
            }[];
        };
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            email: string;
            address: string;
            phone: string;
            organization_id: string;
            nif: string;
            cp: string;
            locality: string;
            province: string;
        };
        output: {
            id: string;
            organization_id: string;
            name: string;
            address: string;
            email: string | null;
            phone: string | null;
            nif: string;
            created_at: Date;
            updated_at: Date;
            locality: string | null;
            province: string | null;
            cp: string | null;
        }[];
    }>;
    edit: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name: string;
            email: string;
            address: string;
            phone: string;
            organization_id: string;
            nif: string;
            cp: string;
            locality: string;
            province: string;
        };
        output: {};
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: {
            cliente: {
                id: string;
                organization_id: string;
                name: string;
                address: string;
                email: string | null;
                phone: string | null;
                nif: string;
                created_at: Date;
                updated_at: Date;
                locality: string | null;
                province: string | null;
                cp: string | null;
            };
        };
    }>;
}>;
