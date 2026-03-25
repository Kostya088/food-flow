import { ImageResponse } from "next/og";

export const alt = "Food Flow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(135deg, #fff4e6 0%, #ffefcb 100%)",
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: 56,
          backgroundImage: "linear-gradient(135deg, #023820 0%, #012b18 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
        }}
      >
        {/* Top bun */}
        <div
          style={{
            width: 106,
            height: 50,
            borderRadius: "60px 60px 0 0",
            backgroundImage:
              "linear-gradient(135deg, #f9a11b 0%, #d98817 100%)",
            marginBottom: 4,
          }}
        />
        {/* Red layer */}
        <div
          style={{
            width: 116,
            height: 19,
            borderRadius: 10,
            backgroundColor: "#c94a38",
            marginBottom: 4,
          }}
        />
        {/* Bottom bun */}
        <div
          style={{
            width: 96,
            height: 18,
            borderRadius: 9,
            backgroundColor: "#fff4e6",
          }}
        />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 86,
          fontWeight: 700,
          color: "#023820",
          letterSpacing: 2,
        }}
      >
        Food Flow
      </div>
    </div>,
    { ...size },
  );
}
