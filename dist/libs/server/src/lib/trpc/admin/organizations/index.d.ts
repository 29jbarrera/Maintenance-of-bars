export declare const organizations: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
        };
        output: {
            id: string;
            name: string;
            order_num: number;
            image_main: string | null;
            invoice_num: number;
            cash_closure_num: number;
            at_id: string | null;
            atr_id: string | null;
            phone: string;
            address: string;
            description: string;
            enabled: boolean;
            prioriry_u: number;
            enabled_u: boolean;
            invoice_num_c: number;
            billing_address: string;
            billing_name: string;
            billing_identifier: string;
            default_tax: number;
            sa: string | null;
            email: string | null;
            bank_account_number: string | null;
            facebook: string | null;
            twitter: string | null;
            instagram: string | null;
            youtube: string | null;
            has_products: boolean;
            has_services: boolean;
            has_catering: boolean;
            web: string | null;
            image_header: string | null;
            whatsapp: string | null;
            last_update_products: Date;
            last_update_product_categories: Date;
            gocardless: string | null;
            letterhead: import(".prisma/client").Prisma.JsonValue;
            coffe_product_id: string | null;
            coffe_schedules: import(".prisma/client").Prisma.JsonValue;
        };
    }>;
    edit_organization: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            billing_address: string;
            billing_name: string;
            billing_identifier: string;
        };
        output: {
            id: string;
            name: string;
            order_num: number;
            image_main: string | null;
            invoice_num: number;
            cash_closure_num: number;
            at_id: string | null;
            atr_id: string | null;
            phone: string;
            address: string;
            description: string;
            enabled: boolean;
            prioriry_u: number;
            enabled_u: boolean;
            invoice_num_c: number;
            billing_address: string;
            billing_name: string;
            billing_identifier: string;
            default_tax: number;
            sa: string | null;
            email: string | null;
            bank_account_number: string | null;
            facebook: string | null;
            twitter: string | null;
            instagram: string | null;
            youtube: string | null;
            has_products: boolean;
            has_services: boolean;
            has_catering: boolean;
            web: string | null;
            image_header: string | null;
            whatsapp: string | null;
            last_update_products: Date;
            last_update_product_categories: Date;
            gocardless: string | null;
            letterhead: import(".prisma/client").Prisma.JsonValue;
            coffe_product_id: string | null;
            coffe_schedules: import(".prisma/client").Prisma.JsonValue;
        };
    }>;
}>;
