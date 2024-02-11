import { encrypt } from "@metamask/browser-passworder";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";
import { useDecryptedText } from "./useDecryptedText";

export const useEncryptedPageUrl = (encryptKey: string) => {
  const [text, setText] = useDecryptedText(encryptKey);
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
      const encrypted = await encrypt(text, encryptKey);
      const pageUrl = `${siteOrigin}/?text=${encodeURIComponent(encrypted)}`;
      setPageUrl(pageUrl);
    };

    encryptPageUrl();
  }, [text, encryptKey, siteOrigin]);

  return { pageUrl, setPageUrl, text, setText } as const;
};
