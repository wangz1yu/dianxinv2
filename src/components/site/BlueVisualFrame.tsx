const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="160" height="160" filter="url(#n)" opacity=".26"/></svg>`
);

export function BlueVisualFrame({
  src,
  pos = "50% 50%",
  className = "",
}: {
  src: string;
  pos?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-white ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
        style={{ objectPosition: pos }}
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_18%_10%,rgba(59,130,246,0.35),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,250,0.0),rgba(245,247,250,0.55)_82%,rgba(245,247,250,0.85))]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")` }}
      />
    </div>
  );
}
