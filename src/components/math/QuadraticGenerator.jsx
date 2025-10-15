import { useState } from 'react';

export default function QuadraticGenerator() {
  const [num, setNum] = useState('');
  const [expressions, setExpressions] = useState([]);

  const generateExpressions = () => {
    const n = parseInt(num);
    if (isNaN(n) || n <= 0) {
      alert('দয়া করে একটি ধনাত্মক সংখ্যা লিখুন');
      return;
    }

    const results = [];
    
    // সব divisor pair এর sum বের করা
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        let b = i + Math.floor(n / i); // এই pair এর sum
        
        // এই b এর জন্য সব (a, c) pair
        for (let j = 1; j * j <= n; j++) {
          if (n % j === 0) {
            const a = j;
            const c = Math.floor(n / j);
            
            results.push(`${a}x^2 + ${b}x + ${c}`);
            results.push(`${a}x^2 - ${b}x + ${c}`);
            
            if (a !== c) {
              results.push(`${c}x^2 + ${b}x + ${a}`);
              results.push(`${c}x^2 - ${b}x + ${a}`);
            }
          }
        }
        
        b = Math.floor(n / i) - i; // এই pair এর difference
        
        // এই b এর জন্য সব (a, c) pair
        for (let j = 1; j * j <= n; j++) {
          if (n % j === 0) {
            const a = j;
            const c = Math.floor(n / j);
            
            results.push(`${a}x^2 - ${b}x - ${c}`);
            results.push(`${a}x^2 + ${b}x - ${c}`);
            
            if (a !== c) {
              results.push(`${c}x^2 - ${b}x - ${a}`);
              results.push(`${c}x^2 + ${b}x - ${a}`);
            }
          }
        }
      }
    }
    
    setExpressions(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">দ্বিঘাত রাশি জেনারেটর</h1>
          <p className="text-gray-600 mb-6">Quadratic Expression Generator (a×c ভিত্তিক)</p>
          
          <div className="flex gap-4 items-end mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                a×c এর মান লিখুন:
              </label>
              <input
                type="number"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="যেমন: 6, 12, 24"
                min="1"
              />
            </div>
            <button
              onClick={generateExpressions}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              তৈরি করুন
            </button>
          </div>
        </div>

        {expressions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              সব সম্ভাব্য দ্বিঘাত রাশি ({expressions.length}টি):
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expressions.map((expr, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200"
                >
                  <div className="text-lg font-mono text-gray-800">
                    {expr.split(/([+-])/).map((part, i) => {
                      if (part === '+') return <span key={i} className="text-green-600 mx-1">{part}</span>;
                      if (part === '-') return <span key={i} className="text-red-600 mx-1">{part}</span>;
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}