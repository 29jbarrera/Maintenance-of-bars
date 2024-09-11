export declare const admin: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        user: import("../utils/decoke-and-verify-token").JWTDecode | null;
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
}, import("@trpc/server/dist/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    users: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            user: import("../utils/decoke-and-verify-token").JWTDecode | null;
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
        get_users: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                users: {
                    id: string;
                    email: string;
                    displayName: string;
                    uid: string;
                }[];
            };
        }>;
        view_user: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: string;
            };
            output: {
                user: {
                    id: string;
                    uid: string;
                    email: string;
                    created_at: Date;
                    updated_at: Date;
                    displayName: string;
                    phone: string;
                    claims: import(".prisma/client").Prisma.JsonValue;
                    mla: boolean;
                } | null;
                organizations_have_access: ({
                    organization: {
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
                } & {
                    u_id: string;
                    o_id: string;
                    disabled: boolean;
                })[];
            };
        }>;
        edit_display_name: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                displayName: string;
            };
            output: boolean;
        }>;
        get_organizations_to_add_user: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                organizations: {
                    id: string;
                    name: string;
                }[];
            };
        }>;
        add_user_to_organization: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                u_id: string;
                o_id: string;
            };
            output: {
                add_organization_to_user: {
                    organization: {
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
                } & {
                    u_id: string;
                    o_id: string;
                    disabled: boolean;
                };
            };
        }>;
        remove_user_to_organization: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                u_id: string;
                o_id: string;
            };
            output: boolean;
        }>;
        toggle_user_on_organization: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                u_id: string;
                o_id: string;
                disabled: boolean;
            };
            output: {
                success: boolean;
            };
        }>;
        create_user: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email: string;
                displayName: string;
                password: string;
            };
            output: {
                success: boolean;
            };
        }>;
    }>;
    organizations: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            user: import("../utils/decoke-and-verify-token").JWTDecode | null;
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
    app_configs: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            user: import("../utils/decoke-and-verify-token").JWTDecode | null;
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
        product_modification_group: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                app_product_modifications_groups: {
                    id: string;
                    name: string;
                }[];
            };
        }>;
        update_product_modification_group: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
            };
            output: {
                updated_group: {
                    id: string;
                    name: string;
                };
            };
        }>;
        product_modifications_of_group: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                apmg: number;
            };
            output: {
                app_product_modifications: {
                    id: string;
                    apmg: string;
                    name: string;
                }[];
            };
        }>;
        check_if_exist_product_id: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: boolean;
        }>;
        add_product_modification_to_group: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                apmg: number;
            };
            output: {
                app_product_modification: {
                    id: string;
                    apmg: string;
                    name: string;
                };
            };
        }>;
        update_product_modification_in_group: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                apmg: number;
            };
            output: {
                update_product_modification: {
                    id: string;
                    apmg: string;
                    name: string;
                };
            };
        }>;
        delete_product_modification_in_group: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                deleted_product_modification: {
                    id: string;
                };
            };
        }>;
    }>;
}>>;
