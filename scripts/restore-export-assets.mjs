import {readFileSync,existsSync,mkdirSync,copyFileSync} from "node:fs";
import {createHash} from "node:crypto";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("../",import.meta.url));
const mapping=JSON.parse(readFileSync(new URL("./restore-export-assets.json",import.meta.url),"utf8"));
let restored=0;
for(const item of mapping){
  const source=path.resolve(root,item.source),target=path.resolve(root,item.target);
  if(!source.startsWith(root)||!target.startsWith(root))throw Error("Invalid export path");
  if(existsSync(target))continue;
  const hash=createHash("sha256").update(readFileSync(source)).digest("hex");
  if(hash!==item.sha256)throw Error("Export asset checksum mismatch: "+item.source);
  mkdirSync(path.dirname(target),{recursive:true});copyFileSync(source,target);restored++;
}
if(restored)console.log("Export: restored "+restored+" shared build files.");
