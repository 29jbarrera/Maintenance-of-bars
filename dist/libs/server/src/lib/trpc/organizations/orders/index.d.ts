export declare const orders: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    order_of_organization: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            organization_id: string;
        };
        output: {
            orders: {
                id: string;
                organization_id: string;
                status: string;
                cart_products: import(".prisma/client").Prisma.JsonValue;
                created_at: Date;
                updated_at: Date;
                type: string;
                num: number | null;
                description: string;
                address: string;
                phone: string;
                eating_table_id: string | null;
                auto_accept: boolean;
                automatically_generate_invoice: boolean;
                type_of_delivery: string;
                is_payment: boolean;
                payment_type: string;
                status_order_item: string;
                auto_print_invoice: boolean;
                at_id: string | null;
                atr_id: string | null;
                app: string;
                user_id: string | null;
                payments_made: import(".prisma/client").Prisma.JsonValue;
                v: number;
            }[];
            eating_tables: {
                id: string;
                organization_id: string;
                available: boolean;
                name: string;
                description: string;
                enabled: boolean;
                priority: number;
                complete: boolean;
                current_invoice_id: string | null;
                etg: string | null;
                contributions: import(".prisma/client").Prisma.JsonValue;
                default_description: string;
            }[];
            users: {
                id: string;
                email: string;
                displayName: string;
            }[];
            eating_tables_groups: ({
                eating_tables: {
                    id: string;
                    organization_id: string;
                    available: boolean;
                    name: string;
                    description: string;
                    enabled: boolean;
                    priority: number;
                    complete: boolean;
                    current_invoice_id: string | null;
                    etg: string | null;
                    contributions: import(".prisma/client").Prisma.JsonValue;
                    default_description: string;
                }[];
            } & {
                id: string;
                organization_id: string;
                order: number;
                name: string;
            })[];
        };
    }>;
}>;
