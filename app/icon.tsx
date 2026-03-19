import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#044982",
          borderRadius: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Gold top accent line */}
        <div
          style={{
            width: 18,
            height: 2,
            background: "#cda102",
            borderRadius: 1,
            marginBottom: 3,
          }}
        />
        {/* LH monogram */}
        <div
          style={{
            display: "flex",
            fontSize: 13,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            lineHeight: 1,
            fontFamily: "serif",
          }}
        >
          LH
        </div>
      </div>
    ),
    { ...size }
  );
}
