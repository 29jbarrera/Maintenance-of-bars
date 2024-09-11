import * as firebase_admin from 'firebase-admin';
export declare let admin: firebase_admin.app.App;
export declare function create_user(data: {
    displayName: string;
    email: string;
    password: string;
}): Promise<{
    user: {
        uid: string;
        email: string | undefined;
        displayName: string | undefined;
    };
    already_exist: boolean;
}>;
