const VIDEO_FILE = /\.(mp4|webm)(?:$|[?#])/i;

/** Converts common video share links into safe, provider-specific player URLs. */
export function getVideoEmbedUrl(value: string): string | null {
  const input = value.trim();
  if (input.startsWith("/") && !input.startsWith("//")) {
    return VIDEO_FILE.test(input) ? input : null;
  }

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;

  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);
  const isHost = (domain: string) => host === domain || host.endsWith(`.${domain}`);

  if (VIDEO_FILE.test(url.pathname)) return url.toString();

  if (isHost("youtube.com") || host === "youtube-nocookie.com") {
    const id =
      url.searchParams.get("v") ??
      (["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : undefined);
    if (id && /^[\w-]{11}$/.test(id)) {
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }
  }
  if (host === "youtu.be" && /^[\w-]{11}$/.test(parts[0] ?? "")) {
    return `https://www.youtube-nocookie.com/embed/${parts[0]}`;
  }

  if (isHost("vimeo.com")) {
    const id = parts.at(-1);
    if (id && /^\d+$/.test(id)) {
      const embed = new URL(`https://player.vimeo.com/video/${id}`);
      const privacyHash = url.searchParams.get("h");
      if (privacyHash && /^[\w]+$/.test(privacyHash)) embed.searchParams.set("h", privacyHash);
      return embed.toString();
    }
  }

  if (isHost("dailymotion.com") || host === "dai.ly") {
    const videoIndex = parts.findIndex((part) => part === "video");
    const id = (host === "dai.ly" ? parts[0] : parts[videoIndex + 1])?.split("_")[0];
    if (id && /^[\w]+$/.test(id)) return `https://www.dailymotion.com/embed/video/${id}`;
  }

  if (isHost("facebook.com") || host === "fb.watch") {
    const isVideoPage = host === "fb.watch" || url.searchParams.has("v") || parts.includes("videos");
    if (isVideoPage) {
      const embed = new URL("https://www.facebook.com/plugins/video.php");
      embed.searchParams.set("href", url.toString());
      embed.searchParams.set("show_text", "false");
      return embed.toString();
    }
  }

  if (isHost("tiktok.com")) {
    const videoIndex = parts.indexOf("video");
    const id = parts[videoIndex + 1];
    if (id && /^\d+$/.test(id)) return `https://www.tiktok.com/embed/v2/${id}`;
  }

  if (isHost("instagram.com")) {
    const typeIndex = parts.findIndex((part) => part === "reel" || part === "reels" || part === "p");
    const id = parts[typeIndex + 1];
    if (id && /^[\w-]+$/.test(id)) return `https://www.instagram.com/${parts[typeIndex]}/${id}/embed`;
  }

  if (isHost("loom.com") && parts[0] === "share" && parts[1] && /^[\w]+$/.test(parts[1])) {
    return `https://www.loom.com/embed/${parts[1]}`;
  }

  if (isHost("wistia.com")) {
    const mediaIndex = parts.indexOf("medias");
    const id = parts[mediaIndex + 1];
    if (id && /^[\w]+$/.test(id)) return `https://fast.wistia.net/embed/iframe/${id}`;
  }

  if (isHost("streamable.com") && parts[0] && /^[\w]+$/.test(parts[0])) {
    return `https://streamable.com/e/${parts[0]}`;
  }

  if (isHost("rumble.com") && parts[0]?.startsWith("v")) {
    const id = parts[0].split(/[.-]/)[0];
    return `https://rumble.com/embed/${id}/`;
  }

  return null;
}
