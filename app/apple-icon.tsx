import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(145deg, #044982 0%, #033567 100%)",
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Gold top bar */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#cda102",
            borderRadius: 2,
            marginBottom: 14,
          }}
        />
        {/* Monogram */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1,
            fontFamily: "serif",
          }}
        >
          LH
        </div>
        {/* Gold bottom bar */}
        <div
          style={{
            width: 40,
            height: 3,
            background: "#cda102",
            borderRadius: 2,
            marginTop: 12,
            opacity: 0.6,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
