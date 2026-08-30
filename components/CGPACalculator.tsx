'use client';

import { useState } from 'react';

interface Course {
  id: number;
  name: string;
  units: string;
  grade: string;
}

interface Semester {
  id: number;
  name: string;
  courses: Course[];
}

export default function CGPACalculator() {
  const [scale, setScale] = useState(5);
  const [previousCgpa, setPreviousCgpa] = useState('');
  const [previousUnits, setPreviousUnits] = useState('');
  
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 1,
      name: 'Semester 1',
      courses: [{ id: Date.now(), name: '', units: '', grade: 'A' }],
    },
  ]);

  const gradePointsMap: Record<number, Record<string, number>> = {
    4: { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 },
    5: { A: 5.0, B: 4.0, C: 3.0, D: 2.0, E: 1.0, F: 0.0 },
  };

  const currentGrades = Object.keys(gradePointsMap[scale]);

  // ===== SEMESTER MANAGEMENT =====
  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: Date.now() + 1, name: '', units: '', grade: 'A' }],
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (semId: number) => {
    if (semesters.length === 1) return;
    setSemesters(semesters.filter((s) => s.id !== semId));
  };

  const updateSemesterName = (semId: number, name: string) => {
    setSemesters(
      semesters.map((s) => (s.id === semId ? { ...s, name } : s))
    );
  };

  // ===== COURSE MANAGEMENT =====
  const addCourse = (semId: number) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id !== semId) return s;
        return {
          ...s,
          courses: [...s.courses, { id: Date.now(), name: '', units: '', grade: 'A' }],
        };
      })
    );
  };

  const removeCourse = (semId: number, courseId: number) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id !== semId) return s;
        if (s.courses.length === 1) return s;
        return {
          ...s,
          courses: s.courses.filter((c) => c.id !== courseId),
        };
      })
    );
  };

  const updateCourse = (semId: number, courseId: number, field: keyof Course, value: string) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id !== semId) return s;
        return {
          ...s,
          courses: s.courses.map((c) => (c.id === courseId ? { ...c, [field]: value } : c)),
        };
      })
    );
  };

  // ===== CALCULATIONS =====
  let totalCurrentPoints = 0;
  let totalCurrentUnits = 0;

  const semesterSummaries = semesters.map((s) => {
    let semPoints = 0;
    let semUnits = 0;

    s.courses.forEach((c) => {
      const u = parseFloat(c.units);
      if (!isNaN(u) && u > 0) {
        semPoints += u * (gradePointsMap[scale][c.grade] || 0);
        semUnits += u;
      }
    });

    totalCurrentPoints += semPoints;
    totalCurrentUnits += semUnits;

    return {
      id: s.id,
      gpa: semUnits > 0 ? (semPoints / semUnits).toFixed(2) : '0.00',
      units: semUnits,
    };
  });

  // Calculate Cumulative Summary
  let cumulativeGpa = '0.00';
  let overallTotalUnits = totalCurrentUnits;

  const prevU = parseFloat(previousUnits);
  const prevG = parseFloat(previousCgpa);

  if (!isNaN(prevU) && prevU > 0 && !isNaN(prevG) && prevG >= 0) {
    const prevPoints = prevU * Math.min(prevG, scale);
    overallTotalUnits += prevU;
    cumulativeGpa = ((totalCurrentPoints + prevPoints) / overallTotalUnits).toFixed(2);
  } else {
    cumulativeGpa = totalCurrentUnits > 0 ? (totalCurrentPoints / totalCurrentUnits).toFixed(2) : '0.00';
  }

  // Get grade letter for CGPA
  const getGradeLetter = (cgpa: number, scaleVal: number): string => {
    if (scaleVal === 5) {
      if (cgpa >= 4.5) return 'A';
      if (cgpa >= 3.5) return 'B';
      if (cgpa >= 2.5) return 'C';
      if (cgpa >= 1.5) return 'D';
      return 'F';
    } else {
      if (cgpa >= 3.5) return 'A';
      if (cgpa >= 2.5) return 'B';
      if (cgpa >= 1.5) return 'C';
      if (cgpa >= 1.0) return 'D';
      return 'F';
    }
  };

  const gradeLetter = getGradeLetter(parseFloat(cumulativeGpa), scale);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white text-lg">🎓</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">CGPA Calculator</h3>
          <p className="text-gray-400 text-xs">Multi-semester cumulative grade point average</p>
        </div>
      </div>

      {/* Global Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Grading Scale</label>
          <div className="flex gap-2">
            {[4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setScale(val)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                  scale === val ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'
                }`}
              >
                {val}.0
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Prior CGPA</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max={scale}
            placeholder={`e.g. ${(scale - 0.5).toFixed(2)}`}
            value={previousCgpa}
            onChange={(e) => setPreviousCgpa(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Prior Units</label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 45"
            value={previousUnits}
            onChange={(e) => setPreviousUnits(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Semester Panels */}
      <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2">
        {semesters.map((sem, sIdx) => {
          const summary = semesterSummaries.find((sum) => sum.id === sem.id);
          return (
            <div key={sem.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                <input
                  type="text"
                  value={sem.name}
                  onChange={(e) => updateSemesterName(sem.id, e.target.value)}
                  className="font-bold text-gray-800 text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-500">
                    Units: <strong className="text-gray-800">{summary?.units || 0}</strong>
                  </span>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    GPA: {summary?.gpa || '0.00'}
                  </span>
                  {semesters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSemester(sem.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2">
                {sem.courses.map((course, cIdx) => (
                  <div key={course.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                    <span className="text-xs font-bold text-gray-400 w-6">#{cIdx + 1}</span>
                    <input
                      type="text"
                      placeholder="Course Code / Title"
                      value={course.name}
                      onChange={(e) => updateCourse(sem.id, course.id, 'name', e.target.value)}
                      className="flex-1 min-w-[150px] p-2 border rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Units"
                      min="1"
                      value={course.units}
                      onChange={(e) => updateCourse(sem.id, course.id, 'units', e.target.value)}
                      className="w-20 p-2 border rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(sem.id, course.id, 'grade', e.target.value)}
                      className="w-20 p-2 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    >
                      {currentGrades.map((g) => (
                        <option key={g} value={g}>
                          {g} ({gradePointsMap[scale][g].toFixed(1)})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeCourse(sem.id, course.id)}
                      disabled={sem.courses.length === 1}
                      className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addCourse(sem.id)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  + Add Course
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          type="button"
          onClick={addSemester}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          + Add Semester
        </button>
      </div>

      {/* Results Panel */}
      <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Cumulative Summary</h3>
            <p className="text-indigo-200 text-xs mt-1">
              {scale}.0 scale • {overallTotalUnits} total units • {semesters.length} semester(s)
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-4xl font-extrabold text-white">
              {cumulativeGpa}
              <span className="text-xl font-normal text-indigo-300 ml-2">/ {scale}.0</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                gradeLetter === 'A' ? 'bg-green-500/30 text-green-300' :
                gradeLetter === 'B' ? 'bg-blue-500/30 text-blue-300' :
                gradeLetter === 'C' ? 'bg-yellow-500/30 text-yellow-300' :
                gradeLetter === 'D' ? 'bg-orange-500/30 text-orange-300' :
                'bg-red-500/30 text-red-300'
              }`}>
                {gradeLetter}
              </span>
              <span className="text-indigo-300 text-sm">
                {totalCurrentPoints.toFixed(2)} points earned
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}