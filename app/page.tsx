"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent, use, useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { decrypt, encrypt } from "./util/crypt";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [encryptKey, setEncryptKey] = useState<string>("password");
  const [pageUrl, setPageUrl] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [siteOrigin, setSiteOrigin] = useState<string>("");
  const param = useSearchParams();

  useEffect(() => {
    const decryptParam = async () => {
      const text = param.get("text");
      if (text) {
        const decrypted = await decrypt(decodeURIComponent(text), encryptKey);
        setText(decrypted);
      }

      const href = window.location.href;
      const paramPos = href.indexOf("?text");
      const origin = paramPos >= 0 ? href.slice(0, paramPos) : href;
      setSiteOrigin(origin);
    };

    decryptParam();
  }, [param, encryptKey]);

  useEffect(() => {
    const encryptPageUrl = async () => {
      const encrypted = await encrypt(text, encryptKey);
      const pageUrl = `${siteOrigin}/?text=${encodeURIComponent(encrypted)}`;
      console.log(pageUrl);
      setPageUrl(pageUrl);
    };

    encryptPageUrl();
  }, [text, encryptKey, siteOrigin]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="text-center">
        <div className="p-4 flex flex-col gap-4">
          <h1 className="font-bold text-6xl">qrip</h1>
          <p>Share Text with QR code</p>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full text-black"
            placeholder="Enter text to share ..."
            rows={6}
            value={text}
            onChange={handleTextChange}
          />
          <button
            className="bg-blue-500 text-white p-4 rounded-md"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </button>
          <h2 className="text-xl font-bold">
            Share above text with this QR code!
          </h2>

          <div className="bg-white p-4">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={pageUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
