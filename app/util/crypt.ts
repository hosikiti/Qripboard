import * as passworder from "@metamask/browser-passworder";

export const encryptString = async (
  text: string,
  password: string
): Promise<string> => {
  const result = await passworder.encrypt(password, text);
  return result;
};

export const decryptString = async (
  text: string,
  password: string
): Promise<string> => {
  const result = await passworder.decrypt(password, text);
  return result as string;
};
