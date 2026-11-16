// Rule-based preliminary matching. Missing data gives "uncertain", never a guess.
export function checkScholarship(s, me) {
  const bad = [], good = [], unsure = [];
  if (s.levels.includes(me.level)) good.push("Open to " + me.level.toLowerCase() + " students");
  else bad.push("Not open to " + me.level.toLowerCase() + " students");
  if (s.location === "Not specified") unsure.push("Location was not recorded");
  else if (s.location === "Nationwide" || s.location === me.loc) good.push("Location fits");
  else bad.push("For residents of " + s.location);
  if (s.ofwOnly) { if (me.ofw) good.push("OFW requirement met"); else bad.push("Requires an OFW or OFW family member"); }
  if (s.minGWA === null) unsure.push("No minimum average recorded");
  else if (me.gwa >= s.minGWA) good.push("Average meets " + s.minGWA + "%");
  else bad.push("Needs an average of at least " + s.minGWA + "%");
  if (s.maxIncome !== null) {
    if (me.income === null) unsure.push("Has an income limit, but you skipped income");
    else if (me.income <= s.maxIncome) good.push("Income is within the limit");
    else bad.push("Income is above PHP " + s.maxIncome.toLocaleString());
  }
  return { s, bad, good, unsure };
}
