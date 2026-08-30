'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getToolSchema } from '@/lib/toolSchemas';
import DynamicForm from './DynamicForm';
import CGPACalculator from './CGPACalculator';
import { formatResult } from '@/lib/calculationUtils';

export default function UniversalCalculator({ 
  initialMode = 'percentage-of',
}: { 
  initialMode?: string;
}) {
  // ✅ HOOKS - All called in the same order every render
  const [mode, setMode] = useState<string>(initialMode);
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const schema = useMemo(() => getToolSchema(mode), [mode]);

  // ✅ FIX 1: Watch initialMode prop and update mode state when it changes
  useEffect(() => {
    if (initialMode && initialMode !== mode) {
      setMode(initialMode);
      setIsInitialized(false);
    }
  }, [initialMode]);

  // ✅ FIX 2: Reset form data when mode changes
  useEffect(() => {
    if (!schema) return;

    const initialData: any = {};
    
    if (schema.inputType === 'simple' && schema.fields) {
      schema.fields.forEach(field => {
        initialData[field.id] = field.defaultValue || '';
      });
    }
    
    if (schema.inputType === 'list' && schema.listFields) {
      const defaultRows = schema.defaultRows || 3;
      const newRows = [];
      for (let i = 0; i < defaultRows; i++) {
        const row: any = {};
        schema.listFields.forEach(field => {
          row[field.id] = field.defaultValue || (field.type === 'text' ? '' : 0);
        });
        newRows.push(row);
      }
      
      if (mode === 'gpa' || mode === 'grade' || mode === 'weighted-grade' || mode === 'final-grade') {
        initialData.assignments = newRows;
      } else {
        initialData.courses = newRows;
      }
    }
    
    if (schema.inputType === 'complex' && schema.sections) {
      schema.sections.forEach(section => {
        section.fields.forEach(field => {
          initialData[field.id] = field.defaultValue || '';
        });
      });
    }
    
    setFormData(initialData);
    setIsInitialized(true);
  }, [schema, mode]);

  // ✅ Calculate result
  useEffect(() => {
    if (!schema || !isInitialized || Object.keys(formData).length === 0) return;
    
    try {
      const resultData = schema.calculate(formData);
      if (resultData) {
        setResult({
          value: typeof resultData.value === 'string' ? resultData.value : resultData.value.toString(),
          label: resultData.label,
          format: resultData.format,
        });
      }
    } catch (e) {
      console.log('Calculation error:', e);
    }
  }, [formData, schema, isInitialized]);

  const handleFormChange = useCallback((data: any) => {
    setFormData(data);
  }, []);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setMode(newMode);
    setIsInitialized(false);
    // ✅ Navigate to the new tool page when user selects from dropdown
    if (typeof window !== 'undefined') {
      window.location.href = `/calculator/${newMode}`;
    }
  };

  const handleCopy = () => {
    if (result) {
      const formatted = formatResult(result.value, result.format);
      copyToClipboard(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ✅ AFTER ALL HOOKS - Safe to conditionally render
  if (mode === 'cgpa') {
    return <CGPACalculator key="cgpa" />;
  }

  if (!schema) {
    return <div className="text-gray-500 p-8 text-center">Tool not found. Please select a different calculator.</div>;
  }

  // ✅ RENDER
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white text-lg">🧮</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{schema.label}</h3>
          <p className="text-gray-400 text-xs">{schema.description}</p>
        </div>
      </div>

      {/* Mode Select */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Calculator</label>
        <select 
          value={mode} 
          onChange={handleModeChange}
          className="w-full p-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-700 font-medium outline-none appearance-none"
        >
          <optgroup label="Basic Percentage">
            <option value="percentage-of">X% of Y</option>
            <option value="what-percent">X is what % of Y</option>
            <option value="increase">Percentage Increase</option>
            <option value="decrease">Percentage Decrease</option>
            <option value="percentage-difference">Percentage Difference</option>
          </optgroup>
          <optgroup label="Shopping & Money">
            <option value="discount">Discount Calculator</option>
            <option value="tip">Tip Calculator</option>
            <option value="price-increase">Price Increase</option>
            <option value="price-decrease">Price Decrease</option>
            <option value="shipping-cost">Shipping Cost</option>
          </optgroup>
          <optgroup label="Taxes">
            <option value="sales-tax">Sales Tax</option>
            <option value="vat">VAT</option>
            <option value="gst">GST</option>
            <option value="hst">HST</option>
            <option value="pst">PST</option>
            <option value="income-tax">Effective Tax Rate</option>
            <option value="property-tax">Property Tax</option>
          </optgroup>
          <optgroup label="Business & Finance">
            <option value="profit-margin">Profit Margin</option>
            <option value="markup">Markup</option>
            <option value="gross-profit">Gross Profit</option>
            <option value="net-profit">Net Profit</option>
            <option value="roi">ROI</option>
            <option value="commission">Commission</option>
            <option value="conversion-rate">Conversion Rate</option>
            <option value="sales-growth">Sales Growth</option>
            <option value="revenue-growth">Revenue Growth</option>
            <option value="yoy-growth">YoY Growth</option>
            <option value="mom-growth">MoM Growth</option>
            <option value="cagr">CAGR</option>
            <option value="margin-vs-markup">Margin vs Markup</option>
            <option value="profit-sharing">Profit Sharing</option>
            <option value="employee-turnover">Employee Turnover</option>
            <option value="inventory-turnover">Inventory Turnover</option>
            <option value="food-cost">Food Cost %</option>
            <option value="defect-rate">Defect Rate</option>
            <option value="price-elasticity">Price Elasticity</option>
          </optgroup>
          <optgroup label="Investing & Real Estate">
            <option value="compound-interest">Compound Interest</option>
            <option value="stock-change">Stock Change %</option>
            <option value="stock-split">Stock Split</option>
            <option value="cap-rate">Cap Rate</option>
            <option value="ltv">LTV Ratio</option>
            <option value="debt-to-income">Debt-to-Income</option>
            <option value="margin-call">Margin Call</option>
            <option value="dcf">DCF</option>
            <option value="expense-ratio">Expense Ratio</option>
            <option value="mortgage">Mortgage Calculator</option>
          </optgroup>
          <optgroup label="Education">
            <option value="grade">Grade %</option>
            <option value="gpa">GPA</option>
            <option value="cgpa">CGPA Calculator</option>
            <option value="weighted-grade">Weighted Grade</option>
            <option value="final-grade">Final Grade Needed</option>
            <option value="average-percentage">Average Percentage</option>
            <option value="percent-error">Percent Error</option>
          </optgroup>
          <optgroup label="Health & Fitness">
            <option value="bmi">BMI</option>
            <option value="bmr">BMR</option>
            <option value="calorie-burn">Calorie Burn</option>
          </optgroup>
          <optgroup label="Conversions & Other">
            <option value="fraction-to-percent">Fraction to %</option>
            <option value="percent-to-fraction">% to Fraction</option>
            <option value="currency-converter">Currency Converter</option>
            <option value="time-percentage">Time Percentage</option>
            <option value="abv">ABV (Beer)</option>
            <option value="electricity-cost">Electricity % of Income</option>
            <option value="rent-vs-buy">Rent vs Buy</option>
          </optgroup>
        </select>
      </div>

      {/* Dynamic Form */}
      <div className="mb-6">
        <DynamicForm
          key={mode}
          schema={schema}
          data={formData}
          onChange={handleFormChange}
        />
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 animate-fadeInScale">
          <p className="text-sm text-gray-600 font-medium">{result.label}</p>
          <div className="flex items-center justify-between mt-1 flex-wrap gap-3">
            <p className="text-2xl md:text-3xl font-extrabold text-indigo-600">
              {formatResult(result.value, result.format)}
            </p>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
            >
              {copied ? (
                <span className="text-green-500">✅ Copied!</span>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
const copyToClipboard = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
};

const fallbackCopy = (text: string) => {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  } catch (e) {
    alert('Please copy the result manually.');
  }
};