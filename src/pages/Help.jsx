import { Link } from "react-router-dom";

// Renders a help section with a title and body content.
const Block = ({ title, children }) => (<section className="panel"><h2 className="mb-2 text-xl">{title}</h2>{children}</section>);

// Explains how to use the app and what to watch for.
export default function Help() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-3xl md:text-4xl">Help</h1>
      <Block title="How to use IskolarPH">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Search or filter the <Link className="font-bold text-rose underline" to="/scholarships">scholarship directory</Link> and open one to read its details.</li>
          <li>Answer the <Link className="font-bold text-rose underline" to="/matcher">matcher</Link> questions to see likely fits.</li>
          <li>Save what interests you, then track documents and deadlines in <Link className="font-bold text-rose underline" to="/folder">My folder</Link>.</li>
          <li>Use <Link className="font-bold text-rose underline" to="/programs">Programs</Link> and <Link className="font-bold text-rose underline" to="/exam">Exam prep</Link> to plan your degree and review.</li>
        </ol>
      </Block>
      <Block title="Where the information comes from">
        <p>Records come from public announcements, official pages and a shared scholarship list updated October 12, 2026. Deadlines that were not confirmed show as "Needs verification". We never invent a date.</p>
      </Block>
      <Block title="What to keep in mind">
        <ul className="list-disc space-y-1 pl-5">
          <li>The matcher compares your answers with recorded rules. It cannot promise you will qualify.</li>
          <li>Deadlines and requirements change. Confirm on the official page before you apply.</li>
          <li>Your folder and progress are saved in this browser only. They do not sync across devices.</li>
          <li>The programs list is a selection, and the exam links come from a shared list that has not been checked.</li>
        </ul>
      </Block>
      <Block title="Found something outdated?">
        <p>Open a scholarship and choose "Report outdated info". In this version, reports are not sent anywhere.</p>
      </Block>
    </div>
  );
}
