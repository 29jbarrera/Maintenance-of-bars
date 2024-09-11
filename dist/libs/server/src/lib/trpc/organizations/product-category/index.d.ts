export declare const product_category: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
