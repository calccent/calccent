'use client';
import { useState, useEffect } from 'react';

type Mode = 'percentage-of' | 'what-percent' | 'increase' | 'discount' | 'tip';

export default function UniversalCalculator({ 
  initialMode = 'percentage-of',
  initialNum1 = '',
  initialNum2 = '',
}: { 
  initialMode?: Mode;
  initialNum1?: string;
  initialNum2?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [num1, setNum1] = useState<string>(initialNum1);
  const [num2, setNum2] = useState<string>(initialNum2);
  const [result, setResult] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    calculate();
  }, [mode, num1, num2]);

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) { setResult(null); return; }

    let value = 0;
    let label = '';

    switch (mode) {
      case 'percentage-of':
        value = (a / 100) * b;
        label = `${a}% of ${b} is`;
        break;
      case 'what-percent':
        value = (a / b) * 100;
        label = `${a} is what % of ${b}? Answer:`;
        break;
      case 'increase':
        value = ((a - b) / b) * 100;
        label = `Increase from ${b} to ${a} is`;
        break;
      case 'discount':
        const savings = (b / 100) * a;
        value = b - savings;
        label = `After ${a}% off $${b}, you pay`;
        break;
      case 'tip':
        const tipAmount = (b / 100) * a;
        value = a + tipAmount;
        label = `With ${b}% tip, total bill is`;
        break;
      default:
        return;
    }
    setResult({ value: value.toFixed(2), label });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto border border-gray-100">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">I want to...</label>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        >
          <option value="percentage-of">Calculate X% of Y</option>
          <option value="what-percent">X is what % of Y</option>
          <option value="increase">Percentage Increase (New vs Old)</option>
          <option value="discount">Apply Discount (X% off Price)</option>
          <option value="tip">Calculate Tip (Total + Tip%)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Number 1</label>
          <input 
            type="number" 
            value={num1} 
            onChange={(e) => setNum1(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 20"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Number 2</label>
          <input 
            type="number" 
            value={num2} 
            onChange={(e) => setNum2(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 100"
          />
        </div>
      </div>

      {result && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-2">
          <p className="text-gray-600 text-sm">{result.label}</p>
          <p className="text-3xl font-bold text-blue-600">${result.value}</p>
          <div className="flex gap-3 mt-3">
            <button onClick={() => navigator.clipboard.writeText(result.value)} className="text-sm bg-white px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-50">📋 Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}