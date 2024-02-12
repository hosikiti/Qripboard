import QRCode from "react-qr-code";

type SmallQRCodeProps = {
  pageUrl: string;
};

export default function SmallQRCode({ pageUrl }: SmallQRCodeProps) {
  return (
    <div className="bg-white p-4 w-[70%]">
      <QRCode
        size={256}
        style={{
          height: "auto",
          maxWidth: "100%",
          width: "100%",
        }}
        value={pageUrl}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}
