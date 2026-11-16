import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Полина Олитто | Консалтинг и внедрение изменений";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "app/fonts/Unbounded-Medium.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#2A0A12",
          color: "#FAF6F0",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#C9A227" }}>
          На пути изменений
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: -1.5,
          }}
        >
          Когда бизнес-результат
        </div>
        <div style={{ display: "flex", fontSize: 60, lineHeight: 1.05, color: "#F3ECE1" }}>
          не устраивает
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            width: 72,
            height: 2,
            background: "#C9A227",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 28,
            maxWidth: 760,
            fontSize: 28,
            lineHeight: 1.4,
            color: "rgba(250,246,240,0.82)",
          }}
        >
          Диагностика, план и сопровождение изменений в компании
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Unbounded", data: font, weight: 500, style: "normal" }],
    },
  );
}
