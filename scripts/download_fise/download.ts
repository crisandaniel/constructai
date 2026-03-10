import axios from "axios";
import fs from "fs";
import path from "path";

// import din collections.js
const collections = require("./collections.js") as Collection[];

type Collection = {
  folder: string;
  urls: string[];
};

const ROOT_DIR = path.join(process.cwd(), "downloads_fise_tehnice");

function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

function sanitizeSegment(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function normalizeFileName(url: string, index: number): string {
  let rawName = "";

  try {
    const parsedUrl = new URL(url);
    rawName = path.basename(parsedUrl.pathname, ".pdf");
  } catch {
    return `unknown_file_${index + 1}.pdf`;
  }

  const ignoreWords = new Set([
    "fisa",
    "tehnica",
    "tehnice",
    "ft",
    "tds",
    "ro",
    "pdf",
    "tencuiala",
    "tencuieli",
    "mortar",
    "mortarul",
    "glet",
    "gleturi",
    "adeziv",
    "adezivi",
    "grund",
    "grunduri",
    "sapa",
    "decorativa",
    "de",
    "si",
    "pentru",
    "interior",
    "exterior",
    "pe",
    "baza"
  ]);

  const rawParts = rawName
    .split(/[_\-\s().]+/)
    .map((part) => sanitizeSegment(part))
    .filter(Boolean)
    .filter((part) => !ignoreWords.has(part));

  if (rawParts.length === 0) {
    return `unknown_file_${index + 1}.pdf`;
  }

  const brand = rawParts[0];
  const modelParts = rawParts.slice(1);

  let model = modelParts.join("");

  if (!model) {
    model = `file_${index + 1}`;
  }

  return `${brand}_${model}.pdf`;
}

function ensureUniqueFileName(folderPath: string, fileName: string): string {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);

  let candidate = fileName;
  let counter = 2;

  while (fs.existsSync(path.join(folderPath, candidate))) {
    candidate = `${base}_${counter}${ext}`;
    counter++;
  }

  return candidate;
}

async function downloadFile(url: string, destination: string): Promise<void> {
  const response = await axios({
    method: "GET",
    url,
    responseType: "stream",
    timeout: 30000,
    maxRedirects: 5,
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  await new Promise<void>((resolve, reject) => {
    const writer = fs.createWriteStream(destination);

    response.data.pipe(writer);

    writer.on("finish", () => resolve());
    writer.on("error", (err) => reject(err));
  });
}

function validateCollections(input: unknown): Collection[] {
  if (!Array.isArray(input)) {
    throw new Error("collections.js trebuie să exporte un array.");
  }

  return input.filter((item): item is Collection => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof (item as Collection).folder === "string" &&
      Array.isArray((item as Collection).urls)
    );
  });
}

async function run(): Promise<void> {
  const validCollections = validateCollections(collections);

  ensureDir(ROOT_DIR);

  for (const collection of validCollections) {
    const folderPath = path.join(ROOT_DIR, collection.folder);
    ensureDir(folderPath);

    console.log(`\n=== ${collection.folder} ===`);

    for (let i = 0; i < collection.urls.length; i++) {
      const url = collection.urls[i];

      try {
        let fileName = normalizeFileName(url, i);
        fileName = ensureUniqueFileName(folderPath, fileName);

        const outputPath = path.join(folderPath, fileName);

        console.log(`Downloading: ${url}`);
        await downloadFile(url, outputPath);
        console.log(`Saved: ${outputPath}`);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        console.error(`Failed: ${url}`);
        console.error(`Reason: ${message}`);
      }
    }
  }

  console.log("\nDone.");
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error("Fatal error:", message);
  process.exit(1);
});