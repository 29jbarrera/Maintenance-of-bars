export type JWTDecode = {
    id: string;
};
export declare function decoke_and_verify_token(token: string): Promise<null | JWTDecode>;
export declare function encode(data: any): Promise<string>;
export declare function hashPassword(password: string): Promise<string>;
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
