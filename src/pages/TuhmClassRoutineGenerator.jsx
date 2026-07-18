import { useState, useCallback } from "react";

// Days of the week (6-day week by default, Sat-Thu)
const ALL_DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

// Default days a subject runs based on its frequency number, used ONLY
// the first time a subject is picked for an entry. After that, the days
// are stored per-entry so different entries in the same slot can cover
// different parts of the week.
const getDefaultDaysForFrequency = (freq, daysCount) => {
  const count = Math.min(freq, daysCount);
  return Array.from({ length: count }, (_, i) => i);
};

// Parse "Bengali-3" → { name: "Bengali", freq: 3 }
const parseSubject = (subjectStr) => {
  const match = subjectStr.match(/^(.+)-(\d+)$/);
  if (match) return { name: match[1].trim(), freq: parseInt(match[2]) };
  return { name: subjectStr, freq: null };
};

const blankEntry = () => ({ subject: "", mainTeacher: "", assistant: "", days: [] });

export default function ClassRoutineGenerator() {
  const [teachers, setTeachers] = useState([
    "S Parvin", "Lina", "Fatima", "Mahmuda", "Sharin",
    "J.Naime", "Rahmatullah", "Silve", "Rehena", "Nure Alam",
    "Julkar Naime", "Muslima", "Ruhul Amin", "M A Salam",
    "Humayun Kabir", "Kamal Uddin", "Muzzammil", "Rezaul Karim",
    "Walullah", "Masud Rana", "Monjurul Haque", "Naimul Islam",
    "Alamin Sheikh", "Abdus Shakur Badsha", "Alamgir Hossain",
    "Rezaul Karim", "GM Rustom",
  ]);
  const [newTeacher, setNewTeacher] = useState("");

  // Subjects stored as "SubjectName-frequency", e.g. "Bengali-3", "Science-5"
  const [subjects, setSubjects] = useState([
    "Bengali-3", "English-3", "Math-3", "Arabic-3", "Islamiat-3",
    "Science-3", "Science-5", "Art-2", "Bengali-6", "English-6",
    "Arabic-6", "Math-6", "Quran-3", "Culture-1",
    "Math-2", "Science-2", "English-2",
  ]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectFreq, setNewSubjectFreq] = useState(3);

  const [classes, setClasses] = useState([
    "Play", "Nursery", "One", "Two Shams", "Two Qamar", "Two Nazm",
    "Three Shams", "Three Qamar", "Three Nazm", "Four Shams",
    "Four Qamar", "Four Nazm", "Five Shams", "Five Qamar",
    "Six Shams", "Six Qamar", "Seven", "Eight" 
  ]);
  const [newClass, setNewClass] = useState("");

  const [daysCount, setDaysCount] = useState(6);
  const [periodsCount, setPeriodsCount] = useState(4);

  const [periodTimes, setPeriodTimes] = useState([
    { start: "10:25", end: "11:00" },
    { start: "11:01", end: "11:50" },
    { start: "11:51", end: "12:25" },
    { start: "12:26", end: "13:00" },
    { start: "13:01", end: "13:30" },
  ]);

  // routine[className][period] = ARRAY of entries:
  //   { subject: "Math-2", mainTeacher: "Lina", assistant: "Fatima", days: [0,1] }
  // A single period slot can hold several entries so that, e.g., a
  // 6-day week is split as Math-2 (Sat/Sun) + Science-2 (Mon/Tue) +
  // English-2 (Wed/Thu), each with its own main teacher & assistant.
  const [routine, setRoutine] = useState({});

  const [activeTab, setActiveTab] = useState("input");
  const [selectedClass, setSelectedClass] = useState(null);

  // ── Helpers: entries for a class+period ────────────────────────────────

  const getEntries = (cls, period) => routine[cls]?.[period] || [];

  // Teachers busy at this period on any of `days`, across all classes,
  // excluding the entry currently being edited (by className+period+index).
  const getBusyTeachersForDays = useCallback(
    (period, days, excludeClass, excludeIdx) => {
      const busy = new Set();
      classes.forEach((cls) => {
        getEntries(cls, period).forEach((entry, idx) => {
          if (cls === excludeClass && idx === excludeIdx) return;
          const entryDays = entry.days || [];
          // If either side hasn't picked days yet, be conservative and
          // treat it as a possible conflict.
          const overlaps =
            days.length === 0 ||
            entryDays.length === 0 ||
            entryDays.some((d) => days.includes(d));
          if (!overlaps) return;
          if (entry.mainTeacher) busy.add(entry.mainTeacher);
          if (entry.assistant) busy.add(entry.assistant);
        });
      });
      return busy;
    },
    [routine, classes]
  );

  // ── Entry mutation ──────────────────────────────────────────────────────

  const addEntry = (cls, period) => {
    setRoutine((prev) => {
      const periodEntries = prev[cls]?.[period] || [];
      return {
        ...prev,
        [cls]: {
          ...prev[cls],
          [period]: [...periodEntries, blankEntry()],
        },
      };
    });
  };

  const removeEntry = (cls, period, idx) => {
    setRoutine((prev) => {
      const periodEntries = prev[cls]?.[period] || [];
      return {
        ...prev,
        [cls]: {
          ...prev[cls],
          [period]: periodEntries.filter((_, i) => i !== idx),
        },
      };
    });
  };

  const updateEntry = (cls, period, idx, field, value) => {
    setRoutine((prev) => {
      const periodEntries = prev[cls]?.[period] || [];
      const nextEntries = periodEntries.map((entry, i) => {
        if (i !== idx) return entry;
        const nextEntry = { ...entry, [field]: value };
        if (field === "subject") {
          const { freq } = parseSubject(value);
          nextEntry.days = freq ? getDefaultDaysForFrequency(freq, daysCount) : [];
        }
        return nextEntry;
      });
      return {
        ...prev,
        [cls]: { ...prev[cls], [period]: nextEntries },
      };
    });
  };

  const toggleEntryDay = (cls, period, idx, dayIdx) => {
    setRoutine((prev) => {
      const periodEntries = prev[cls]?.[period] || [];
      const nextEntries = periodEntries.map((entry, i) => {
        if (i !== idx) return entry;
        const currentDays = entry.days || [];
        const nextDays = currentDays.includes(dayIdx)
          ? currentDays.filter((d) => d !== dayIdx)
          : [...currentDays, dayIdx].sort((a, b) => a - b);
        return { ...entry, days: nextDays };
      });
      return {
        ...prev,
        [cls]: { ...prev[cls], [period]: nextEntries },
      };
    });
  };

  // Coverage summary for a class+period: which days are covered, and
  // which days are double-booked by more than one entry.
  const getPeriodCoverage = (cls, period) => {
    const entries = getEntries(cls, period);
    const counts = Array(daysCount).fill(0);
    entries.forEach((entry) => {
      (entry.days || []).forEach((d) => {
        if (d < daysCount) counts[d] += 1;
      });
    });
    const covered = counts.map((c) => c > 0);
    const overlapping = counts.map((c) => c > 1);
    const coveredCount = covered.filter(Boolean).length;
    return { counts, covered, overlapping, coveredCount };
  };

  // ── Manage Teachers ──────────────────────────────────────────────────────

  const addTeacher = () => {
    const t = newTeacher.trim();
    if (t && !teachers.includes(t)) {
      setTeachers([...teachers, t]);
      setNewTeacher("");
    }
  };

  const removeTeacher = (t) => {
    setTeachers(teachers.filter((x) => x !== t));
    setRoutine((prev) => {
      const next = {};
      Object.keys(prev).forEach((cls) => {
        next[cls] = {};
        Object.keys(prev[cls] || {}).forEach((period) => {
          next[cls][period] = (prev[cls][period] || []).map((entry) => ({
            ...entry,
            mainTeacher: entry.mainTeacher === t ? "" : entry.mainTeacher,
            assistant: entry.assistant === t ? "" : entry.assistant,
          }));
        });
      });
      return next;
    });
  };

  // ── Manage Subjects ──────────────────────────────────────────────────────

  const addSubject = () => {
    const name = newSubjectName.trim();
    if (!name) return;
    const key = `${name}-${newSubjectFreq}`;
    if (!subjects.includes(key)) {
      setSubjects([...subjects, key]);
      setNewSubjectName("");
    }
  };

  const removeSubject = (s) => setSubjects(subjects.filter((x) => x !== s));

  // ── Manage Classes ───────────────────────────────────────────────────────

  const addClass = () => {
    const c = newClass.trim();
    if (c && !classes.includes(c)) {
      setClasses([...classes, c]);
      setNewClass("");
    }
  };

  const removeClass = (c) => {
    setClasses(classes.filter((x) => x !== c));
    setRoutine((prev) => {
      const next = { ...prev };
      delete next[c];
      return next;
    });
  };

  const getPeriodLabel = (periodIdx) => {
    const t = periodTimes[periodIdx];
    if (!t) return `Period ${periodIdx + 1}`;
    return `${t.start}–${t.end}`;
  };

  const clearRoutine = () => {
    if (window.confirm("Clear all routine data?")) setRoutine({});
  };

  // ════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 font-sans">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Class Routine Generator</h1>
        <p className="text-gray-500 text-sm mt-1">
          Split a period across several subjects to fill the week • each subject gets its own days, main teacher & assistant
        </p>
      </div>

      {/* ── Management Panels ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ManagementPanel
          title="👨‍🏫 Teachers"
          color="blue"
          items={teachers}
          onRemove={removeTeacher}
          inputValue={newTeacher}
          onInputChange={setNewTeacher}
          onAdd={addTeacher}
          placeholder="Teacher name"
        />

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">📖 Subjects</h2>
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Subject name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSubject()}
            />
            <select
              className="px-2 py-1.5 border rounded-lg text-sm focus:outline-none"
              value={newSubjectFreq}
              onChange={(e) => setNewSubjectFreq(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>{n} day{n > 1 ? "s" : ""}</option>
              ))}
            </select>
            <button
              onClick={addSubject}
              className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
            >
              ➕
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            The number is just a default day-count — pick exact days per subject inside each period in the Input tab, and add several subjects to one period to fill the week.
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
            {subjects.map((s, i) => {
              const { name, freq } = parseSubject(s);
              return (
                <Chip key={i} label={name} badge={freq ? `${freq}d` : ""} color="green" onRemove={() => removeSubject(s)} />
              );
            })}
          </div>
        </div>

        <ManagementPanel
          title="🏫 Classes"
          color="purple"
          items={classes}
          onRemove={removeClass}
          inputValue={newClass}
          onInputChange={setNewClass}
          onAdd={addClass}
          placeholder="Class name"
        />
      </div>

      {/* ── Period Times ── */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">⏰ Period Times</h2>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: periodsCount }, (_, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border">
              <span className="text-xs font-semibold text-purple-600 w-16">Period {i + 1}</span>
              <input
                type="time"
                value={periodTimes[i]?.start || ""}
                onChange={(e) => {
                  const next = [...periodTimes];
                  next[i] = { ...(next[i] || {}), start: e.target.value };
                  setPeriodTimes(next);
                }}
                className="border rounded px-1 py-0.5 text-xs"
              />
              <span className="text-gray-400 text-xs">–</span>
              <input
                type="time"
                value={periodTimes[i]?.end || ""}
                onChange={(e) => {
                  const next = [...periodTimes];
                  next[i] = { ...(next[i] || {}), end: e.target.value };
                  setPeriodTimes(next);
                }}
                className="border rounded px-1 py-0.5 text-xs"
              />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Periods:</label>
            <select
              value={periodsCount}
              onChange={(e) => setPeriodsCount(Number(e.target.value))}
              className="border rounded px-2 py-1 text-xs"
            >
              {[2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <label className="text-xs text-gray-500 ml-2">Days:</label>
            <select
              value={daysCount}
              onChange={(e) => setDaysCount(Number(e.target.value))}
              className="border rounded px-2 py-1 text-xs"
            >
              {[5, 6, 7].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "input", label: "✏️ Input Routine" },
          { id: "class", label: "📋 Class View" },
          { id: "teacher", label: "👨‍🏫 Teacher View" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-purple-600 text-white shadow"
                : "bg-white text-gray-600 hover:bg-purple-50 border"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={clearRoutine}
          className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
        >
          🗑 Clear All
        </button>
      </div>

      {activeTab === "input" && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls === selectedClass ? null : cls)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  selectedClass === cls
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {selectedClass ? (
            <InputRoutineTable
              className={selectedClass}
              subjects={subjects}
              teachers={teachers}
              daysCount={daysCount}
              periodsCount={periodsCount}
              allDays={ALL_DAYS}
              getPeriodLabel={getPeriodLabel}
              getEntries={getEntries}
              getBusyTeachersForDays={getBusyTeachersForDays}
              getPeriodCoverage={getPeriodCoverage}
              addEntry={addEntry}
              removeEntry={removeEntry}
              updateEntry={updateEntry}
              toggleEntryDay={toggleEntryDay}
            />
          ) : (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
              ← Select a class above to start filling the routine
            </div>
          )}
        </div>
      )}

      {activeTab === "class" && (
        <ClassViewTable
          classes={classes}
          periodsCount={periodsCount}
          allDays={ALL_DAYS}
          getPeriodLabel={getPeriodLabel}
          getEntries={getEntries}
        />
      )}

      {activeTab === "teacher" && (
        <TeacherViewTable
          teachers={teachers}
          classes={classes}
          periodsCount={periodsCount}
          allDays={ALL_DAYS}
          getEntries={getEntries}
          getPeriodLabel={getPeriodLabel}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// INPUT ROUTINE — card per period, one row per entry, "+ Add subject"
// ════════════════════════════════════════════════════════════════════════

function InputRoutineTable({
  className,
  subjects,
  teachers,
  daysCount,
  periodsCount,
  allDays,
  getPeriodLabel,
  getEntries,
  getBusyTeachersForDays,
  getPeriodCoverage,
  addEntry,
  removeEntry,
  updateEntry,
  toggleEntryDay,
}) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl">
        <h3 className="text-lg font-bold">{className} — Input Routine</h3>
        <p className="text-xs opacity-75 mt-0.5">
          Add several subjects to one period to split the week — e.g. Math-2 (Sat/Sun) + Science-2 (Mon/Tue) + English-2 (Wed/Thu). Every subject needs its own main teacher and assistant.
        </p>
      </div>

      {Array.from({ length: periodsCount }, (_, period) => {
        const entries = getEntries(className, period);
        const { covered, overlapping, coveredCount } = getPeriodCoverage(className, period);
        const fullyCovered = coveredCount === daysCount;

        return (
          <div key={period} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 border-b">
              <div>
                <span className="font-bold text-purple-700">P{period + 1}</span>
                <span className="text-xs text-gray-400 ml-2">{getPeriodLabel(period)}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: daysCount }, (_, d) => (
                  <span
                    key={d}
                    title={overlapping[d] ? "Two subjects overlap this day" : covered[d] ? "Covered" : "Not covered"}
                    className={`w-6 h-5 flex items-center justify-center rounded text-[10px] font-semibold ${
                      overlapping[d]
                        ? "bg-red-500 text-white"
                        : covered[d]
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {allDays[d]}
                  </span>
                ))}
                <span className={`ml-2 text-xs font-semibold ${fullyCovered ? "text-green-600" : "text-amber-600"}`}>
                  {coveredCount}/{daysCount} days
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {entries.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-400">No subjects added to this period yet.</div>
              )}
              {entries.map((entry, idx) => (
                <EntryRow
                  key={idx}
                  className={className}
                  period={period}
                  idx={idx}
                  entry={entry}
                  subjects={subjects}
                  teachers={teachers}
                  daysCount={daysCount}
                  allDays={allDays}
                  getBusyTeachersForDays={getBusyTeachersForDays}
                  updateEntry={updateEntry}
                  toggleEntryDay={toggleEntryDay}
                  removeEntry={removeEntry}
                />
              ))}
            </div>

            <div className="px-4 py-2.5 bg-gray-50 border-t">
              <button
                onClick={() => addEntry(className, period)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                ➕ Add subject to this period
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EntryRow({
  className,
  period,
  idx,
  entry,
  subjects,
  teachers,
  daysCount,
  allDays,
  getBusyTeachersForDays,
  updateEntry,
  toggleEntryDay,
  removeEntry,
}) {
  const days = entry.days || [];
  const busyForThisEntry = getBusyTeachersForDays(period, days, className, idx);
  const mainBusy = entry.mainTeacher && busyForThisEntry.has(entry.mainTeacher);
  const asstBusy = entry.assistant && busyForThisEntry.has(entry.assistant);
  const missingTeacher = entry.subject && !entry.mainTeacher;
  const missingAssistant = entry.subject && !entry.assistant;

  return (
    <div className="px-4 py-3 flex flex-wrap items-start gap-2">
      {/* Subject */}
      <select
        value={entry.subject}
        onChange={(e) => updateEntry(className, period, idx, "subject", e.target.value)}
        className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white min-w-[130px]"
      >
        <option value="">— Subject —</option>
        {subjects.map((s, i) => {
          const { name, freq } = parseSubject(s);
          return <option key={i} value={s}>{name}{freq ? ` (${freq}d default)` : ""}</option>;
        })}
      </select>

      {/* Main Teacher */}
      <div>
        <select
          value={entry.mainTeacher}
          onChange={(e) => updateEntry(className, period, idx, "mainTeacher", e.target.value)}
          className={`px-2 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 min-w-[130px] ${
            mainBusy || missingTeacher ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-300 bg-white focus:ring-indigo-400"
          }`}
        >
          <option value="">— Main Teacher —</option>
          {teachers.map((t, i) => {
            const busy = busyForThisEntry.has(t) && t !== entry.mainTeacher;
            return <option key={i} value={t} disabled={busy} style={{ color: busy ? "#aaa" : "black" }}>{t}{busy ? " (busy)" : ""}</option>;
          })}
        </select>
        {mainBusy && <p className="text-red-500 text-[10px] mt-0.5">⚠️ Teacher conflict!</p>}
        {!mainBusy && missingTeacher && <p className="text-amber-500 text-[10px] mt-0.5">Main teacher required</p>}
      </div>

      {/* Assistant */}
      <div>
        <select
          value={entry.assistant}
          onChange={(e) => updateEntry(className, period, idx, "assistant", e.target.value)}
          className={`px-2 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 min-w-[130px] ${
            asstBusy || missingAssistant ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-300 bg-white focus:ring-green-400"
          }`}
        >
          <option value="">— Assistant —</option>
          {teachers.map((t, i) => {
            const busy = busyForThisEntry.has(t) && t !== entry.assistant;
            return <option key={i} value={t} disabled={busy} style={{ color: busy ? "#aaa" : "black" }}>{t}{busy ? " (busy)" : ""}</option>;
          })}
        </select>
        {asstBusy && <p className="text-red-500 text-[10px] mt-0.5">⚠️ Assistant conflict!</p>}
        {!asstBusy && missingAssistant && <p className="text-amber-500 text-[10px] mt-0.5">Assistant required</p>}
      </div>

      {/* Days */}
      <div className="flex flex-wrap gap-1 items-center flex-1 min-w-[160px]">
        {entry.subject ? (
          Array.from({ length: daysCount }, (_, d) => {
            const active = days.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleEntryDay(className, period, idx, d)}
                className={`px-1.5 py-0.5 rounded text-xs font-medium border transition-colors ${
                  active ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-400 border-gray-200 hover:border-indigo-300"
                }`}
              >
                {allDays[d]}
              </button>
            );
          })
        ) : (
          <span className="text-gray-300 text-xs">Pick a subject first</span>
        )}
      </div>

      <button
        onClick={() => removeEntry(className, period, idx)}
        className="w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 text-xs flex items-center justify-center"
        title="Remove this subject"
      >
        ✕
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// CLASS VIEW — rows = classes, columns = periods, cell stacks all entries
// ════════════════════════════════════════════════════════════════════════

function ClassViewTable({ classes, periodsCount, allDays, getPeriodLabel, getEntries }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white shadow rounded-xl text-xs">
        <thead>
          <tr>
            <th className="px-3 py-2 border border-gray-300 bg-gray-50 text-left font-bold text-gray-700">Class</th>
            {Array.from({ length: periodsCount }, (_, p) => (
              <th key={p} className="px-2 py-2 border border-gray-300 bg-indigo-50 text-center font-bold text-indigo-700 min-w-[150px]">
                <div>Period {p + 1}</div>
                <div className="text-gray-400 font-normal">{getPeriodLabel(p)}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, ci) => (
            <tr key={ci} className={ci % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-3 py-2 border border-gray-200 font-semibold text-purple-700 whitespace-nowrap">{cls}</td>
              {Array.from({ length: periodsCount }, (_, period) => {
                const entries = getEntries(cls, period);
                if (entries.length === 0) {
                  return (
                    <td key={period} className="px-1 py-1 border border-gray-200 text-center text-gray-300">—</td>
                  );
                }
                return (
                  <td key={period} className="px-1 py-1 border border-gray-200 align-top">
                    <div className="flex flex-col gap-1">
                      {entries.map((entry, idx) => {
                        const { name: subName } = parseSubject(entry.subject);
                        return (
                          <div key={idx} className="bg-blue-50 border border-blue-100 rounded p-1 text-center leading-tight">
                            {entry.subject && <div className="font-semibold text-blue-800">{subName}</div>}
                            <div className="text-gray-400 text-[10px]">
                              {(entry.days || []).map((d) => allDays[d]).join("/") || "no days set"}
                            </div>
                            {entry.mainTeacher && (
                              <div className="text-green-700 font-medium mt-0.5">
                                {entry.mainTeacher}
                                {entry.assistant && <span className="text-gray-500"> / {entry.assistant}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// TEACHER VIEW
// ════════════════════════════════════════════════════════════════════════

function TeacherViewTable({ teachers, classes, periodsCount, allDays, getEntries, getPeriodLabel }) {
  const teacherMap = {};
  teachers.forEach((t) => { teacherMap[t] = []; });

  classes.forEach((cls) => {
    Array.from({ length: periodsCount }, (_, period) => {
      getEntries(cls, period).forEach((entry) => {
        const { name: subName } = parseSubject(entry.subject);
        const days = entry.days || [];
        if (entry.mainTeacher && teacherMap[entry.mainTeacher]) {
          teacherMap[entry.mainTeacher].push({ cls, period, role: "Main", subject: subName, days });
        }
        if (entry.assistant && teacherMap[entry.assistant]) {
          teacherMap[entry.assistant].push({ cls, period, role: "Asst", subject: subName, days });
        }
      });
    });
  });

  const activeTeachers = teachers.filter((t) => teacherMap[t]?.length > 0);

  if (activeTeachers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
        No teachers assigned yet. Fill the routine first.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {activeTeachers.map((teacher) => (
        <div key={teacher} className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3">
            <h3 className="font-bold">👤 {teacher}</h3>
            <span className="text-xs opacity-80">{teacherMap[teacher].length} assignment(s)</span>
          </div>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-1.5 border border-gray-200 text-left">Class</th>
                <th className="px-2 py-1.5 border border-gray-200">Time</th>
                <th className="px-2 py-1.5 border border-gray-200">Role</th>
                <th className="px-2 py-1.5 border border-gray-200">Subject</th>
                <th className="px-2 py-1.5 border border-gray-200">Days</th>
              </tr>
            </thead>
            <tbody>
              {teacherMap[teacher]
                .sort((a, b) => a.period - b.period || a.cls.localeCompare(b.cls))
                .map((entry, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-2 py-1.5 border border-gray-200 font-medium text-purple-700">{entry.cls}</td>
                    <td className="px-2 py-1.5 border border-gray-200 text-center whitespace-nowrap">{getPeriodLabel(entry.period)}</td>
                    <td className="px-2 py-1.5 border border-gray-200 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${entry.role === "Main" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {entry.role}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 border border-gray-200 text-blue-700">{entry.subject || "—"}</td>
                    <td className="px-2 py-1.5 border border-gray-200">
                      <div className="flex flex-wrap gap-0.5">
                        {entry.days.map((d) => (
                          <span key={d} className="bg-indigo-100 text-indigo-700 px-1 rounded text-[10px]">{allDays[d]}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// Reusable ManagementPanel / Chip
// ════════════════════════════════════════════════════════════════════════

function ManagementPanel({ title, color, items, onRemove, inputValue, onInputChange, onAdd, placeholder }) {
  const colorMap = {
    blue: { btn: "bg-blue-500 hover:bg-blue-600", ring: "focus:ring-blue-400" },
    purple: { btn: "bg-purple-500 hover:bg-purple-600", ring: "focus:ring-purple-400" },
    green: { btn: "bg-green-500 hover:bg-green-600", ring: "focus:ring-green-400" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
      <div className="flex gap-2 mb-3">
        <input
          className={`flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${c.ring}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onAdd()}
        />
        <button onClick={onAdd} className={`px-3 py-1.5 ${c.btn} text-white rounded-lg text-sm`}>➕</button>
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
        {items.map((item, i) => (
          <Chip key={i} label={item} color={color} onRemove={() => onRemove(item)} />
        ))}
      </div>
    </div>
  );
}

function Chip({ label, badge, color, onRemove }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
  };
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colorMap[color] || colorMap.blue}`}>
      <span>{label}</span>
      {badge && <span className="bg-white/60 px-1 rounded-full text-[10px]">{badge}</span>}
      <button onClick={onRemove} className="ml-0.5 w-3.5 h-3.5 bg-red-400 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-500">×</button>
    </div>
  );
}