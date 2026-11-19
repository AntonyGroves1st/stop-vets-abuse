import { spawnSync } from "child_process";
import fs from "fs";

const envText = fs.readFileSync(".env", "utf8");
const wanted = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "STRIPE_SECRET_KEY",
  "STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "PAYPAL_MODE",
];

const map = {};
for (const raw of envText.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith("#")) continue;
  const i = line.indexOf("=");
  if (i < 0) continue;
  const key = line.slice(0, i).trim();
  let val = line.slice(i + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  map[key] = val;
}

const targets = ["production", "preview", "development"];

for (const key of wanted) {
  const val = map[key];
  if (!val || val.includes("...") || val.includes("replace_me") || val.includes("generate-a-long")) {
    console.log(`skip ${key}`);
    continue;
  }
  for (const target of targets) {
    const r = spawnSync("vercel", ["env", "add", key, target, "--force"], {
      input: val + "\n",
      encoding: "utf8",
      shell: true,
    });
    if (r.status !== 0) {
      console.log(`fail ${key} ${target}: ${(r.stderr || r.stdout || "").slice(0, 200)}`);
    } else {
      console.log(`ok ${key} → ${target}`);
    }
  }
}

console.log("done pushing env");
