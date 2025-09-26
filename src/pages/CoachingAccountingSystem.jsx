import { useState, useEffect } from "react";

export default function CoachingAccountingSystem() {
  // State management
  const [activeTab, setActiveTab] = useState("partners");
  const [partners, setPartners] = useState([
    { name: "অংশীদার ১", investment: 50000, share: 40 },
    { name: "অংশীদার ২", investment: 30000, share: 30 },
    { name: "অংশীদার ৩", investment: 30000, share: 30 },
  ]);
  const [students, setStudents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [retentionRate, setRetentionRate] = useState(10);

  // Form states
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    investment: "",
    share: "",
  });
  const [studentForm, setStudentForm] = useState({
    name: "",
    className: "",
    fee: "",
    paid: "",
  });
  const [expenseForm, setExpenseForm] = useState({
    item: "",
    amount: "",
    type: "shared",
    paidBy: "",
  });
  const [incomeForm, setIncomeForm] = useState({
    source: "",
    amount: "",
    type: "shared",
    receivedBy: "",
  });

  // Calculation states
  const [calculations, setCalculations] = useState({
    totalSharedIncome: 0,
    totalSharedExpenses: 0,
    totalDue: 0,
    sharedProfit: 0,
    distributableProfit: 0,
  });

  // Partner functions
  const addPartner = () => {
    if (!partnerForm.name) return;

    const newPartner = {
      name: partnerForm.name,
      investment: parseFloat(partnerForm.investment) || 0,
      share: parseFloat(partnerForm.share) || 0,
    };

    setPartners([...partners, newPartner]);
    setPartnerForm({ name: "", investment: "", share: "" });
  };

  const removePartner = (index) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  // Student functions
  const addStudent = () => {
    if (!studentForm.name || !studentForm.className) return;

    const fee = parseFloat(studentForm.fee) || 0;
    const paid = parseFloat(studentForm.paid) || 0;
    const due = fee - paid;

    const newStudent = {
      name: studentForm.name,
      className: studentForm.className,
      fee,
      paid,
      due,
    };

    setStudents([...students, newStudent]);
    setStudentForm({ name: "", className: "", fee: "", paid: "" });
  };

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  // Expense functions
  const addExpense = () => {
    if (!expenseForm.item || !expenseForm.paidBy) return;

    const newExpense = {
      item: expenseForm.item,
      amount: parseFloat(expenseForm.amount) || 0,
      type: expenseForm.type,
      paidBy: expenseForm.paidBy,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseForm({ item: "", amount: "", type: "shared", paidBy: "" });
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // Income functions
  const addIncome = () => {
    if (!incomeForm.source || !incomeForm.receivedBy) return;

    const newIncome = {
      source: incomeForm.source,
      amount: parseFloat(incomeForm.amount) || 0,
      type: incomeForm.type,
      receivedBy: incomeForm.receivedBy,
    };

    setIncome([...income, newIncome]);
    setIncomeForm({ source: "", amount: "", type: "shared", receivedBy: "" });
  };

  const removeIncome = (index) => {
    setIncome(income.filter((_, i) => i !== index));
  };

  // Calculation functions
  const calculateAll = () => {
    // Calculate student income
    const studentIncome = students.reduce(
      (sum, student) => sum + student.paid,
      0
    );

    // Calculate other shared income
    const otherSharedIncome = income
      .filter((inc) => inc.type === "shared")
      .reduce((sum, inc) => sum + inc.amount, 0);

    const totalSharedIncome = studentIncome + otherSharedIncome;

    // Calculate shared expenses
    const totalSharedExpenses = expenses
      .filter((exp) => exp.type === "shared")
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate total due
    const totalDue = students.reduce(
      (sum, student) => sum + Math.max(0, student.due),
      0
    );

    // Calculate shared profit
    const sharedProfit = totalSharedIncome - totalSharedExpenses;

    // Apply retention rate
    const retainedAmount = sharedProfit * (retentionRate / 100);
    const distributableProfit = sharedProfit - retainedAmount;

    setCalculations({
      totalSharedIncome,
      totalSharedExpenses,
      totalDue,
      sharedProfit,
      distributableProfit,
    });
  };

  // Get partner distribution
  const getPartnerDistribution = () => {
    const totalShares = partners.reduce(
      (sum, partner) => sum + partner.share,
      0
    );

    return partners.map((partner) => {
      const expenseReimbursement = expenses
        .filter((exp) => exp.type === "shared" && exp.paidBy === partner.name)
        .reduce((sum, exp) => sum + exp.amount, 0);

      const profitShare =
        totalShares > 0
          ? (partner.share / totalShares) * calculations.distributableProfit
          : 0;

      return {
        ...partner,
        expenseReimbursement,
        profitShare,
        totalReceivable: expenseReimbursement + profitShare,
      };
    });
  };

  // Get personal income summary
  const getPersonalIncomeSummary = () => {
    const personalIncome = income.filter((inc) => inc.type !== "shared");
    const groupedIncome = {};

    personalIncome.forEach((inc) => {
      if (!groupedIncome[inc.type]) {
        groupedIncome[inc.type] = { total: 0, recipients: new Set() };
      }
      groupedIncome[inc.type].total += inc.amount;
      groupedIncome[inc.type].recipients.add(inc.receivedBy);
    });

    return Object.entries(groupedIncome).map(([type, data]) => ({
      type,
      total: data.total,
      recipients: Array.from(data.recipients).join(", "),
    }));
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      className={`px-6 py-3 text-base font-semibold transition-all duration-300 border-none cursor-pointer ${
        isActive
          ? "bg-white text-gray-800 border-b-2 border-indigo-500"
          : "bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const InputGroup = ({ children }) => (
    <div className="flex gap-3 mb-4 flex-wrap">{children}</div>
  );

  const Button = ({ variant, onClick, children, className = "" }) => {
    const variants = {
      primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white",
      success: "bg-gradient-to-r from-green-400 to-green-500 text-white",
      danger: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    };

    return (
      <button
        className={`px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 border-none hover:transform hover:-translate-y-1 hover:shadow-lg ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-5 w-full">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-8 text-center">
          <h1 className="text-4xl mb-3 drop-shadow-lg">
            🎓 কোচিং সেন্টার হিসাব ব্যবস্থাপনা
          </h1>
          <p className="text-lg opacity-90">
            আয় • ব্যয় • লাভ • শেয়ার ভিত্তিক হিসাব
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-50 border-b-2 border-gray-200">
          <TabButton
            id="partners"
            label="অংশীদার"
            isActive={activeTab === "partners"}
            onClick={() => setActiveTab("partners")}
          />
          <TabButton
            id="students"
            label="শিক্ষার্থী"
            isActive={activeTab === "students"}
            onClick={() => setActiveTab("students")}
          />
          <TabButton
            id="expenses"
            label="ব্যয়"
            isActive={activeTab === "expenses"}
            onClick={() => setActiveTab("expenses")}
          />
          <TabButton
            id="income"
            label="আয়"
            isActive={activeTab === "income"}
            onClick={() => setActiveTab("income")}
          />
          <TabButton
            id="calculation"
            label="হিসাব"
            isActive={activeTab === "calculation"}
            onClick={() => setActiveTab("calculation")}
          />
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Partners Tab */}
          {activeTab === "partners" && (
            <div>
              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  অংশীদার তথ্য
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="অংশীদারের নাম"
                    value={partnerForm.name}
                    onChange={(e) =>
                      setPartnerForm({ ...partnerForm, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="প্রাথমিক বিনিয়োগ (টাকা)"
                    value={partnerForm.investment}
                    onChange={(e) =>
                      setPartnerForm({
                        ...partnerForm,
                        investment: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="শেয়ার (%)"
                    value={partnerForm.share}
                    onChange={(e) =>
                      setPartnerForm({
                        ...partnerForm,
                        share: Number(e.target.value),
                      })
                    }
                  />
                  <Button variant="primary" onClick={addPartner}>
                    যোগ করুন
                  </Button>
                </div>

                <table className="w-full border-collapse mt-5 bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        নাম
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        বিনিয়োগ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        শেয়ার %
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map((partner, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{partner.name}</td>
                        <td className="p-4">
                          {partner.investment.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">{partner.share}%</td>
                        <td className="p-4">
                          <Button
                            variant="danger"
                            onClick={() => removePartner(index)}
                          >
                            মুছুন
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div>
              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  শিক্ষার্থী তথ্য
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="শিক্ষার্থীর নাম"
                    value={studentForm.name}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, name: e.target.value })
                    }
                  />
                  <select
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    value={studentForm.className}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        className: e.target.value,
                      })
                    }
                  >
                    <option value="">শ্রেণী নির্বাচন</option>
                    <option value="Class 6">ষষ্ঠ শ্রেণী</option>
                    <option value="Class 7">সপ্তম শ্রেণী</option>
                    <option value="Class 8">অষ্টম শ্রেণী</option>
                    <option value="Class 9">নবম শ্রেণী</option>
                    <option value="Class 10">দশম শ্রেণী</option>
                    <option value="HSC">এইচএসসি</option>
                  </select>
                  <input
                    type="number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="মাসিক বেতন"
                    value={studentForm.fee}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, fee: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="পরিশোধিত"
                    value={studentForm.paid}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, paid: e.target.value })
                    }
                  />
                  <Button variant="success" onClick={addStudent}>
                    যোগ করুন
                  </Button>
                </div>

                <table className="w-full border-collapse mt-5 bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        নাম
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        শ্রেণী
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        বেতন
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        পরিশোধিত
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        বকেয়া
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        অবস্থা
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">{student.className}</td>
                        <td className="p-4">
                          {student.fee.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          {student.paid.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          {student.due.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          {student.due <= 0 ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                              পরিশোধিত
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                              বকেয়া
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="danger"
                            onClick={() => removeStudent(index)}
                          >
                            মুছুন
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === "expenses" && (
            <div>
              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  ব্যয়ের তথ্য
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="ব্যয়ের বিবরণ"
                    value={expenseForm.item}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, item: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="পরিমাণ (টাকা)"
                    value={expenseForm.amount}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, amount: e.target.value })
                    }
                  />
                  <select
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    value={expenseForm.type}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, type: e.target.value })
                    }
                  >
                    <option value="shared">শেয়ারড (MW)</option>
                    <option value="personal">ব্যক্তিগত</option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="কে দিয়েছেন"
                    value={expenseForm.paidBy}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, paidBy: e.target.value })
                    }
                  />
                  <Button variant="danger" onClick={addExpense}>
                    যোগ করুন
                  </Button>
                </div>

                <table className="w-full border-collapse mt-5 bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        বিবরণ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        পরিমাণ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        ধরণ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        কে দিয়েছেন
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{expense.item}</td>
                        <td className="p-4">
                          {expense.amount.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          {expense.type === "shared" ? "শেয়ারড" : "ব্যক্তিগত"}
                        </td>
                        <td className="p-4">{expense.paidBy}</td>
                        <td className="p-4">
                          <Button
                            variant="danger"
                            onClick={() => removeExpense(index)}
                          >
                            মুছুন
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Income Tab */}
          {activeTab === "income" && (
            <div>
              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  আয়ের তথ্য
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="আয়ের উৎস"
                    value={incomeForm.source}
                    onChange={(e) =>
                      setIncomeForm({ ...incomeForm, source: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="পরিমাণ (টাকা)"
                    value={incomeForm.amount}
                    onChange={(e) =>
                      setIncomeForm({ ...incomeForm, amount: e.target.value })
                    }
                  />
                  <select
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    value={incomeForm.type}
                    onChange={(e) =>
                      setIncomeForm({ ...incomeForm, type: e.target.value })
                    }
                  >
                    <option value="shared">শেয়ারড (MW)</option>
                    <option value="NBS">NBS (ব্যক্তিগত)</option>
                    <option value="RARe">RARe (ব্যক্তিগত)</option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="কে পেয়েছেন"
                    value={incomeForm.receivedBy}
                    onChange={(e) =>
                      setIncomeForm({
                        ...incomeForm,
                        receivedBy: e.target.value,
                      })
                    }
                  />
                  <Button variant="success" onClick={addIncome}>
                    যোগ করুন
                  </Button>
                </div>

                <table className="w-full border-collapse mt-5 bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        উৎস
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        পরিমাণ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        ধরণ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        কে পেয়েছেন
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {income.map((inc, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{inc.source}</td>
                        <td className="p-4">
                          {inc.amount.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          {inc.type === "shared" ? "শেয়ারড" : inc.type}
                        </td>
                        <td className="p-4">{inc.receivedBy}</td>
                        <td className="p-4">
                          <Button
                            variant="danger"
                            onClick={() => removeIncome(index)}
                          >
                            মুছুন
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Calculation Tab */}
          {activeTab === "calculation" && (
            <div>
              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  পুনঃবিনিয়োগ সেটিংস
                </h3>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold text-gray-700">
                    পুনঃবিনিয়োগ শতাংশ (%)
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    value={retentionRate}
                    min="0"
                    max="100"
                    onChange={(e) =>
                      setRetentionRate(parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <Button variant="primary" onClick={calculateAll}>
                  হিসাব করুন
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                  <h4 className="text-gray-800 mb-4 text-xl font-semibold">
                    শেয়ারড আয় (MW)
                  </h4>
                  <div className="text-3xl font-bold text-indigo-500">
                    {calculations.totalSharedIncome.toLocaleString()} টাকা
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                  <h4 className="text-gray-800 mb-4 text-xl font-semibold">
                    শেয়ারড ব্যয়
                  </h4>
                  <div className="text-3xl font-bold text-indigo-500">
                    {calculations.totalSharedExpenses.toLocaleString()} টাকা
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                  <h4 className="text-gray-800 mb-4 text-xl font-semibold">
                    মোট বকেয়া
                  </h4>
                  <div className="text-3xl font-bold text-indigo-500">
                    {calculations.totalDue.toLocaleString()} টাকা
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                  <h4 className="text-gray-800 mb-4 text-xl font-semibold">
                    শেয়ারড লাভ
                  </h4>
                  <div className="text-3xl font-bold text-indigo-500">
                    {calculations.sharedProfit.toLocaleString()} টাকা
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl mb-5 text-center shadow-xl">
                <h2 className="text-4xl mb-3">
                  বিতরণযোগ্য লাভ:{" "}
                  {calculations.distributableProfit.toLocaleString()} টাকা
                </h2>
                <p className="text-lg">পুনঃবিনিয়োগ বাদে বিতরণযোগ্য</p>
              </div>

              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  অংশীদার প্রাপ্তি
                </h3>
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        অংশীদার
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        খরচ ফেরত
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        লাভের অংশ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        মোট প্রাপ্তি
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPartnerDistribution().map((partner, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{partner.name}</td>
                        <td className="p-4">
                          {partner.expenseReimbursement.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          {partner.profitShare.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">
                          <strong>
                            {partner.totalReceivable.toLocaleString()} টাকা
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
                <h3 className="text-2xl text-gray-800 mb-5 border-b-2 border-indigo-500 pb-3">
                  ব্যক্তিগত আয় সারসংক্ষেপ
                </h3>
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        ধরণ
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        মোট আয়
                      </th>
                      <th className="p-4 text-left font-semibold uppercase tracking-wider">
                        প্রাপক
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPersonalIncomeSummary().map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{item.type}</td>
                        <td className="p-4">
                          {item.total.toLocaleString()} টাকা
                        </td>
                        <td className="p-4">{item.recipients}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
