import { useMemo, useState } from "react";
import { scholarships } from "../data/scholarships.js";
import { checkScholarship } from "../lib/match.js";
import { useLocalStorage } from "../lib/storage.js";
import { useFolder } from "../context/FolderContext.jsx";

const PLACES = [...new Set(scholarships.map((s) => s.location))].filter((p) => p !== "Nationwide" && p !== "Not specified").sort().concat("Elsewhere in the Philippines");
const STEPS = 5;
const START = { step: 0, a: { level: "", loc: "", gwa: "", income: "" }, ofw: null };

function Group({ title, items, show, onMore }) {
  const { openDetails } = useFolder();
  return (
    <section className="mt-8">
      <h2 className="text-2xl">{title} ({items.length})</h2>
      {items.length === 0 ? <p className="mt-2 text-ink-soft">None.</p> : (
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {items.slice(0, show).map((r) => (
            <li key={r.s.id} className="rounded-2xl border border-line bg-paper p-4">
              <button className="text-left text-lg font-extrabold underline decoration-blush decoration-2 underline-offset-4" onClick={() => openDetails(r.s.id)}>{r.s.name}</button>
              <p className="text-sm text-ink-soft">{r.s.provider}</p>
              <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm">{[...r.bad, ...r.unsure, ...r.good].map((x, i) => <li key={i}>{x}</li>)}</ul>
            </li>
          ))}
        </ul>
      )}
      {items.length > show && <button className="btn mt-4" onClick={onMore}>Show more</button>}
    </section>
  );
}

export default function Matcher() {
  // Saved in localStorage, so answers and results survive switching tabs and reloads.
  const [saved, setSaved] = useLocalStorage("iskolarph_matcher", START);
  const { step, a, ofw } = saved;
  const [err, setErr] = useState("");
  const [show, setShow] = useState({ fit: 8, maybe: 8, no: 8 });
  const patch = (c) => setSaved((o) => ({ ...o, ...c }));
  const setAns = (k, v) => setSaved((o) => ({ ...o, a: { ...o.a, [k]: v } }));

  const groups = useMemo(() => {
    if (ofw === null) return null;
    const me = { level: a.level, loc: a.loc, gwa: parseFloat(a.gwa), income: a.income === "" ? null : Number(a.income), ofw };
    const r = scholarships.map((s) => checkScholarship(s, me));
    return {
      fit: r.filter((x) => !x.bad.length && !x.unsure.length),
      maybe: r.filter((x) => !x.bad.length && x.unsure.length),
      no: r.filter((x) => x.bad.length),
    };
  }, [a, ofw]);

  function next() {
    if (step === 0 && !a.level) return setErr("Choose one to continue.");
    if (step === 1 && !a.loc) return setErr("Choose where you live to continue.");
    if (step === 2) {
      const g = parseFloat(a.gwa);
      if (isNaN(g) || g < 60 || g > 100) return setErr("Enter an average between 60 and 100.");
    }
    setErr(""); patch({ step: step + 1 });
  }

  function changeEligibility() {
    setShow({ fit: 8, maybe: 8, no: 8 });
    setErr("");
    setSaved({ ...START, a: { ...START.a } });
  }

  if (groups) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl md:text-4xl">Your results</h1>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
          {[a.level === "Incoming College" ? "Incoming college" : "Current college", a.loc, "Average " + a.gwa + "%", a.income === "" ? "Income skipped" : "Income PHP " + Number(a.income).toLocaleString(), ofw ? "OFW family" : "No OFW family"].map((t) => (
            <li key={t} className="rounded-lg bg-butter px-2.5 py-1">{t}</li>
          ))}
        </ul>
        <button className="btn-ghost mt-4" onClick={changeEligibility}>Change eligibility</button>
        <Group title="Likely a fit" items={groups.fit} show={show.fit} onMore={() => setShow({ ...show, fit: show.fit + 12 })} />
        <Group title="Need more information" items={groups.maybe} show={show.maybe} onMore={() => setShow({ ...show, maybe: show.maybe + 12 })} />
        <Group title="Probably not a fit" items={groups.no} show={show.no} onMore={() => setShow({ ...show, no: show.no + 12 })} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl">Which scholarships may fit me?</h1>
      <p className="mt-4 font-bold">Question {step + 1} of {STEPS}</p>
      <progress className="mb-6 h-3 w-full accent-rose" value={step + 1} max={STEPS} aria-label="Question progress" />
      <div className="panel">
        {step === 0 && (
          <fieldset><legend className="mb-3 text-xl font-extrabold">What level are you?</legend>
            <div className="flex flex-wrap gap-2">
              {[["Incoming College", "Incoming college"], ["Current College", "Current college"]].map(([v, l]) => (
                <button key={v} aria-pressed={a.level === v} onClick={() => setAns("level", v)} className={`min-h-11 rounded-full border-2 px-5 font-bold ${a.level === v ? "border-ink bg-ink text-paper" : "border-blush bg-paper"}`}>{l}</button>
              ))}
            </div></fieldset>
        )}
        {step === 1 && (<><label htmlFor="m-loc" className="mb-2 block text-xl font-extrabold">Where do you live?</label>
          <select id="m-loc" className="field" value={a.loc} onChange={(e) => setAns("loc", e.target.value)}><option value="">Choose a place</option>{PLACES.map((p) => <option key={p}>{p}</option>)}</select></>)}
        {step === 2 && (<><label htmlFor="m-gwa" className="mb-2 block text-xl font-extrabold">What's your general average?</label>
          <input id="m-gwa" type="number" inputMode="numeric" min="60" max="100" step="1" className="field" value={a.gwa} onChange={(e) => setAns("gwa", e.target.value)} /></>)}
        {step === 3 && (<><label htmlFor="m-inc" className="mb-2 block text-xl font-extrabold">Family income per year (optional)</label>
          <input id="m-inc" type="number" min="0" step="1000" className="field" value={a.income} onChange={(e) => setAns("income", e.target.value)} /></>)}
        {step === 4 && (
          <fieldset><legend className="mb-3 text-xl font-extrabold">Do you have an OFW parent or sibling?</legend>
            <div className="flex gap-2"><button className="btn" onClick={() => patch({ ofw: true })}>Yes</button><button className="btn-ghost" onClick={() => patch({ ofw: false })}>No</button></div></fieldset>
        )}
        <p role="alert" className="mt-3 min-h-6 font-bold text-rose">{err}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {step > 0 && <button className="btn-ghost" onClick={() => { setErr(""); patch({ step: step - 1 }); }}>Back</button>}
          {step < 4 && <button className="btn" onClick={next}>Next</button>}
          {step === 3 && <button className="btn-ghost" onClick={() => { setAns("income", ""); setErr(""); patch({ step: 4 }); }}>Skip this question</button>}
        </div>
      </div>
    </div>
  );
}
