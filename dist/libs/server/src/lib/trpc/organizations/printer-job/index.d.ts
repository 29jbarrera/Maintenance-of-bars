export declare const printer_job: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
            printer_jobs: {
                id: string;
                data: import(".prisma/client").Prisma.JsonValue;
                printer: string;
                created_at: Date;
                updated_at: Date;
                done: boolean;
                organization_id: string;
                type: string;
            }[];
        };
    }>;
    reprint: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: {
            printer_job: {
                id: string;
                data: import(".prisma/client").Prisma.JsonValue;
                printer: string;
                created_at: Date;
                updated_at: Date;
                done: boolean;
                organization_id: string;
                type: string;
            };
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: {
            printer_job: {
                id: string;
                data: import(".prisma/client").Prisma.JsonValue;
                printer: string;
                created_at: Date;
                updated_at: Date;
                done: boolean;
                organization_id: string;
                type: string;
            };
        };
    }>;
}>;
