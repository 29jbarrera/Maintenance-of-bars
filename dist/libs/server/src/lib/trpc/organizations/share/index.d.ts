export declare const share: import("@trpc/server/dist/unstable-core-do-not-import").BuiltRouter<{
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
