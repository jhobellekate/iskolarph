import { useState } from "react";
import { useFolder } from "../context/FolderContext.jsx";
import { buildSummary } from "../lib/summary.js";

export default function ShareButton() {
  const { saved, entryOf } = useFolder();
  const [msg, setMsg] = useState("");
  async function copy() {
    if (!saved.length) { setMsg("Save a scholarship first, then copy your shortlist."); return; }
    try {
      await navigator.clipboard.writeText(buildSummary(saved, entryOf));
      setMsg("Shortlist copied. Paste it into your family chat.");
    } catch {
      setMsg("Could not copy automatically. Open your folder and copy the details by hand.");
    }
  }
  return (
    <div>
      <button className="btn" onClick={copy}>Copy shortlist summary</button>
      <p role="status" className="mt-2 text-sm">{msg}</p>
    </div>
  );
}
