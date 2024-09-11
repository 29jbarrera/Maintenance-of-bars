import { LetterHead } from '@komandero/commons';
export declare const organizations: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    create_organization: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            billing_address: string;
            billing_name: string;
            billing_identifier: string;
        };
        output: {
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
        };
    }>;
    get_all: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            organizations: {
                id: string;
                name: string;
            }[];
        };
    }>;
    view_organization: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
            organization: {
                id: string;
                name: string;
                billing_address: string;
                billing_name: string;
                billing_identifier: string;
            } | null;
            users_have_access: ({
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
                };
            } & {
                u_id: string;
                o_id: string;
                disabled: boolean;
            })[];
        };
    }>;
    get_organization_name: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
            name: string;
        } | null;
    }>;
    get_letterhead: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            letterhead: LetterHead[];
        };
    }>;
    update_letterhead: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            letterhead?: any;
        };
        output: {
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
        };
    }>;
    access: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    clients: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    ingredients: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        get_all: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: {
                ingredients: {
                    id: string;
                    organization_id: string;
                    name: string;
                }[];
            };
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                organization_id: string;
            };
            output: {
                ingredient_created: {
                    id: string;
                    organization_id: string;
                    name: string;
                };
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                name: string;
                organization_id: string;
            };
            output: {
                ingredient_updated: {
                    id: string;
                    organization_id: string;
                    name: string;
                };
            };
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
            };
            output: {
                igredient_deleted: {
                    id: string;
                    organization_id: string;
                    name: string;
                };
            };
        }>;
        update_ingredient_product_price: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                products_ids: string[];
                ingredients_ids: string[];
                price: number;
            };
            output: boolean;
        }>;
    }>;
    invoice: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    products: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        get_product_by_id: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
            };
            output: {
                _product: {
                    product_modification: {
                        apm: string;
                        app_product_modification: {
                            id: string;
                            apmg: string | undefined;
                            name: string;
                        };
                        p_id: string;
                        pi: number;
                        o: number;
                    }[];
                    ingredient_product: ({
                        ingredient: {
                            id: string;
                            organization_id: string;
                            name: string;
                        };
                    } & {
                        ingredient_id: string;
                        product_id: string;
                        default: boolean;
                        price: number;
                        organization_id: string;
                    })[];
                    product_size_price: ({
                        product_size: {
                            id: string;
                            organization_id: string;
                            created_at: Date;
                            updated_at: Date;
                            name: string;
                            qr_o: number;
                        };
                    } & {
                        product_id: string;
                        product_size_id: string;
                        price: number;
                        organization_id: string;
                        order: number;
                        qr_v: boolean;
                        qr_o: number;
                        w_v: boolean | null;
                    })[];
                    id: string;
                    organization_id: string;
                    name: string;
                    product_category_id: string;
                    enabled: boolean;
                    price_take_away: number;
                    price_pick_up: number;
                    price_delivery: number;
                    created_at: Date;
                    updated_at: Date;
                    min_num_ingredient: number;
                    max_num_ingredient: number;
                    priority: number;
                    priority_ko: number;
                    enabled_u: boolean;
                    priority_u: number;
                    name_i: string;
                    description: string;
                    type: string;
                    adp: bigint | null;
                    adps: bigint | null;
                    tax: number;
                    ref: string | null;
                    quantity_max: number | null;
                    quantity_min: number;
                    unit: string;
                    bar_code: string | null;
                    has_attributes: boolean;
                    quantity: number;
                    deleted: boolean;
                    weight: number | null;
                    length: number | null;
                    height: number | null;
                    width: number | null;
                    price_discounted: number | null;
                    quantity_increase_amount: number;
                    qa: number | null;
                    pap: number;
                    qan: boolean;
                    description_aditional: string | null;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean;
                };
                categories: {
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
                product_size_price: ({
                    product_size: {
                        id: string;
                        organization_id: string;
                        created_at: Date;
                        updated_at: Date;
                        name: string;
                        qr_o: number;
                    };
                } & {
                    product_id: string;
                    product_size_id: string;
                    price: number;
                    organization_id: string;
                    order: number;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean | null;
                })[];
            };
        }>;
        get_all: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: {
                products: {
                    product_modification: {
                        apm: string;
                        app_product_modification: {
                            id: string;
                            apmg: string;
                            name: string;
                        };
                        p_id: string;
                        pi: number;
                        o: number;
                    }[];
                    ingredient_product: ({
                        ingredient: {
                            id: string;
                            organization_id: string;
                            name: string;
                        };
                    } & {
                        ingredient_id: string;
                        product_id: string;
                        default: boolean;
                        price: number;
                        organization_id: string;
                    })[];
                    product_size_price: ({
                        product_size: {
                            id: string;
                            organization_id: string;
                            created_at: Date;
                            updated_at: Date;
                            name: string;
                            qr_o: number;
                        };
                    } & {
                        product_id: string;
                        product_size_id: string;
                        price: number;
                        organization_id: string;
                        order: number;
                        qr_v: boolean;
                        qr_o: number;
                        w_v: boolean | null;
                    })[];
                    id: string;
                    organization_id: string;
                    name: string;
                    product_category_id: string;
                    enabled: boolean;
                    price_take_away: number;
                    price_pick_up: number;
                    price_delivery: number;
                    created_at: Date;
                    updated_at: Date;
                    min_num_ingredient: number;
                    max_num_ingredient: number;
                    priority: number;
                    priority_ko: number;
                    enabled_u: boolean;
                    priority_u: number;
                    name_i: string;
                    description: string;
                    type: string;
                    adp: bigint | null;
                    adps: bigint | null;
                    tax: number;
                    ref: string | null;
                    quantity_max: number | null;
                    quantity_min: number;
                    unit: string;
                    bar_code: string | null;
                    has_attributes: boolean;
                    quantity: number;
                    deleted: boolean;
                    weight: number | null;
                    length: number | null;
                    height: number | null;
                    width: number | null;
                    price_discounted: number | null;
                    quantity_increase_amount: number;
                    qa: number | null;
                    pap: number;
                    qan: boolean;
                    description_aditional: string | null;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean;
                }[];
                categories: {
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
        get_all_to_reorder: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                products_ids: string[];
            };
            output: {
                id: string;
                name: string;
                priority_u: number;
                priority: number;
                priority_ko: number;
            }[];
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
            };
            output: {
                product_deleted: {
                    id: string;
                    organization_id: string;
                    name: string;
                    product_category_id: string;
                    enabled: boolean;
                    price_take_away: number;
                    price_pick_up: number;
                    price_delivery: number;
                    created_at: Date;
                    updated_at: Date;
                    min_num_ingredient: number;
                    max_num_ingredient: number;
                    priority: number;
                    priority_ko: number;
                    enabled_u: boolean;
                    priority_u: number;
                    name_i: string;
                    description: string;
                    type: string;
                    adp: bigint | null;
                    adps: bigint | null;
                    tax: number;
                    ref: string | null;
                    quantity_max: number | null;
                    quantity_min: number;
                    unit: string;
                    bar_code: string | null;
                    has_attributes: boolean;
                    quantity: number;
                    deleted: boolean;
                    weight: number | null;
                    length: number | null;
                    height: number | null;
                    width: number | null;
                    price_discounted: number | null;
                    quantity_increase_amount: number;
                    qa: number | null;
                    pap: number;
                    qan: boolean;
                    description_aditional: string | null;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean;
                };
            };
        }>;
        saver_order_waiter: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                products_to_save: {
                    id: string;
                    priority_u: number;
                }[];
            };
            output: {
                products: {
                    id: string;
                    priority_u: number;
                }[];
            };
        }>;
        create_product: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                organization_id: string;
                name_i: string;
                price_take_away: number;
                price_delivery: number;
                price_pick_up: number;
                product_category_id: string;
            };
            output: {
                id: string;
                organization_id: string;
                name: string;
                product_category_id: string;
                enabled: boolean;
                price_take_away: number;
                price_pick_up: number;
                price_delivery: number;
                created_at: Date;
                updated_at: Date;
                min_num_ingredient: number;
                max_num_ingredient: number;
                priority: number;
                priority_ko: number;
                enabled_u: boolean;
                priority_u: number;
                name_i: string;
                description: string;
                type: string;
                adp: bigint | null;
                adps: bigint | null;
                tax: number;
                ref: string | null;
                quantity_max: number | null;
                quantity_min: number;
                unit: string;
                bar_code: string | null;
                has_attributes: boolean;
                quantity: number;
                deleted: boolean;
                weight: number | null;
                length: number | null;
                height: number | null;
                width: number | null;
                price_discounted: number | null;
                quantity_increase_amount: number;
                qa: number | null;
                pap: number;
                qan: boolean;
                description_aditional: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            };
        }>;
        edit_product: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                name: string;
                organization_id: string;
                name_i: string;
                price_take_away: number;
                price_delivery: number;
                price_pick_up: number;
                product_category_id: string;
            };
            output: {
                id: string;
                organization_id: string;
                name: string;
                product_category_id: string;
                enabled: boolean;
                price_take_away: number;
                price_pick_up: number;
                price_delivery: number;
                created_at: Date;
                updated_at: Date;
                min_num_ingredient: number;
                max_num_ingredient: number;
                priority: number;
                priority_ko: number;
                enabled_u: boolean;
                priority_u: number;
                name_i: string;
                description: string;
                type: string;
                adp: bigint | null;
                adps: bigint | null;
                tax: number;
                ref: string | null;
                quantity_max: number | null;
                quantity_min: number;
                unit: string;
                bar_code: string | null;
                has_attributes: boolean;
                quantity: number;
                deleted: boolean;
                weight: number | null;
                length: number | null;
                height: number | null;
                width: number | null;
                price_discounted: number | null;
                quantity_increase_amount: number;
                qa: number | null;
                pap: number;
                qan: boolean;
                description_aditional: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            };
        }>;
        get_by_id: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
            };
            output: ({
                ingredient_product: ({
                    ingredient: {
                        id: string;
                        organization_id: string;
                        name: string;
                    };
                } & {
                    ingredient_id: string;
                    product_id: string;
                    default: boolean;
                    price: number;
                    organization_id: string;
                })[];
                product_size_price: ({
                    product_size: {
                        id: string;
                        organization_id: string;
                        created_at: Date;
                        updated_at: Date;
                        name: string;
                        qr_o: number;
                    };
                } & {
                    product_id: string;
                    product_size_id: string;
                    price: number;
                    organization_id: string;
                    order: number;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean | null;
                })[];
                product_modification: ({
                    app_product_modification: {
                        id: bigint;
                        name: string;
                        apmg: bigint | null;
                    };
                } & {
                    p_id: string;
                    apm: bigint;
                    pi: number;
                    o: number;
                })[];
            } & {
                id: string;
                organization_id: string;
                name: string;
                product_category_id: string;
                enabled: boolean;
                price_take_away: number;
                price_pick_up: number;
                price_delivery: number;
                created_at: Date;
                updated_at: Date;
                min_num_ingredient: number;
                max_num_ingredient: number;
                priority: number;
                priority_ko: number;
                enabled_u: boolean;
                priority_u: number;
                name_i: string;
                description: string;
                type: string;
                adp: bigint | null;
                adps: bigint | null;
                tax: number;
                ref: string | null;
                quantity_max: number | null;
                quantity_min: number;
                unit: string;
                bar_code: string | null;
                has_attributes: boolean;
                quantity: number;
                deleted: boolean;
                weight: number | null;
                length: number | null;
                height: number | null;
                width: number | null;
                price_discounted: number | null;
                quantity_increase_amount: number;
                qa: number | null;
                pap: number;
                qan: boolean;
                description_aditional: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            }) | null;
        }>;
        get_products_with_ingredients: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: ({
                ingredient_product: ({
                    ingredient: {
                        id: string;
                        organization_id: string;
                        name: string;
                    };
                } & {
                    ingredient_id: string;
                    product_id: string;
                    default: boolean;
                    price: number;
                    organization_id: string;
                })[];
            } & {
                id: string;
                organization_id: string;
                name: string;
                product_category_id: string;
                enabled: boolean;
                price_take_away: number;
                price_pick_up: number;
                price_delivery: number;
                created_at: Date;
                updated_at: Date;
                min_num_ingredient: number;
                max_num_ingredient: number;
                priority: number;
                priority_ko: number;
                enabled_u: boolean;
                priority_u: number;
                name_i: string;
                description: string;
                type: string;
                adp: bigint | null;
                adps: bigint | null;
                tax: number;
                ref: string | null;
                quantity_max: number | null;
                quantity_min: number;
                unit: string;
                bar_code: string | null;
                has_attributes: boolean;
                quantity: number;
                deleted: boolean;
                weight: number | null;
                length: number | null;
                height: number | null;
                width: number | null;
                price_discounted: number | null;
                quantity_increase_amount: number;
                qa: number | null;
                pap: number;
                qan: boolean;
                description_aditional: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            })[];
        }>;
        update_ingredient_product_active_or_desactive: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                ingredient_id: string;
                product_id: string;
                active: boolean;
            };
            output: {
                ingredient_id: string;
                product_id: string;
                default: boolean;
                price: number;
                organization_id: string;
            };
        }>;
        add_ingredient_to_product: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                product_id: string;
                ingredients_ids: string[];
            };
            output: {
                created_ingredients_to_product: ({
                    ingredient: {
                        id: string;
                        organization_id: string;
                        name: string;
                    };
                } & {
                    ingredient_id: string;
                    product_id: string;
                    default: boolean;
                    price: number;
                    organization_id: string;
                })[];
            };
        }>;
        remove_ingredient_to_product: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ingredient_id: string;
                product_id: string;
            };
            output: boolean;
        }>;
        edit_ingredient_to_product: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                ingredient_id: string;
                product_id: string;
                price: number;
            };
            output: {
                ingredient_updated: {
                    ingredient_id: string;
                    product_id: string;
                    default: boolean;
                    price: number;
                    organization_id: string;
                };
            };
        }>;
        update_priority: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                products: {
                    id: string;
                    num: number;
                }[];
                prior: string;
            };
            output: {
                success: boolean;
            };
        }>;
        edit_product_size_price: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                product_id: string;
                price: number;
                product_size_id: string;
            };
            output: {
                updated_product_size_price: {
                    product_size: {
                        id: string;
                        organization_id: string;
                        created_at: Date;
                        updated_at: Date;
                        name: string;
                        qr_o: number;
                    };
                } & {
                    product_id: string;
                    product_size_id: string;
                    price: number;
                    organization_id: string;
                    order: number;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean | null;
                };
            };
        }>;
        delete_product_size_prices: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                product_id: string;
                product_size_id: string;
            };
            output: {
                product_size_deleted: {
                    product_id: string;
                    product_size_id: string;
                    price: number;
                    organization_id: string;
                    order: number;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean | null;
                };
            };
        }>;
        add_product_size_to_product: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                product_id: string;
                price: number;
                product_size_id: string;
            };
            output: {
                add_product_size_price: {
                    product_size: {
                        id: string;
                        organization_id: string;
                        created_at: Date;
                        updated_at: Date;
                        name: string;
                        qr_o: number;
                    };
                } & {
                    product_id: string;
                    product_size_id: string;
                    price: number;
                    organization_id: string;
                    order: number;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean | null;
                };
            };
        }>;
        get_all_modifiers: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                id: string;
                name: string;
                app_product_modification: {
                    name: any;
                    id: any;
                    apmg: any;
                }[];
            }[];
        }>;
        create_product_modification: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                p_id: string;
                apm: string[];
                o: number;
                pi: number;
            };
            output: {
                apm: string;
                app_product_modification: {
                    id: string;
                    apmg: string | undefined;
                    name: string;
                };
                p_id: string;
                pi: number;
                o: number;
            }[];
        }>;
        edit_product_modification_by_id: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                p_id: string;
                apm: string;
                o: number;
                pi: number;
            };
            output: {
                updated_modification: {
                    apm: string;
                    app_product_modification: {
                        id: string;
                        apmg: string | undefined;
                        name: string;
                    };
                    p_id: string;
                    pi: number;
                    o: number;
                };
            };
        }>;
        remove_product_modification: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                p_id: string;
                apm: number;
            };
            output: boolean;
        }>;
        edit_order_and_visualization: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                priority_u: number;
                product_category_id: string;
                priority: number;
                priority_ko: number;
                qr_o: number;
                w_v: boolean;
            };
            output: {
                edit_order_and_visualization: {
                    id: string;
                    organization_id: string;
                    name: string;
                    product_category_id: string;
                    enabled: boolean;
                    price_take_away: number;
                    price_pick_up: number;
                    price_delivery: number;
                    created_at: Date;
                    updated_at: Date;
                    min_num_ingredient: number;
                    max_num_ingredient: number;
                    priority: number;
                    priority_ko: number;
                    enabled_u: boolean;
                    priority_u: number;
                    name_i: string;
                    description: string;
                    type: string;
                    adp: bigint | null;
                    adps: bigint | null;
                    tax: number;
                    ref: string | null;
                    quantity_max: number | null;
                    quantity_min: number;
                    unit: string;
                    bar_code: string | null;
                    has_attributes: boolean;
                    quantity: number;
                    deleted: boolean;
                    weight: number | null;
                    length: number | null;
                    height: number | null;
                    width: number | null;
                    price_discounted: number | null;
                    quantity_increase_amount: number;
                    qa: number | null;
                    pap: number;
                    qan: boolean;
                    description_aditional: string | null;
                    qr_v: boolean;
                    qr_o: number;
                    w_v: boolean;
                };
            };
        }>;
    }>;
    product_size: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        get_all: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: {
                product_sizes: {
                    id: string;
                    organization_id: string;
                    created_at: Date;
                    updated_at: Date;
                    name: string;
                    qr_o: number;
                }[];
            };
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                organization_id: string;
                qr_o: number;
            };
            output: {
                product_size: {
                    id: string;
                    organization_id: string;
                    created_at: Date;
                    updated_at: Date;
                    name: string;
                    qr_o: number;
                };
            };
        }>;
        edit: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                name: string;
                organization_id: string;
                qr_o: number;
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
                    created_at: Date;
                    updated_at: Date;
                    name: string;
                    qr_o: number;
                };
            };
        }>;
        save_order_category: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                product_size: {
                    id: string;
                    qr_o: number;
                }[];
                organization_id: string;
            };
            output: boolean;
        }>;
    }>;
    products_categories: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    product_category: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        get_by_id: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
            };
            output: {
                category: {
                    product: {
                        id: string;
                        organization_id: string;
                        name: string;
                        product_category_id: string;
                        enabled: boolean;
                        price_take_away: number;
                        price_pick_up: number;
                        price_delivery: number;
                        created_at: Date;
                        updated_at: Date;
                        min_num_ingredient: number;
                        max_num_ingredient: number;
                        priority: number;
                        priority_ko: number;
                        enabled_u: boolean;
                        priority_u: number;
                        name_i: string;
                        description: string;
                        type: string;
                        adp: bigint | null;
                        adps: bigint | null;
                        tax: number;
                        ref: string | null;
                        quantity_max: number | null;
                        quantity_min: number;
                        unit: string;
                        bar_code: string | null;
                        has_attributes: boolean;
                        quantity: number;
                        deleted: boolean;
                        weight: number | null;
                        length: number | null;
                        height: number | null;
                        width: number | null;
                        price_discounted: number | null;
                        quantity_increase_amount: number;
                        qa: number | null;
                        pap: number;
                        qan: boolean;
                        description_aditional: string | null;
                        qr_v: boolean;
                        qr_o: number;
                        w_v: boolean;
                    }[];
                    product_category_has_other_product_category_product_category_has_other_product_category_idToproduct_category: ({
                        product_category_product_category_has_other_product_category_pc_idToproduct_category: {
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
                    } & {
                        id: string;
                        pc_id: string;
                        pi: number;
                        o: number;
                        not_add_princing: boolean;
                    })[];
                    product_category_has_other_product_category_product_category_has_other_product_category_pc_idToproduct_category: ({
                        product_category_product_category_has_other_product_category_idToproduct_category: {
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
                    } & {
                        id: string;
                        pc_id: string;
                        pi: number;
                        o: number;
                        not_add_princing: boolean;
                    })[];
                } & {
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
        add_categories_that_modify: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                categories_ids: string[];
            };
            output: {
                add_categories_that_modify: {
                    id: string;
                    pc_id: string;
                    pi: number;
                    o: number;
                    not_add_princing: boolean;
                }[];
            };
        }>;
        delete_categories_that_modify: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                category_id: string;
            };
            output: {
                removed_categories_that_modify: {
                    id: string;
                    pc_id: string;
                    pi: number;
                    o: number;
                    not_add_princing: boolean;
                };
            };
        }>;
        edit_category_that_modify: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                o: number;
                pi: number;
                category_id: string;
                not_add_princing: boolean;
            };
            output: {
                update_category: {
                    id: string;
                    pc_id: string;
                    pi: number;
                    o: number;
                    not_add_princing: boolean;
                };
            };
        }>;
        add_categories_that_use: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                categories_ids: string[];
            };
            output: {
                add_categories_that_use: {
                    id: string;
                    pc_id: string;
                    pi: number;
                    o: number;
                    not_add_princing: boolean;
                }[];
            };
        }>;
        delete_categories_that_use: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                category_id: string;
            };
            output: {
                delete_categories_that_use: {
                    id: string;
                    pc_id: string;
                    pi: number;
                    o: number;
                    not_add_princing: boolean;
                };
            };
        }>;
        edit_category_that_use: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                o: number;
                pi: number;
                category_id: string;
                not_add_princing: boolean;
            };
            output: {
                update_category: {
                    id: string;
                    pc_id: string;
                    pi: number;
                    o: number;
                    not_add_princing: boolean;
                };
            };
        }>;
    }>;
    printer_job: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    oidokocina: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    orders: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
    qr: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        get_categories_of_products: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: {
                id: string;
                name: string;
                qr_o: number;
                qr_v: boolean;
            }[];
        }>;
        change_order_categories_of_products: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                qr_v: boolean;
            };
            output: {
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
        }>;
        save_order_category: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                categories: {
                    id: string;
                    qr_o: number;
                }[];
            };
            output: boolean;
        }>;
        get_products_within_category: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                product_category_id: string;
            };
            output: {
                id: string;
                name: string;
                qr_o: number;
                qr_v: boolean;
                product_allergen: {
                    product_id: string;
                    a_id: number;
                }[];
            }[];
        }>;
        get_name_of_category: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
            };
            output: {
                name: string;
            } | null;
        }>;
        change_order_of_products: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                organization_id: string;
                qr_v: boolean;
            };
            output: {
                id: string;
                organization_id: string;
                name: string;
                product_category_id: string;
                enabled: boolean;
                price_take_away: number;
                price_pick_up: number;
                price_delivery: number;
                created_at: Date;
                updated_at: Date;
                min_num_ingredient: number;
                max_num_ingredient: number;
                priority: number;
                priority_ko: number;
                enabled_u: boolean;
                priority_u: number;
                name_i: string;
                description: string;
                type: string;
                adp: bigint | null;
                adps: bigint | null;
                tax: number;
                ref: string | null;
                quantity_max: number | null;
                quantity_min: number;
                unit: string;
                bar_code: string | null;
                has_attributes: boolean;
                quantity: number;
                deleted: boolean;
                weight: number | null;
                length: number | null;
                height: number | null;
                width: number | null;
                price_discounted: number | null;
                quantity_increase_amount: number;
                qa: number | null;
                pap: number;
                qan: boolean;
                description_aditional: string | null;
                qr_v: boolean;
                qr_o: number;
                w_v: boolean;
            };
        }>;
        save_order_products: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
                products: {
                    id: string;
                    qr_o: number;
                }[];
            };
            output: boolean;
        }>;
        change_allergen: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                product_id: string;
                active: boolean;
                a_id: number;
            };
            output: {
                product_id: string;
                a_id: number;
            };
        }>;
        getAllAllergen: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                allergens: {
                    id: number;
                    url: string;
                }[];
            };
        }>;
    }>;
    organization_commander: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        get_all: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                o_id: string;
            };
            output: {
                id: string;
                created_at: Date;
                updated_at: Date;
                o_id: string;
                v: number;
                conf: import(".prisma/client").Prisma.JsonValue;
                name: string;
                order: number;
                print_available: boolean;
                print_name: string;
            }[];
        }>;
        get_categories_and_products: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: {
                categories_and_products: ({
                    product: {
                        id: string;
                        organization_id: string;
                        name: string;
                        product_category_id: string;
                        enabled: boolean;
                        price_take_away: number;
                        price_pick_up: number;
                        price_delivery: number;
                        created_at: Date;
                        updated_at: Date;
                        min_num_ingredient: number;
                        max_num_ingredient: number;
                        priority: number;
                        priority_ko: number;
                        enabled_u: boolean;
                        priority_u: number;
                        name_i: string;
                        description: string;
                        type: string;
                        adp: bigint | null;
                        adps: bigint | null;
                        tax: number;
                        ref: string | null;
                        quantity_max: number | null;
                        quantity_min: number;
                        unit: string;
                        bar_code: string | null;
                        has_attributes: boolean;
                        quantity: number;
                        deleted: boolean;
                        weight: number | null;
                        length: number | null;
                        height: number | null;
                        width: number | null;
                        price_discounted: number | null;
                        quantity_increase_amount: number;
                        qa: number | null;
                        pap: number;
                        qan: boolean;
                        description_aditional: string | null;
                        qr_v: boolean;
                        qr_o: number;
                        w_v: boolean;
                    }[];
                } & {
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
                })[];
            };
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                form: {
                    name: string;
                    order: number;
                    print_available: boolean;
                    print_name: string;
                    status_selected: string[];
                    max_time: number;
                    name_internals: boolean;
                    notifications: boolean;
                };
                product_categories_blocked: string[];
                product_ids_blocked: string[];
                product_ids_allowed: string[];
            };
            output: {
                id: string;
                created_at: Date;
                updated_at: Date;
                o_id: string;
                v: number;
                conf: import(".prisma/client").Prisma.JsonValue;
                name: string;
                order: number;
                print_available: boolean;
                print_name: string;
            };
        }>;
    }>;
    share: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
        select_products: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                organization_id: string;
            };
            output: {
                categories: ({
                    product: {
                        id: string;
                        organization_id: string;
                        name: string;
                        product_category_id: string;
                        enabled: boolean;
                        price_take_away: number;
                        price_pick_up: number;
                        price_delivery: number;
                        created_at: Date;
                        updated_at: Date;
                        min_num_ingredient: number;
                        max_num_ingredient: number;
                        priority: number;
                        priority_ko: number;
                        enabled_u: boolean;
                        priority_u: number;
                        name_i: string;
                        description: string;
                        type: string;
                        adp: bigint | null;
                        adps: bigint | null;
                        tax: number;
                        ref: string | null;
                        quantity_max: number | null;
                        quantity_min: number;
                        unit: string;
                        bar_code: string | null;
                        has_attributes: boolean;
                        quantity: number;
                        deleted: boolean;
                        weight: number | null;
                        length: number | null;
                        height: number | null;
                        width: number | null;
                        price_discounted: number | null;
                        quantity_increase_amount: number;
                        qa: number | null;
                        pap: number;
                        qan: boolean;
                        description_aditional: string | null;
                        qr_v: boolean;
                        qr_o: number;
                        w_v: boolean;
                    }[];
                } & {
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
                })[];
            };
        }>;
    }>;
}>>;
