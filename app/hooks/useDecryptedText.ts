import { useSearchParams } from "next/navigation";
import { decrypt } from "../util/crypt";
import { useEffect, useState } from "react";

export const useDecryptedText = (encryptKey: string) => {
  const [text, setText] = useState<string>("");
  const param = useSearchParams();

  useEffect(() => {
    const decryptParam = async () => {
      const text = param.get("text");
      if (text) {
        const decrypted = await decrypt(decodeURIComponent(text), encryptKey);
        setText(decrypted);
      }
    };

    decryptParam();
  }, [param, encryptKey]);

  return [text, setText] as const;
};
