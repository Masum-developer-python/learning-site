import { useState, useEffect } from "react";

export default function Attendance() {
  const [day, setDay] = useState(31);
  const [month, setMonth] = useState(3);
  const [year, setYear] = useState(2026);
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [leaveInput, setLeaveInput] = useState("");
  const [leaveDays, setLeaveDays] = useState([]); // global leave indexes
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const daysInMonth = getDaysInMonth(year, month);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("attendance");
    if (saved) {
      const parsed = JSON.parse(saved);
      setStudents(parsed.students || []);
      setData(parsed.data || {});
      updateGlobalLeaveDays(parsed.data || {});
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "attendance",
      JSON.stringify({ students, data })
    );
  }, [students, data]);

  // Helper: parse leave input
  const getLeaveDaysFromInput = () =>
    leaveInput
      .split(",")
      .map((d) => parseInt(d.trim()) - 1)
      .filter((d) => d >= 0 && d < daysInMonth);

  // Update global leaveDays from data
  const updateGlobalLeaveDays = (dataObj) => {
    const leaveSet = new Set();
    Object.values(dataObj).forEach((daysArr) => {
      daysArr.forEach((val, idx) => {
        if (val === "L") leaveSet.add(idx);
      });
    });
    setLeaveDays(Array.from(leaveSet).sort((a, b) => a - b));
  };

  // Add student (apply existing leave days automatically)
  const addStudent = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (students.includes(trimmed)) {
      alert("Student already exists");
      return;
    }

    const days = Array(daysInMonth)
      .fill("A")
      .map((_, idx) => (leaveDays.includes(idx) ? "L" : "A"));

    setStudents((prev) => [...prev, trimmed]);
    setData((prev) => ({ ...prev, [trimmed]: days }));
    setName("");
  };

  // Toggle A <-> P (L locked)
  const toggle = (student, i) => {
    setData((prev) => {
      const current = prev[student][i];
      if (current === "L") return prev; // leave locked
      const next = current === "A" ? "P" : "A";
      return {
        ...prev,
        [student]: prev[student].map((val, idx) =>
          idx === i ? next : val
        ),
      };
    });
  };

  // Remove student
  const removeStudent = (student) => {
    setStudents((prev) => prev.filter((s) => s !== student));
    setData((prev) => {
      const updated = { ...prev };
      delete updated[student];
      return updated;
    });
  };

  // Apply leave input to all students
  const applyLeaveDays = () => {
    const newLeave = getLeaveDaysFromInput();
    if (newLeave.length === 0) return;

    setLeaveDays((prev) => {
      const combined = Array.from(new Set([...prev, ...newLeave])).sort(
        (a, b) => a - b
      );

      setData((prevData) => {
        const updated = { ...prevData };
        students.forEach((student) => {
          const newDays = [...(updated[student] || Array(daysInMonth).fill("A"))];
          combined.forEach((d) => (newDays[d] = "L"));
          updated[student] = newDays;
        });
        return updated;
      });

      return combined;
    });
    setLeaveInput("");
  };

  // Import JSON
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      setData(json);
      const importedStudents = Object.keys(json);
      setStudents(importedStudents);
      updateGlobalLeaveDays(json);
    };
    reader.readAsText(file);
  };

  // Import CSV
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((r) => r.trim());
      const newStudents = [];
      const newData = {};

      for (let i = 1; i < rows.length; i++) {
        if (!rows[i]) continue;
        const cols = rows[i].split(",");
        const student = cols[0].trim();
        const days = cols.slice(1, daysInMonth + 1).map((val) => {
          const v = val.trim();
          if (v === "P") return "P";
          if (v === "L") return "L";
          return "A";
        });
        newStudents.push(student);
        newData[student] = days;
      }

      setStudents(newStudents);
      setData(newData);
      updateGlobalLeaveDays(newData);
    };
    reader.readAsText(file);
  };

  // Export JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    downloadFile(blob, "attendance.json");
  };

  // Export CSV
  const exportCSV = () => {
    let csv =
      "Name," +
      Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`).join(",") +
      "\n";
    students.forEach((student) => {
      const row = [...(data[student] || Array(daysInMonth).fill("A"))];
      csv += [student, ...row].join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    downloadFile(blob, "attendance.csv");
  };

  // Download helper
  const downloadFile = (blob, filename) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="p-5 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Attendance Sheet</h2>
      <input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month (1-12)"
          className="border p-2"
        />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year (e.g. 2026)"
          className="border p-2"
        />
      Total Days in {month}/{year}: {daysInMonth} # Leavedays in Month {leaveDays.length} # Working Days in Month {daysInMonth - leaveDays.length}
      {/* Add Student */}
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          className="border p-2"
        />
        <button
          onClick={addStudent}
          className="bg-blue-500 text-white px-3"
        >
          Add
        </button>
      </div>

      {/* Leave Days Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={leaveInput}
          onChange={(e) => setLeaveInput(e.target.value)}
          placeholder="Leave days (e.g. 1,5,10)"
          className="border p-2"
        />
        <button
          onClick={applyLeaveDays}
          className="bg-yellow-500 text-white px-3"
        >
          Apply Leave 
        </button>
        
      </div>

      {/* Attendance Table */}
      <table className="border-collapse border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th key={i} className="border p-2">
                {i + 1}
              </th>
            ))}
            <th className="border p-2">X</th>
            <th className="border p-2">%</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student}>
              <td className="border p-2">{student}</td>
              {data[student]?.map((value, i) => (
                <td
                  key={i}
                  onClick={() => toggle(student, i)}
                  className={`border p-2 text-center font-bold cursor-pointer
                    ${value === "P" && "bg-green-400 text-white"}
                    ${value === "A" && "bg-red-300"}
                    ${value === "L" && "bg-yellow-300 cursor-not-allowed"}
                  `}
                >
                  {value}
                </td>
              ))}
              <td className="border p-2 text-center">
                <button onClick={() => removeStudent(student)}>❌</button>
              </td>
              <td className="border p-2 text-center">
                {data[student]
                  ? (
                      (data[student].filter((d) => d === "P").length /
                        (daysInMonth - leaveDays.length) *
                      100
                    ).toFixed(1) + "%")
                  : "0%"}
              </td> 
            </tr>
          ))}
        </tbody>
      </table>

      {/* Actions */}
      <div className="mt-4 flex gap-3 flex-wrap">
        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={exportJSON}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export JSON
        </button>
        <input
          type="file"
          accept=".csv"
          onChange={handleImportCSV}
          className="border p-2"
        />
        <input
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          className="border p-2"
        />
      </div>
    </div>
  );
}