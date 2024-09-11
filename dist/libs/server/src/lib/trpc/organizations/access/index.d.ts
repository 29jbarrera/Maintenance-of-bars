export declare const access: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
            users_has_access: ({
                user: {
                    user_has_role_in_organization: {
                        id: string;
                        u_id: string;
                        o_id: string;
                        created_at: Date;
                        role: string;
                        disabled: boolean;
                    }[];
                } & {
                    id: string;
                    uid: string;
                    email: string;
                    created_at: Date;
                    updated_at: Date;
                    displayName: string;
                    phone: string;
                    claims: import(".prisma/client").Prisma.JsonValue;
                    mla: boolean;
                };
            } & {
                u_id: string;
                o_id: string;
                disabled: boolean;
            })[];
            app_roles: {
                name: string;
            }[];
            organization_name: {
                name: string;
            };
        };
    }>;
    edit_access_role: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            u_id: string;
            o_id: string;
            role: string;
        };
        output: {
            id: string;
            u_id: string;
            o_id: string;
            created_at: Date;
            role: string;
            disabled: boolean;
        };
    }>;
}>;
