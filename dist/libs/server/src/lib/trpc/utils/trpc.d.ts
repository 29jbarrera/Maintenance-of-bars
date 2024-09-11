/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export declare const t: {
    _config: import("@trpc/server/dist/unstable-core-do-not-import").RootConfig<{
        ctx: {
            user: import("./decoke-and-verify-token").JWTDecode | null;
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
    }>;
    procedure: import("@trpc/server/dist/unstable-core-do-not-import").ProcedureBuilder<{
        user: import("./decoke-and-verify-token").JWTDecode | null;
    }, object, object, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, false>;
    middleware: <$ContextOverrides>(fn: import("@trpc/server/dist/unstable-core-do-not-import").MiddlewareFunction<{
        user: import("./decoke-and-verify-token").JWTDecode | null;
    }, object, object, $ContextOverrides, unknown>) => import("@trpc/server/dist/unstable-core-do-not-import").MiddlewareBuilder<{
        user: import("./decoke-and-verify-token").JWTDecode | null;
    }, object, $ContextOverrides, unknown>;
    router: {
        <TInput extends import("@trpc/server").TRPCRouterRecord>(input: TInput): import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
            ctx: {
                user: import("./decoke-and-verify-token").JWTDecode | null;
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
        }, TInput>;
        <TInput_1 extends import("@trpc/server/dist/unstable-core-do-not-import").CreateRouterOptions>(input: TInput_1): import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
            ctx: {
                user: import("./decoke-and-verify-token").JWTDecode | null;
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
        }, import("@trpc/server/dist/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput_1>>;
    };
    mergeRouters: typeof import("@trpc/server/dist/unstable-core-do-not-import").mergeRouters;
    createCallerFactory: <TRecord extends import("@trpc/server").TRPCRouterRecord>(router: Pick<import("@trpc/server/dist/unstable-core-do-not-import").Router<{
        ctx: {
            user: import("./decoke-and-verify-token").JWTDecode | null;
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
    }, TRecord>, "_def">) => import("@trpc/server/dist/unstable-core-do-not-import").RouterCaller<{
        ctx: {
            user: import("./decoke-and-verify-token").JWTDecode | null;
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
    }, TRecord>;
};
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export declare const router: {
    <TInput extends import("@trpc/server").TRPCRouterRecord>(input: TInput): import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            user: import("./decoke-and-verify-token").JWTDecode | null;
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
    }, TInput>;
    <TInput_1 extends import("@trpc/server/dist/unstable-core-do-not-import").CreateRouterOptions>(input: TInput_1): import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            user: import("./decoke-and-verify-token").JWTDecode | null;
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
    }, import("@trpc/server/dist/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput_1>>;
};
export declare const publicProcedure: import("@trpc/server/dist/unstable-core-do-not-import").ProcedureBuilder<{
    user: import("./decoke-and-verify-token").JWTDecode | null;
}, object, object, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import").unsetMarker, false>;
