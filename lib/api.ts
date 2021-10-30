import fs from "fs";
import { join } from "path";

const skillsDir = join(process.cwd(), "_skills");

export function getSkillSlugs() {
  return fs.readdirSync(skillsDir);
}

export function getJsonBySlug(slug: string) {
  const fullPath = join(skillsDir, `${slug}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return JSON.parse(fileContents);
}
