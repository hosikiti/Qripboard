"use client";

import { ChangeEvent, use, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TextArea from "../components/Elements/TextArea";
import Button from "../components/Elements/Button";
import { useEncryptedPageUrl } from "../hooks/useEncryptedPageUrl";
import SmallQRCode from "../components/Elements/SmallQRCode";
import { copyToClipboard } from "../util/clipboard";
import CharacterCounter from "../components/Elements/CharacterCounter";

const MAX_TEXT_LENGTH = 500;

export default function Home() {
  const { pageUrl, text, setText } = useEncryptedPageUrl();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 dark:bg-black dark:text-white">
      <div className="text-center">
        <div className="p-4 flex flex-col gap-4">
          <h1 className="font-bold text-5xl">qrip</h1>
          <p>Share Text with QR code</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-col items-end">
              <TextArea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text to share ..."
                maxLength={MAX_TEXT_LENGTH}
              />
              <CharacterCounter
                textLength={text.length}
                maxLength={MAX_TEXT_LENGTH}
              />
            </div>
            <Button onClick={() => copyToClipboard(text)}>
              Copy to Clipboard
            </Button>
          </div>
          <div className="py-4">
            <h2 className="text-xl font-bold pb-2">Share with this QR code!</h2>
            <div
              className="w-full flex flex-row justify-center"
              onClick={() => copyToClipboard(pageUrl)}
            >
              <SmallQRCode pageUrl={pageUrl} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
