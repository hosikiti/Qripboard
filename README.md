# Qrip

A text sharing utility with a QR code. You can share short text between any sort of devices (even between Macs and Androids), particularly useful for sharing links desktop to mobile! Your text is properly encrypted and only stored in the QR code. Furthermore, the QR code is only valid for 1 minute. After that, your text cannot be decrypted.

## DEMO

[https://hosikiti.github.io/qrip/](https://hosikiti.github.io/qrip/)

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- browser-passworder (for encryption)

## Getting Started

Run the following command to install the package:

```bash
npm install
npm run dev
```

## How to Use

1. Enter your text in the text area.
2. Scan the QR code with your phone (or any other device).
3. Jump to the URL in the QR code to see your text.

## Architecture

- Uses a simple clean architecture.
- `components` folder contains all the components.