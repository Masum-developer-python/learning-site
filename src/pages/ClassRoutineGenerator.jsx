import { useState } from "react";

function ClassRoutineGenerator() {
  const [teachers, setTeachers] = useState([
    "Najib",
    "Masum",
    "Alamin",
    "Alamin2",
    "Mehedi",
    "Shafayat",
    "Almas",
  ]);
  const [newTeacher, setNewTeacher] = useState("");
  const [classes, setClasses] = useState([
    "১২শ শ্রেণী",
    "১১শ শ্রেণী",
    "১০ম শ্রেণী",
    "৯ম শ্রেণী",
    "৭ম শ্রেণী",
  ]);
  const [newClass, setNewClass] = useState("");
  // ADDED: Subject management state
  const [subjects, setSubjects] = useState([
    "Mathematics",
    "English",
    "Science",
    "History",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [daysCount, setDaysCount] = useState(6);
  const [periodsCount, setPeriodsCount] = useState(4);
  const [startTime, setStartTime] = useState("15:10");
  const [periodDuration, setPeriodDuration] = useState(30);
  const [routine, setRoutine] = useState({});
  const [subjectsClass, setSubjectsClass] = useState({});

  const days = [
    "শনিবার",
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
  ];

  const addTeacher = () => {
    if (newTeacher.trim() && !teachers.includes(newTeacher.trim())) {
      setTeachers([...teachers, newTeacher.trim()]);
      setNewTeacher("");
    }
  };

  const removeTeacher = (teacherToRemove) => {
    setTeachers(teachers.filter((teacher) => teacher !== teacherToRemove));
    const newRoutine = { ...routine };
    Object.keys(newRoutine).forEach((key) => {
      if (newRoutine[key] === teacherToRemove) {
        delete newRoutine[key];
      }
    });
    setRoutine(newRoutine);
  };

  const addClass = () => {
    if (newClass.trim() && !classes.includes(newClass.trim())) {
      setClasses([...classes, newClass.trim()]);
      setNewClass("");
    }
  };

  const removeClass = (classToRemove) => {
    setClasses(classes.filter((cls) => cls !== classToRemove));
    const newRoutine = { ...routine };
    Object.keys(newRoutine).forEach((key) => {
      if (key.includes(classToRemove)) {
        delete newRoutine[key];
      }
    });
    setRoutine(newRoutine);
  };

  // ADDED: Subject management functions
  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const removeSubject = (subjectToRemove) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToRemove));
    const newRoutine = { ...routine };
    Object.keys(newRoutine).forEach((key) => {
      if (newRoutine[key] && newRoutine[key].subject === subjectToRemove) {
        delete newRoutine[key];
      }
    });
    setRoutine(newRoutine);
  };

  // Check if a teacher is already assigned to another class in the same day-period
  const isTeacherConflicted = (day, period, teacher, currentClass) => {
    for (let cls of classes) {
      if (cls !== currentClass) {
        const key = `${cls}-${day}-${period}`;
        if (routine[key]?.teacher === teacher) {
          return true;
        }
      }
    }
    return false;
  };

  // Get available teachers for a specific slot
  const getAvailableTeachers = (day, period, currentClass) => {
    return teachers.filter(
      (teacher) => !isTeacherConflicted(day, period, teacher, currentClass)
    );
  };

  const calculateTimeSlot = (periodIndex) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes + periodIndex * periodDuration;
    const endMinutes = startMinutes + periodDuration;

    const formatTime = (totalMinutes) => {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}`;
    };

    return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
  };

  const updateRoutine = (className, day, period, teacher, subject) => {
    const key = `${className}-${day}-${period}`;
    setRoutine((prev) => ({
      ...prev,
      [key]: { teacher, subject },
    }));
    console.log("Updated Routine:", routine);
  };

  const exportToCSV = () => {
    let csv = "";

    classes.forEach((className, classIndex) => {
      if (classIndex > 0) csv += "\n\n";
      csv += `${className}\n`;
      csv += "Time";
      for (let i = 0; i < daysCount; i++) {
        csv += `,${days[i]}`;
      }
      csv += "\n";

      for (let period = 0; period < periodsCount; period++) {
        const timeSlot = calculateTimeSlot(period);
        csv += `"Period ${period + 1}. ${timeSlot}"`;

        for (let day = 0; day < daysCount; day++) {
          const key = `${className}-${day}-${period}`;
          const teacherName = routine[key] ? `"${routine[key]}"` : "";
          csv += `,${teacherName}`;
        }
        csv += "\n";
      }
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "class_routines.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const clearRoutine = () => {
    if (window.confirm("Are you sure you want to clear the routine?")) {
      setRoutine({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Class Routine Generator
          </h1>
          <p className="text-gray-600">
            Create and manage your class timetable with automatic dropdowns
          </p>
        </div>

        {/* Teacher Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            👨‍🏫 Teacher Management
          </h2>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newTeacher}
              onChange={(e) => setNewTeacher(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTeacher()}
              placeholder="Enter teacher name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTeacher}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              ➕ Add Teacher
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full"
              >
                <span>{teacher}</span>
                <button
                  onClick={() => removeTeacher(teacher)}
                  className="w-5 h-5 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📚 Subject Management
          </h2>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSubject()}
              placeholder="Enter subject name (e.g., Mathematics)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={addSubject}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
            >
              ➕ Add Subject
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full"
              >
                <span>{subject}</span>
                <button
                  onClick={() => removeSubject(subject)}
                  className="w-5 h-5 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Class Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🏫 Class Management
          </h2>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addClass()}
              placeholder="Enter class name (e.g., Grade 6A)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addClass}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
            >
              ➕ Add Class
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {classes.map((cls, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full"
              >
                <span>{cls}</span>
                <button
                  onClick={() => removeClass(cls)}
                  className="w-5 h-5 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ⚙️ Routine Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days per week
              </label>
              <select
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 Days</option>
                <option value={6}>6 Days</option>
                <option value={7}>7 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Periods per day
              </label>
              <select
                value={periodsCount}
                onChange={(e) => setPeriodsCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={2}>2 Periods</option>
                <option value={3}>3 Periods</option>
                <option value={4}>4 Periods</option>
                <option value={5}>5 Periods</option>
                <option value={6}>6 Periods</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period duration (min)
              </label>
              <input
                type="number"
                value={periodDuration}
                onChange={(e) => setPeriodDuration(Number(e.target.value))}
                min="30"
                max="90"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Routine Tables */}
        <div className="space-y-8">
          {classes.map((className, classIndex) => (
            <div
              key={classIndex}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
                <h3 className="text-xl font-bold">
                  {className} - Class Routine
                </h3>
              </div>

              {/* <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Time</th>
                      {Array.from({ length: daysCount }, (_, i) => (
                        <th key={i} className="px-4 py-3 text-center font-semibold">
                          {days[i]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: periodsCount }, (_, period) => (
                      <tr key={period} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 bg-gray-100 font-medium">
                          <div className="text-sm">
                            <div className="font-bold text-blue-600">Period {period + 1}</div>
                            <div className="text-xs text-gray-500">{calculateTimeSlot(period)}</div>
                          </div>
                        </td>
                        {Array.from({ length: daysCount }, (_, day) => {
                          const currentValue = routine[`${className}-${day}-${period}`] || '';
                          const availableTeachers = getAvailableTeachers(day, period, className);
                          const isConflicted = currentValue && !availableTeachers.includes(currentValue);
                          
                          return (
                            <td key={day} className="px-2 py-2">
                              <select
                                value={currentValue}
                                onChange={(e) => updateRoutine(className, day, period, e.target.value)}
                                className={`w-full px-2 py-2 border rounded focus:outline-none focus:ring-2 text-sm ${
                                  isConflicted 
                                    ? 'border-red-500 bg-red-50 focus:ring-red-500' 
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                title={isConflicted ? 'Conflict: Teacher assigned to another class' : ''}
                              >
                                <option value="">Select Teacher</option>
                                {teachers.map((teacher, index) => {
                                  const isAvailable = availableTeachers.includes(teacher) || teacher === currentValue;
                                  return (
                                    <option 
                                      key={index} 
                                      value={teacher}
                                      disabled={!isAvailable}
                                      style={{ color: isAvailable ? 'black' : '#ccc' }}
                                    >
                                      {teacher} {!isAvailable ? '(Busy)' : ''}
                                    </option>
                                  );
                                })}
                              </select>
                              {isConflicted && (
                                <div className="text-xs text-red-500 mt-1">⚠️ Conflict</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Day</th>
                      {Array.from({ length: periodsCount }, (_, i) => (
                        <th
                          key={i}
                          className="px-2 py-3 text-center font-semibold min-w-32"
                        >
                          <div className="text-xs">
                            <div>Period {i + 1}</div>
                            <div className="text-xs opacity-80">
                              {calculateTimeSlot(i)}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: daysCount }, (_, day) => (
                      <tr
                        key={day}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 bg-gray-100 font-medium">
                          <div className="font-bold text-purple-600">
                            {days[day]}
                          </div>
                        </td>
                        {Array.from({ length: periodsCount }, (_, period) => {
                          const currentValue =
                            routine[`${className}-${day}-${period}`]?.teacher ||
                            "";
                          console.log("Current Value:", currentValue);
                          const currentSubject =
                            routine[`${className}-${day}-${period}`]?.subject ||
                            "";
                          const availableTeachers = getAvailableTeachers(
                            day,
                            period,
                            className
                          );
                          const isConflicted =
                            currentValue &&
                            !availableTeachers.includes(currentValue);

                          return (
                            <td key={period} className="px-1 py-2">
                              <select
                                value={currentValue}
                                onChange={(e) =>
                                  updateRoutine(
                                    className,
                                    day,
                                    period,
                                    e.target.value
                                  )
                                }
                                className={`w-full px-1 py-2 border rounded focus:outline-none focus:ring-2 text-xs ${
                                  isConflicted
                                    ? "border-red-500 bg-red-50 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                                title={
                                  isConflicted
                                    ? "Conflict: Teacher assigned to another class"
                                    : ""
                                }
                              >
                                <option value="">Select</option>
                                {teachers.map((teacher, index) => {
                                  const isAvailable =
                                    availableTeachers.includes(teacher) ||
                                    teacher === currentValue;
                                  return (
                                    <option
                                      key={index}
                                      value={teacher}
                                      disabled={!isAvailable}
                                      style={{
                                        color: isAvailable ? "black" : "#ccc",
                                      }}
                                    >
                                      {teacher} {!isAvailable ? "(Busy)" : ""}
                                    </option>
                                  );
                                })}
                              </select>
                              <select
                                value={currentSubject}
                                onChange={(e) =>
                                  updateRoutine(
                                    className,
                                    day,
                                    period,
                                    currentValue,
                                    e.target.value
                                  )
                                }
                                className="w-full px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-xs bg-green-50"
                              >
                                <option value="">Subject</option>
                                {subjects.map((subject, index) => (
                                  <option key={index} value={subject}>
                                    {subject}
                                  </option>
                                ))}
                              </select>
                              {isConflicted && (
                                <div className="text-xs text-red-500 mt-1 text-center">
                                  ⚠️
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={exportToCSV}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
          >
            📥 Export All Classes to CSV
          </button>
          <button
            onClick={clearRoutine}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
          >
            🗑️ Clear All Routines
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassRoutineGenerator;
