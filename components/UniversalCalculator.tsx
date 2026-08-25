'use client';
import { useState, useEffect } from 'react';

// ALL 50 MODES (same as before)
type Mode = 
  | 'percentage-of' | 'what-percent' | 'increase' | 'decrease' | 'discount' | 'tip' 
  | 'sales-tax' | 'vat' | 'profit-margin' | 'markup' | 'gross-profit' | 'net-profit' 
  | 'roi' | 'commission' | 'compound-interest' | 'grade' | 'gpa' | 'weighted-grade' 
  | 'final-grade' | 'bmi' | 'bmr' | 'conversion-rate' | 'percentage-difference' 
  | 'stock-change' | 'sales-growth' | 'revenue-growth' | 'yoy-growth' | 'mom-growth' 
  | 'price-increase' | 'price-decrease' | 'loan-interest' | 'calorie-burn' 
  | 'fraction-to-percent' | 'percent-to-fraction' | 'percent-error' | 'average-percentage' 
  | 'cap-rate' | 'ltv' | 'debt-to-income' | 'margin-vs-markup' | 'gst' | 'hst' | 'pst' 
  | 'cagr' | 'price-elasticity' | 'time-percentage' | 'abv' | 'currency-converter' 
  | 'shipping-cost' | 'property-tax' | 'income-tax' | 'margin-call' | 'dcf' 
  | 'employee-turnover' | 'stock-split' | 'food-cost' | 'inventory-turnover' | 'rent-vs-buy' 
  | 'expense-ratio' | 'electricity-cost' | 'profit-sharing' | 'defect-rate';

type ResultFormat = 'currency' | 'percent' | 'number' | 'none';

const MODE_LABELS: Record<Mode, string> = {
  'percentage-of': 'X% of Y',
  'what-percent': 'X is what % of Y',
  'increase': 'Percentage Increase',
  'decrease': 'Percentage Decrease',
  'discount': 'Discount Calculator',
  'tip': 'Tip Calculator',
  'sales-tax': 'Sales Tax',
  'vat': 'VAT',
  'profit-margin': 'Profit Margin',
  'markup': 'Markup',
  'gross-profit': 'Gross Profit',
  'net-profit': 'Net Profit',
  'roi': 'ROI',
  'commission': 'Commission',
  'compound-interest': 'Compound Interest',
  'grade': 'Grade %',
  'gpa': 'GPA',
  'weighted-grade': 'Weighted Grade',
  'final-grade': 'Final Grade Needed',
  'bmi': 'BMI',
  'bmr': 'BMR',
  'conversion-rate': 'Conversion Rate',
  'percentage-difference': 'Percentage Difference',
  'stock-change': 'Stock Change %',
  'sales-growth': 'Sales Growth',
  'revenue-growth': 'Revenue Growth',
  'yoy-growth': 'YoY Growth',
  'mom-growth': 'MoM Growth',
  'price-increase': 'Price Increase',
  'price-decrease': 'Price Decrease',
  'loan-interest': 'Loan Interest',
  'calorie-burn': 'Calorie Burn',
  'fraction-to-percent': 'Fraction to %',
  'percent-to-fraction': '% to Fraction',
  'percent-error': 'Percent Error',
  'average-percentage': 'Average Percentage',
  'cap-rate': 'Cap Rate',
  'ltv': 'LTV Ratio',
  'debt-to-income': 'Debt-to-Income',
  'margin-vs-markup': 'Margin vs Markup',
  'gst': 'GST',
  'hst': 'HST',
  'pst': 'PST',
  'cagr': 'CAGR',
  'price-elasticity': 'Price Elasticity',
  'time-percentage': 'Time Percentage',
  'abv': 'ABV',
  'currency-converter': 'Currency Converter',
  'shipping-cost': 'Shipping Cost',
  'property-tax': 'Property Tax',
  'income-tax': 'Effective Tax Rate',
  'margin-call': 'Margin Call',
  'dcf': 'DCF',
  'employee-turnover': 'Employee Turnover',
  'stock-split': 'Stock Split',
  'food-cost': 'Food Cost %',
  'inventory-turnover': 'Inventory Turnover',
  'rent-vs-buy': 'Rent vs Buy',
  'expense-ratio': 'Expense Ratio',
  'electricity-cost': 'Electricity % of Income',
  'profit-sharing': 'Profit Sharing',
  'defect-rate': 'Defect Rate',
};

const MODE_GROUPS = {
  'Basic Percentage': ['percentage-of', 'what-percent', 'increase', 'decrease', 'percentage-difference'],
  'Shopping & Money': ['discount', 'tip', 'price-increase', 'price-decrease', 'shipping-cost'],
  'Taxes': ['sales-tax', 'vat', 'gst', 'hst', 'pst', 'income-tax', 'property-tax'],
  'Business & Finance': ['profit-margin', 'markup', 'gross-profit', 'net-profit', 'roi', 'commission', 'conversion-rate', 'sales-growth', 'revenue-growth', 'yoy-growth', 'mom-growth', 'cagr', 'margin-vs-markup', 'profit-sharing', 'employee-turnover', 'inventory-turnover', 'food-cost', 'defect-rate', 'price-elasticity'],
  'Investing': ['compound-interest', 'stock-change', 'stock-split', 'cap-rate', 'ltv', 'debt-to-income', 'margin-call', 'dcf', 'expense-ratio'],
  'Health': ['bmi', 'bmr', 'calorie-burn'],
  'Education': ['grade', 'gpa', 'weighted-grade', 'final-grade', 'average-percentage', 'percent-error'],
  'Conversions': ['fraction-to-percent', 'percent-to-fraction', 'currency-converter'],
  'Other': ['time-percentage', 'abv', 'electricity-cost', 'rent-vs-buy'],
};

// Safe copy function
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

// ✅ NEW: Format the result based on the mode
const getResultFormat = (mode: Mode): ResultFormat => {
  const currencyModes: Mode[] = [
    'discount', 'tip', 'sales-tax', 'vat', 'gst', 'hst', 'pst',
    'gross-profit', 'net-profit', 'commission', 'compound-interest',
    'price-increase', 'price-decrease', 'loan-interest', 'currency-converter',
    'shipping-cost', 'property-tax', 'profit-sharing', 'margin-call', 'dcf'
  ];
  
  const percentModes: Mode[] = [
    'percentage-of', 'what-percent', 'increase', 'decrease',
    'profit-margin', 'markup', 'roi', 'conversion-rate',
    'percentage-difference', 'stock-change', 'sales-growth',
    'revenue-growth', 'yoy-growth', 'mom-growth', 'cagr',
    'price-elasticity', 'time-percentage', 'cap-rate', 'ltv',
    'debt-to-income', 'food-cost', 'employee-turnover',
    'income-tax', 'expense-ratio', 'electricity-cost', 'defect-rate'
  ];
  
  const numberModes: Mode[] = [
    'grade', 'gpa', 'bmi', 'bmr', 'calorie-burn',
    'weighted-grade', 'final-grade', 'average-percentage',
    'percent-error', 'margin-vs-markup', 'inventory-turnover',
    'rent-vs-buy', 'abv'
  ];
  
  const noneModes: Mode[] = [
    'percent-to-fraction', 'fraction-to-percent', 'stock-split'
  ];
  
  if (currencyModes.includes(mode)) return 'currency';
  if (percentModes.includes(mode)) return 'percent';
  if (numberModes.includes(mode)) return 'number';
  if (noneModes.includes(mode)) return 'none';
  return 'number'; // default
};

// ✅ NEW: Format the display value
const formatResult = (value: string | number, format: ResultFormat): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  
  switch (format) {
    case 'currency':
      return `$${num.toFixed(2)}`;
    case 'percent':
      return `${num.toFixed(2)}%`;
    case 'number':
      return num.toFixed(2);
    case 'none':
      return String(num);
    default:
      return String(num);
  }
};

export default function UniversalCalculator({ 
  initialMode = 'percentage-of',
  initialNum1 = '',
  initialNum2 = '',
  initialNum3 = '',
}: { 
  initialMode?: Mode;
  initialNum1?: string;
  initialNum2?: string;
  initialNum3?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [num1, setNum1] = useState<string>(initialNum1);
  const [num2, setNum2] = useState<string>(initialNum2);
  const [num3, setNum3] = useState<string>(initialNum3);
  const [result, setResult] = useState<{ value: string; label: string; format: ResultFormat } | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync with initialMode when it changes (when a tool is clicked)
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Sync input values when they change
  useEffect(() => {
    setNum1(initialNum1);
  }, [initialNum1]);

  useEffect(() => {
    setNum2(initialNum2);
  }, [initialNum2]);

  useEffect(() => {
    setNum3(initialNum3);
  }, [initialNum3]);

  const needsThirdInput = (): boolean => {
    return ['compound-interest', 'final-grade', 'bmr', 'loan-interest', 'calorie-burn', 'cagr', 'margin-call', 'dcf'].includes(mode);
  };

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    const c = parseFloat(num3);
    if (isNaN(a) || isNaN(b) || (needsThirdInput() && isNaN(c))) { 
      setResult(null); 
      return; 
    }

    let value = 0;
    let label = '';
    let format: ResultFormat = 'number';

    switch (mode) {
      case 'percentage-of': 
        value = (a / 100) * b; 
        label = `${a}% of ${b} is`; 
        format = 'percent';
        break;
      case 'what-percent': 
        value = (a / b) * 100; 
        label = `${a} is what % of ${b}?`; 
        format = 'percent';
        break;
      case 'increase': 
        value = ((a - b) / b) * 100; 
        label = `Increase from ${b} to ${a} is`; 
        format = 'percent';
        break;
      case 'decrease': 
        value = ((b - a) / b) * 100; 
        label = `Decrease from ${b} to ${a} is`; 
        format = 'percent';
        break;
      case 'discount': 
        value = b - ((b / 100) * a); 
        label = `After ${a}% off $${b}, you pay`; 
        format = 'currency';
        break;
      case 'tip': 
        value = a + ((a / 100) * b); 
        label = `With ${b}% tip, total bill is`; 
        format = 'currency';
        break;
      case 'sales-tax': 
        value = a + ((a / 100) * b); 
        label = `$${a} with ${b}% sales tax =`; 
        format = 'currency';
        break;
      case 'vat': 
        value = a + ((a / 100) * b); 
        label = `$${a} with ${b}% VAT =`; 
        format = 'currency';
        break;
      case 'gst': 
        value = a + ((a / 100) * b); 
        label = `$${a} with ${b}% GST =`; 
        format = 'currency';
        break;
      case 'hst': 
        value = a + ((a / 100) * b); 
        label = `$${a} with ${b}% HST =`; 
        format = 'currency';
        break;
      case 'pst': 
        value = a + ((a / 100) * b); 
        label = `$${a} with ${b}% PST =`; 
        format = 'currency';
        break;
      case 'profit-margin': 
        value = ((a - b) / a) * 100; 
        label = `Profit Margin is`; 
        format = 'percent';
        break;
      case 'markup': 
        value = ((a - b) / b) * 100; 
        label = `Markup is`; 
        format = 'percent';
        break;
      case 'gross-profit': 
        value = a - b; 
        label = `Gross Profit = $${a} - $${b} =`; 
        format = 'currency';
        break;
      case 'net-profit': 
        value = a - b; 
        label = `Net Profit = $${a} - $${b} =`; 
        format = 'currency';
        break;
      case 'roi': 
        value = ((a - b) / b) * 100; 
        label = `ROI on $${b} investment is`; 
        format = 'percent';
        break;
      case 'commission': 
        value = (a / 100) * b; 
        label = `${b}% commission on $${a} =`; 
        format = 'currency';
        break;
      case 'compound-interest': 
        value = a * Math.pow(1 + b/100, c); 
        label = `$${a} at ${b}% for ${c} years =`; 
        format = 'currency';
        break;
      case 'grade': 
        value = (a / b) * 100; 
        label = `${a}/${b} =`; 
        format = 'number';
        break;
      case 'gpa': 
        value = a / b; 
        label = `GPA = ${a} / ${b} =`; 
        format = 'number';
        break;
      case 'weighted-grade': 
        value = (a * b) / 100; 
        label = `Weighted grade =`; 
        format = 'number';
        break;
      case 'final-grade': {
        const target = c || 70;
        value = (target - (a * (1 - b/100))) / (b/100);
        label = `You need on the final to get ${target}% =`; 
        format = 'number';
        break;
      }
      case 'bmi': 
        value = a / (b * b); 
        label = `BMI = ${a}kg / ${b}m² =`; 
        format = 'number';
        break;
      case 'bmr': 
        value = 10 * a + 6.25 * b - 5 * (c || 30) + 5; 
        label = `BMR (Mifflin-St Jeor) =`; 
        format = 'number';
        break;
      case 'conversion-rate': 
        value = (a / b) * 100; 
        label = `${a} / ${b} × 100 =`; 
        format = 'percent';
        break;
      case 'percentage-difference': 
        value = (Math.abs(a - b) / ((a + b) / 2)) * 100; 
        label = `Difference between ${a} and ${b} =`; 
        format = 'percent';
        break;
      case 'stock-change': 
        value = ((a - b) / b) * 100; 
        label = `Stock change from $${b} to $${a} =`; 
        format = 'percent';
        break;
      case 'sales-growth': 
        value = ((a - b) / b) * 100; 
        label = `Sales growth from $${b} to $${a} =`; 
        format = 'percent';
        break;
      case 'revenue-growth': 
        value = ((a - b) / b) * 100; 
        label = `Revenue growth from $${b} to $${a} =`; 
        format = 'percent';
        break;
      case 'yoy-growth': 
        value = ((a - b) / b) * 100; 
        label = `YoY growth from $${b} to $${a} =`; 
        format = 'percent';
        break;
      case 'mom-growth': 
        value = ((a - b) / b) * 100; 
        label = `MoM growth from $${b} to $${a} =`; 
        format = 'percent';
        break;
      case 'price-increase': 
        value = a * (1 + b/100); 
        label = `$${a} + ${b}% increase =`; 
        format = 'currency';
        break;
      case 'price-decrease': 
        value = a * (1 - b/100); 
        label = `$${a} - ${b}% decrease =`; 
        format = 'currency';
        break;
      case 'loan-interest': 
        value = a * (b/100) * c; 
        label = `Interest on $${a} at ${b}% for ${c} years =`; 
        format = 'currency';
        break;
      case 'calorie-burn': 
        value = (c || 3.5) * a * b; 
        label = `Calories burned (MET ${c || 3.5}) =`; 
        format = 'number';
        break;
      case 'fraction-to-percent': 
        value = (a / b) * 100; 
        label = `${a}/${b} =`; 
        format = 'percent';
        break;
      case 'percent-to-fraction': {
        const gcd = (x: number, y: number): number => { 
          while (y) { const t = y; y = x % y; x = t; } 
          return x; 
        };
        const g = gcd(a, 100);
        value = a/100;
        label = `${a}% = ${a/100} = ${a/g}/${100/g}`; 
        format = 'none';
        break;
      }
      case 'percent-error': 
        value = (Math.abs(a - b) / b) * 100; 
        label = `Percent error =`; 
        format = 'percent';
        break;
      case 'average-percentage': 
        value = (a + b) / 2; 
        label = `Average of ${a}% and ${b}% =`; 
        format = 'number';
        break;
      case 'cap-rate': 
        value = (a / b) * 100; 
        label = `Cap Rate = $${a} / $${b} =`; 
        format = 'percent';
        break;
      case 'ltv': 
        value = (a / b) * 100; 
        label = `LTV = $${a} / $${b} =`; 
        format = 'percent';
        break;
      case 'debt-to-income': 
        value = (a / b) * 100; 
        label = `DTI = $${a} / $${b} =`; 
        format = 'percent';
        break;
      case 'margin-vs-markup': {
        const m = ((a - b) / a) * 100;
        const mu = ((a - b) / b) * 100;
        value = m;
        label = `Margin: ${m.toFixed(2)}% | Markup: ${mu.toFixed(2)}%`; 
        format = 'none';
        break;
      }
      case 'cagr': 
        value = (Math.pow(a / b, 1 / c) - 1) * 100; 
        label = `CAGR from $${b} to $${a} over ${c} years =`; 
        format = 'percent';
        break;
      case 'price-elasticity': 
        value = a / b; 
        label = `Price Elasticity = ${a}% / ${b}% =`; 
        format = 'number';
        break;
      case 'time-percentage': 
        value = (a / b) * 100; 
        label = `${a} / ${b} =`; 
        format = 'percent';
        break;
      case 'abv': 
        value = (a - b) * 131.25; 
        label = `ABV = (${a} - ${b}) × 131.25 =`; 
        format = 'number';
        break;
      case 'currency-converter': 
        value = a * (b/100); 
        label = `${a} with ${b}% fee =`; 
        format = 'currency';
        break;
      case 'shipping-cost': 
        value = a * (b/100); 
        label = `Shipping on $${a} at ${b}% =`; 
        format = 'currency';
        break;
      case 'property-tax': 
        value = (a / 1000) * b; 
        label = `Property tax on $${a} at ${b} mills =`; 
        format = 'currency';
        break;
      case 'income-tax': 
        value = (b / a) * 100; 
        label = `Effective tax rate on $${a} income =`; 
        format = 'percent';
        break;
      case 'margin-call': 
        value = a * (1 - (b/100) / (c || 10)); 
        label = `Margin call price =`; 
        format = 'currency';
        break;
      case 'dcf': 
        value = a / Math.pow(1 + (b/100), c); 
        label = `Discounted cash flow =`; 
        format = 'currency';
        break;
      case 'employee-turnover': 
        value = (a / b) * 100; 
        label = `Turnover = ${a} / ${b} =`; 
        format = 'percent';
        break;
      case 'stock-split': 
        value = a / b; 
        label = `New price after ${b}:1 split =`; 
        format = 'none';
        break;
      case 'food-cost': 
        value = (a / b) * 100; 
        label = `Food cost % = $${a} / $${b} =`; 
        format = 'percent';
        break;
      case 'inventory-turnover': 
        value = a / b; 
        label = `Inventory turnover = $${a} / $${b} =`; 
        format = 'none';
        break;
      case 'rent-vs-buy': 
        value = (a / b) * 100; 
        label = `Rent as % of income = $${a} / $${b} =`; 
        format = 'percent';
        break;
      case 'expense-ratio': 
        value = (a / b) * 100; 
        label = `Expense ratio = $${a} / $${b} =`; 
        format = 'percent';
        break;
      case 'electricity-cost': 
        value = (a / b) * 100; 
        label = `Electricity as % of income =`; 
        format = 'percent';
        break;
      case 'profit-sharing': 
        value = (a / 100) * b; 
        label = `${b}% of $${a} profit to share =`; 
        format = 'currency';
        break;
      case 'defect-rate': 
        value = (a / b) * 100; 
        label = `Defect rate = ${a} / ${b} =`; 
        format = 'percent';
        break;
      default: 
        return;
    }
    setResult({ 
      value: typeof value === 'string' ? value : value.toFixed(2), 
      label,
      format
    });
  };

  useEffect(() => {
    calculate();
  }, [mode, num1, num2, num3]);

  const getPlaceholders = () => {
    const map: Record<Mode, { n1: string; n2: string; n3: string }> = {
      'percentage-of': { n1: 'Percentage %', n2: 'Number', n3: '' },
      'what-percent': { n1: 'Number 1', n2: 'Number 2', n3: '' },
      'increase': { n1: 'New Value', n2: 'Old Value', n3: '' },
      'decrease': { n1: 'New Value', n2: 'Old Value', n3: '' },
      'discount': { n1: 'Discount %', n2: 'Price ($)', n3: '' },
      'tip': { n1: 'Bill ($)', n2: 'Tip %', n3: '' },
      'sales-tax': { n1: 'Price ($)', n2: 'Tax Rate %', n3: '' },
      'vat': { n1: 'Price ($)', n2: 'VAT Rate %', n3: '' },
      'gst': { n1: 'Price ($)', n2: 'GST Rate %', n3: '' },
      'hst': { n1: 'Amount ($)', n2: 'HST Rate %', n3: '' },
      'pst': { n1: 'Amount ($)', n2: 'PST Rate %', n3: '' },
      'profit-margin': { n1: 'Revenue ($)', n2: 'Cost ($)', n3: '' },
      'markup': { n1: 'Revenue ($)', n2: 'Cost ($)', n3: '' },
      'gross-profit': { n1: 'Revenue ($)', n2: 'COGS ($)', n3: '' },
      'net-profit': { n1: 'Revenue ($)', n2: 'Total Expenses ($)', n3: '' },
      'roi': { n1: 'Current Value ($)', n2: 'Initial Cost ($)', n3: '' },
      'commission': { n1: 'Sales Amount ($)', n2: 'Commission Rate %', n3: '' },
      'compound-interest': { n1: 'Principal ($)', n2: 'Rate %', n3: 'Years' },
      'grade': { n1: 'Score', n2: 'Total', n3: '' },
      'gpa': { n1: 'Grade Points', n2: 'Credits', n3: '' },
      'weighted-grade': { n1: 'Grade', n2: 'Weight %', n3: '' },
      'final-grade': { n1: 'Current Grade', n2: 'Exam Weight %', n3: 'Target Grade' },
      'bmi': { n1: 'Weight (kg)', n2: 'Height (m)', n3: '' },
      'bmr': { n1: 'Weight (kg)', n2: 'Height (cm)', n3: 'Age' },
      'conversion-rate': { n1: 'Conversions', n2: 'Visitors', n3: '' },
      'percentage-difference': { n1: 'Value 1', n2: 'Value 2', n3: '' },
      'stock-change': { n1: 'Current Price ($)', n2: 'Purchase Price ($)', n3: '' },
      'sales-growth': { n1: 'Current Sales ($)', n2: 'Previous Sales ($)', n3: '' },
      'revenue-growth': { n1: 'Current Revenue ($)', n2: 'Previous Revenue ($)', n3: '' },
      'yoy-growth': { n1: 'This Year ($)', n2: 'Last Year ($)', n3: '' },
      'mom-growth': { n1: 'This Month ($)', n2: 'Last Month ($)', n3: '' },
      'price-increase': { n1: 'Price ($)', n2: 'Increase %', n3: '' },
      'price-decrease': { n1: 'Price ($)', n2: 'Decrease %', n3: '' },
      'loan-interest': { n1: 'Principal ($)', n2: 'Rate %', n3: 'Years' },
      'calorie-burn': { n1: 'Weight (kg)', n2: 'Duration (hours)', n3: 'MET' },
      'fraction-to-percent': { n1: 'Numerator', n2: 'Denominator', n3: '' },
      'percent-to-fraction': { n1: 'Percentage %', n2: '', n3: '' },
      'percent-error': { n1: 'Experimental Value', n2: 'Accepted Value', n3: '' },
      'average-percentage': { n1: 'Percentage 1', n2: 'Percentage 2', n3: '' },
      'cap-rate': { n1: 'Net Income ($)', n2: 'Property Value ($)', n3: '' },
      'ltv': { n1: 'Loan Amount ($)', n2: 'Property Value ($)', n3: '' },
      'debt-to-income': { n1: 'Monthly Debt ($)', n2: 'Monthly Income ($)', n3: '' },
      'margin-vs-markup': { n1: 'Revenue ($)', n2: 'Cost ($)', n3: '' },
      'cagr': { n1: 'Ending Value ($)', n2: 'Beginning Value ($)', n3: 'Years' },
      'price-elasticity': { n1: 'Qty Change %', n2: 'Price Change %', n3: '' },
      'time-percentage': { n1: 'Time Passed', n2: 'Total Time', n3: '' },
      'abv': { n1: 'OG', n2: 'FG', n3: '' },
      'currency-converter': { n1: 'Amount ($)', n2: 'Exchange Rate %', n3: '' },
      'shipping-cost': { n1: 'Order Value ($)', n2: 'Shipping %', n3: '' },
      'property-tax': { n1: 'Assessed Value ($)', n2: 'Mill Rate', n3: '' },
      'income-tax': { n1: 'Income ($)', n2: 'Tax Paid ($)', n3: '' },
      'margin-call': { n1: 'Entry Price ($)', n2: 'Maintenance Margin %', n3: 'Leverage' },
      'dcf': { n1: 'Future Cash Flow ($)', n2: 'Discount Rate %', n3: 'Years' },
      'employee-turnover': { n1: 'Leavers', n2: 'Avg Employees', n3: '' },
      'stock-split': { n1: 'Old Price ($)', n2: 'Split Ratio', n3: '' },
      'food-cost': { n1: 'COGS ($)', n2: 'Revenue ($)', n3: '' },
      'inventory-turnover': { n1: 'COGS ($)', n2: 'Avg Inventory ($)', n3: '' },
      'rent-vs-buy': { n1: 'Rent ($)', n2: 'Monthly Income ($)', n3: '' },
      'expense-ratio': { n1: 'Total Costs ($)', n2: 'Assets ($)', n3: '' },
      'electricity-cost': { n1: 'Electricity Bill ($)', n2: 'Income ($)', n3: '' },
      'profit-sharing': { n1: 'Total Profit ($)', n2: 'Share %', n3: '' },
      'defect-rate': { n1: 'Defects', n2: 'Total Units', n3: '' },
    };
    return map[mode] || { n1: 'Value 1', n2: 'Value 2', n3: '' };
  };

  const placeholders = getPlaceholders();
  const showThird = needsThirdInput();

  const handleCopy = () => {
    if (result) {
      const formatted = formatResult(result.value, result.format);
      copyToClipboard(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white text-lg">🧮</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Calculator</h3>
          <p className="text-gray-400 text-xs">Select a tool and enter your values</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Calculator</label>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full p-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-700 font-medium outline-none appearance-none"
        >
          {Object.entries(MODE_GROUPS).map(([group, modes]) => (
            <optgroup key={group} label={group}>
              {modes.map((m) => (
                <option key={m} value={m}>{MODE_LABELS[m as Mode]}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">{placeholders.n1 || 'Value 1'}</label>
          <input 
            type="number" 
            value={num1} 
            onChange={(e) => setNum1(e.target.value)}
            className="input-modern w-full p-3.5 rounded-2xl text-lg outline-none transition-all"
            placeholder={placeholders.n1 || 'Enter value'}
          />
        </div>
        {placeholders.n2 && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">{placeholders.n2}</label>
            <input 
              type="number" 
              value={num2} 
              onChange={(e) => setNum2(e.target.value)}
              className="input-modern w-full p-3.5 rounded-2xl text-lg outline-none transition-all"
              placeholder={placeholders.n2}
            />
          </div>
        )}
        {showThird && placeholders.n3 && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">{placeholders.n3}</label>
            <input 
              type="number" 
              value={num3} 
              onChange={(e) => setNum3(e.target.value)}
              className="input-modern w-full p-3.5 rounded-2xl text-lg outline-none transition-all"
              placeholder={placeholders.n3}
            />
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 animate-fadeInScale">
          <p className="text-sm text-gray-600 font-medium">{result.label}</p>
          <div className="flex items-center justify-between mt-1 flex-wrap gap-3">
            {/* ✅ FORMATTED RESULT */}
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