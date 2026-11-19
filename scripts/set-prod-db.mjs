import fs from "fs";

const data = JSON.parse(fs.readFileSync("scripts/.db-created.json", "utf8"));
const conn = data.connectionString;
const claim = data.claimUrl;

let env = fs.readFileSync(".env", "utf8");
const line = `DATABASE_URL="${conn}"`;
if (/^DATABASE_URL=/m.test(env)) {
  env = env.replace(/^DATABASE_URL=.*$/m, line);
} else {
  env = `${line}\n${env}`;
}
const claimLine = `DATABASE_CLAIM_URL="${claim}"`;
if (/^DATABASE_CLAIM_URL=/m.test(env)) {
  env = env.replace(/^DATABASE_CLAIM_URL=.*$/m, claimLine);
} else {
  env += `\n${claimLine}\n`;
}
fs.writeFileSync(".env", env);
fs.writeFileSync(".deploy-claim-url.txt", `${claim}\n`);
console.log("Updated .env DATABASE_URL + saved claim URL");
