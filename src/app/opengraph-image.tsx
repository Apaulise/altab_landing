import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ALTAB, consultoría en inteligencia artificial, automatización y software a medida";

const logo = await readFile(join(process.cwd(), "public/altab-simbolo-metal.svg"), "base64");

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 54, padding: 78, background: "#202124", color: "#fff0ce" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 625 }}>
          <span style={{ fontSize: 30, color: "#f3d38c", letterSpacing: 5, fontWeight: 700 }}>ALTAB</span>
          <span style={{ fontSize: 67, lineHeight: 1.04, letterSpacing: -3, fontWeight: 700, marginTop: 30 }}>
            Tu negocio puede funcionar mejor.
          </span>
          <span style={{ color: "#d0cdc6", fontSize: 26, marginTop: 28 }}>
            Inteligencia artificial, automatización y software
          </span>
        </div>
        <img src={`data:image/svg+xml;base64,${logo}`} width={350} height={218} alt="" />
      </div>
    ),
    size,
  );
}
