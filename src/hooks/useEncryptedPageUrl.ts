import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { decryptString, encryptString } from "../util/crypt";
import toast from "react-hot-toast";

const getEncryptKey = () => {
  const timestamp = Math.floor(+new Date() / 1000 / 180); // Valid for around 3 minutes
  return `qrip-pwd-${timestamp}`;
};

export const useEncryptedPageUrl = () => {
  const [text, setText] = useState<string>("");
  const param = useSearchParams();

  useEffect(() => {
    const decryptParam = async () => {
      const href = window.location.href;
      const paramPos = href.indexOf("?text");
      const origin = paramPos >= 0 ? href.slice(0, paramPos) : href;
      setSiteOrigin(origin);

      const text = param.get("text");
      if (text) {
        try {
          const decrypted = await decryptString(text, getEncryptKey());
          setText(decrypted);
        } catch (e) {
          toast.error("Invalid URL");
        }
      }
    };

    decryptParam();
  }, [param]);

  const [pageUrl, setPageUrl] = useState<string>("");
  const [siteOrigin, setSiteOrigin] = useState<string>("");

  useEffect(() => {
    const encryptPageUrl = async () => {
      const encrypted = await encryptString(text, getEncryptKey());
      const pageUrl = `${siteOrigin}/?text=${encodeURIComponent(encrypted)}`;
      setPageUrl(pageUrl);
    };
    encryptPageUrl();
  }, [text, siteOrigin]);

  return { pageUrl, text, setText } as const;
};
