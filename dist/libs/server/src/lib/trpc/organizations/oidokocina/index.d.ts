export declare const oidokocina: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    get_my_config: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            organization_id: string;
        };
        output: {
            id: string;
            created_at: Date;
            updated_at: Date;
            a: number;
            p: string;
            numconfig: number;
            modeloImpresora: number;
            version: string;
            o_id: string;
        };
    }>;
    save_my_config: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
            a: number;
            p: string;
            version: string;
            modeloImpresora: number;
            numconfig: number;
        };
        output: {
            id: string;
            created_at: Date;
            updated_at: Date;
            a: number;
            p: string;
            numconfig: number;
            modeloImpresora: number;
            version: string;
            o_id: string;
        };
    }>;
    get_pedidos: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            fechaini: string;
            fechafin: string;
            estado: number[];
            formaPago: number;
            formaEntrega: number;
            origen: string;
        };
        output: import("@komandero/commons").OK_PEDIDOS;
    }>;
    get_un_pedido: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: import("@komandero/commons").OK_PEDIDO_UNO;
    }>;
}>;
import './integration';
