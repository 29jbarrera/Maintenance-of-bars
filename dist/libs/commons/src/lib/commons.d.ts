export type LetterHead = {
    align: string;
    font: string;
    size_x: number;
    size_y: number;
    style: string;
    text: string;
};
export declare function getIconOfModuleHomeAdmin(icon: string): string;
export declare function getNameOfAllergen(id: number): string;
export declare function normaliceString(str: string): string;
export declare function stringOneIncludeInStringTwo(str1?: string, str2?: string): boolean;
export declare const STATUS_TYPE: string[];
export declare function checkStatus(status: string, exist: boolean): string;
export declare function format_price_amount(amount: number): string;
export declare function cent_to_eur(amount: number): number;
export declare function eur_to_cent(amount: number): number;
export declare function cent_to_eur_format(amount: number): string;
