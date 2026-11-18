import { useState } from "react";
import { RES, RES_LABEL, examSubjects } from "../data/exam.js";
import { useLocalStorage } from "../lib/storage.js";

const LEVELS = ["Not started", "Reviewing", "Done"];
const LEGACY = { "Not Started": "Not started", Completed: "Done" };
const TONE = { "Not started": "bg-stone", Reviewing: "bg-butter", Done: "bg-sage" };

// Renders one practice question with selectable answers.
function Sample({ q }) {
  const [pick, setPick] = useState(null);
  return (
    <div className="mt-3 rounded-2xl bg-butter p-4">
      <p className="font-bold">Sample question: {q.text}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {q.choices.map((c, i) => <button key={i} className="btn-ghost" aria-pressed={pick === i} onClick={() => setPick(i)}>{c}</button>)}
      </div>
      <p role="status" className="mt-2 font-bold">{pick === null ? "" : pick === q.answer ? "Correct." : "Not quite. The answer is: " + q.choices[q.answer]}</p>
    </div>
  );
}

// Shows exam topics, review links, and progress tracking.
export default function ExamPrep() {
  const [progress, setProgress] = useLocalStorage("iskolarph_exam", {});
  const [sid, setSid] = useState(examSubjects[0].id);
  // Resolves the saved progress label for a specific topic.
const status = (id) => LEGACY[progress[id]] || progress[id] || "Not started";
  const all = examSubjects.flatMap((s) => s.topics);
  const done = all.filter((t) => status(t.id) === "Done").length;
  const subject = examSubjects.find((s) => s.id === sid);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl">Exam Prep</h1>
      <p className="mt-2 max-w-prose rounded-2xl bg-butter p-4">General practice only. Check your school's exam announcement for what it covers.</p>
      <div className="mt-4 max-w-md">
        <p className="mb-1 font-bold">{done} of {all.length} topics done</p>
        <progress className="h-3 w-full accent-rose" value={done} max={all.length} aria-label="Overall topic progress" />
      </div>
      <div role="tablist" aria-label="Exam subjects" className="mt-6 flex flex-wrap gap-2">
        {examSubjects.map((s) => (
          <button key={s.id} role="tab" aria-selected={s.id === sid} onClick={() => setSid(s.id)}
            className={`min-h-11 rounded-full border-2 px-4 font-bold ${s.id === sid ? "border-ink bg-ink text-paper" : "border-blush bg-paper hover:bg-cream"}`}>{s.name}</button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-3">
          {subject.topics.map((t) => (
            <details key={t.id} className="rounded-2xl border border-line bg-paper px-5 py-3">
              <summary className="cursor-pointer text-lg font-extrabold">{t.title} <span className={`ml-2 rounded-lg px-2 text-sm font-bold ${TONE[status(t.id)]}`}>{status(t.id)}</span></summary>
              <p className="mt-2">{t.notes}</p>
              {t.formulas?.length > 0 && <ul className="mt-2 space-y-1">{t.formulas.map((f) => <li key={f}><code className="rounded-md bg-peach px-1.5">{f}</code></li>)}</ul>}
              {t.q && <Sample q={t.q} />}
              <label className="label mt-4" htmlFor={"p-" + t.id}>My progress</label>
              <select id={"p-" + t.id} className="field max-w-xs" value={status(t.id)} onChange={(e) => setProgress((p) => ({ ...p, [t.id]: e.target.value }))}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </details>
          ))}
        </div>
        <aside className="panel h-fit">
          <h2 className="mb-2 text-xl">Practice and review links</h2>
          <ul className="space-y-2">
            {subject.res.map((r, i) => (
              <li key={i}><a className="font-bold text-rose underline" href={RES[r[0]](r[1])} target="_blank" rel="noopener noreferrer">{RES_LABEL[r[0]]} {i + 1}</a></li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-soft">Unverified links from a shared list.</p>
        </aside>
      </div>
    </div>
  );
}
