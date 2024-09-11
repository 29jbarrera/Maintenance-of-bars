import * as jose from 'jose';

const privateKey = new TextEncoder().encode(process.env['jwtSecrectKey']);
export type JWTDecode = {
  id: string;
};

export async function decoke_and_verify_token(
  token: string
): Promise<null | JWTDecode> {
  if (!token) return null;

  try {
    const { payload } = await jose.jwtVerify(token, privateKey, {
      algorithms: ['HS512'],
    });

    return payload as JWTDecode;
  } catch (error) {
    // console.error(error);
    return null;
  }
}

export async function encode(data: any) {
  const token = await new jose.SignJWT(data)
    .setProtectedHeader({
      alg: 'HS512',
    })
    .sign(privateKey);
  return token;
}

import * as bcrypt from 'bcrypt';
const saltRounds = 15;

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function comparePassword(password: string, hash: string) {
  const match = await bcrypt.compare(password, hash);
  return match;
}
