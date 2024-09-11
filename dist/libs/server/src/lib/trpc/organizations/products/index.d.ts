export declare const products: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
