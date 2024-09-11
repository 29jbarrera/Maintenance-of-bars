export declare const invoice: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    get_invoices_between_dates: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            organization_id: string;
            from: string;
            to: string;
        };
        output: {
            invoices: {
                id: string;
                organization_id: string;
                created_at: Date;
                updated_at: Date;
                num: number | null;
                printed: boolean;
                is_payment: boolean;
                payment_type: string;
                address: string;
                phone: string;
                description: string;
                locked: boolean;
                deleted: boolean;
                type_of_delivery: string;
                cash_closure_id: string | null;
                at_id: string | null;
                atr_id: string | null;
                is_delivered: boolean;
                serial: string;
                organization_client_id: string | null;
                invoice_group: string | null;
                user_id: string | null;
                user_data: import(".prisma/client").Prisma.JsonValue;
                user_shipment_data: import(".prisma/client").Prisma.JsonValue;
                delivery_price: number | null;
                amount_discount: number;
                total_amount: number;
                payments_made: import(".prisma/client").Prisma.JsonValue;
            }[];
        };
    }>;
    get_invoice_by_id: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_id: string;
        };
        output: {
            invoice: {
                invoice_line: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    organization_id: string;
                    invoice_id: string;
                    amount: number;
                    quantity: number;
                    name: string;
                    modifications: import(".prisma/client").Prisma.JsonValue;
                    remark: string;
                    weight: number | null;
                }[];
                organization_client: {
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
                } | null;
            } & {
                id: string;
                organization_id: string;
                created_at: Date;
                updated_at: Date;
                num: number | null;
                printed: boolean;
                is_payment: boolean;
                payment_type: string;
                address: string;
                phone: string;
                description: string;
                locked: boolean;
                deleted: boolean;
                type_of_delivery: string;
                cash_closure_id: string | null;
                at_id: string | null;
                atr_id: string | null;
                is_delivered: boolean;
                serial: string;
                organization_client_id: string | null;
                invoice_group: string | null;
                user_id: string | null;
                user_data: import(".prisma/client").Prisma.JsonValue;
                user_shipment_data: import(".prisma/client").Prisma.JsonValue;
                delivery_price: number | null;
                amount_discount: number;
                total_amount: number;
                payments_made: import(".prisma/client").Prisma.JsonValue;
            };
        };
    }>;
    add_client_to_invoice: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            organization_client_id: string;
        };
        output: {
            update_invoice: {
                invoice_line: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    organization_id: string;
                    invoice_id: string;
                    amount: number;
                    quantity: number;
                    name: string;
                    modifications: import(".prisma/client").Prisma.JsonValue;
                    remark: string;
                    weight: number | null;
                }[];
                organization_client: {
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
                } | null;
            } & {
                id: string;
                organization_id: string;
                created_at: Date;
                updated_at: Date;
                num: number | null;
                printed: boolean;
                is_payment: boolean;
                payment_type: string;
                address: string;
                phone: string;
                description: string;
                locked: boolean;
                deleted: boolean;
                type_of_delivery: string;
                cash_closure_id: string | null;
                at_id: string | null;
                atr_id: string | null;
                is_delivered: boolean;
                serial: string;
                organization_client_id: string | null;
                invoice_group: string | null;
                user_id: string | null;
                user_data: import(".prisma/client").Prisma.JsonValue;
                user_shipment_data: import(".prisma/client").Prisma.JsonValue;
                delivery_price: number | null;
                amount_discount: number;
                total_amount: number;
                payments_made: import(".prisma/client").Prisma.JsonValue;
            };
        };
    }>;
}>;
