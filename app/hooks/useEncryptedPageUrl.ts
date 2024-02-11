import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { decryptString, encryptString } from "../util/crypt";

export const useEncryptedPageUrl = (encryptKey: string) => {
  const [text, setText] = useState<string>("");
  const param = useSearchParams();

  useEffect(() => {
    const decryptParam = async () => {
      const text = param.get("text");
      if (text) {
        const decrypted = await decryptString(text, encryptKey);
        setText(decrypted);
      }
    };

    decryptParam();
  }, [param, encryptKey]);

  const [pageUrl, setPageUrl] = useState<string>("");
  const [siteOrigin, setSiteOrigin] = useState<string>("");

  useEffect(() => {
    const href = window.location.href;
    const paramPos = href.indexOf("?text");
    const origin = paramPos >= 0 ? href.slice(0, paramPos) : href;
    setSiteOrigin(origin);
  }, []);

  useEffect(() => {
    const encryptPageUrl = async () => {
      const encrypted = await encryptString(text, encryptKey);
      const pageUrl = `${siteOrigin}/?text=${encodeURIComponent(encrypted)}`;
      setPageUrl(pageUrl);
    };

    encryptPageUrl();
  }, [text, encryptKey, siteOrigin]);

  return { pageUrl, setPageUrl, text, setText } as const;
};
