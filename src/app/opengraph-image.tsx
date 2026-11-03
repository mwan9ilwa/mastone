import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shown when the site is shared on WhatsApp, Facebook, LinkedIn, X, etc. Rendered once at build time.
export const alt = "Mastone Investments Ltd: equipment and power solutions in Zambia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dataUri = async (file: string) =>
  `data:image/png;base64,${await readFile(join(process.cwd(), "public/images", file), "base64")}`;

const [photo, logo] = await Promise.all([dataUri("hero-loader.png"), dataUri("logo-white.png")]);

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0a1a33" }}>
        <img src={photo} alt="" width={942} height={630} style={{ position: "absolute", right: -100, top: 0 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage: "linear-gradient(90deg, #0a1a33 0%, #0a1a33 42%, rgba(10,26,51,0.55) 62%, rgba(10,26,51,0) 85%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", width: 640 }}>
          <img src={logo} alt="" width={283} height={81} />
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontSize: 60, fontWeight: 800, lineHeight: 1, color: "white", textTransform: "uppercase", letterSpacing: -1 }}>
            <span>Equipment &amp;</span>
            <span style={{ color: "#13caec" }}>Power Solutions</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 26, lineHeight: 1.35, color: "rgba(255,255,255,0.8)" }}>
            SUNWARD machinery, YTO tractors, WEICHAI generators and SINOTRUK trucks across Zambia.
          </div>
          <div style={{ display: "flex", marginTop: 36, height: 6, width: 120, borderRadius: 3, background: "#13caec" }} />
        </div>
      </div>
    ),
    size
  );
}
