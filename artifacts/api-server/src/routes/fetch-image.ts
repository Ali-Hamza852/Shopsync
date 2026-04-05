import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/fetch-image", async (req, res) => {
  const url = req.query["url"] as string | undefined;

  if (!url) {
    res.status(400).json({ error: "Missing url query parameter" });
    return;
  }

  let targetUrl: string;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      res.status(400).json({ error: "Invalid URL protocol" });
      return;
    }
    targetUrl = parsed.href;
  } catch {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; VectorSearchBot/1.0; +https://vectorsearch.ai)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      res.json({ imageUrl: null });
      return;
    }

    const html = await response.text();

    const ogImageMatch = html.match(
      /<meta\s+(?:[^>]*?\s+)?property=["']og:image["'][^>]*?\s+content=["']([^"']+)["']/i,
    ) || html.match(
      /<meta\s+(?:[^>]*?\s+)?content=["']([^"']+)["'][^>]*?\s+property=["']og:image["']/i,
    );

    if (ogImageMatch && ogImageMatch[1]) {
      res.json({ imageUrl: ogImageMatch[1] });
    } else {
      res.json({ imageUrl: null });
    }
  } catch {
    res.json({ imageUrl: null });
  }
});

export default router;
