import { ImageResponse } from "next/og";

export const alt = "Yogesh Gonnade — Senior Video Editor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered by Satori, which supports only a subset of CSS: every element with
// more than one child needs an explicit `display: flex`, and there is no
// external asset or font file to load here.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#1A1A1A",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90px",
            height: "6px",
            backgroundColor: "#FF5A1F",
            marginBottom: "48px",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "104px",
            fontWeight: 700,
            color: "#FAFAF8",
            letterSpacing: "-3px",
            lineHeight: 1.05,
          }}
        >
          Yogesh Gonnade
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "42px",
            color: "#FF5A1F",
            marginTop: "24px",
          }}
        >
          Senior Video Editor
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "rgba(250, 250, 248, 0.6)",
            marginTop: "40px",
          }}
        >
          15+ years editing for news and media
        </div>
      </div>
    ),
    { ...size },
  );
}
