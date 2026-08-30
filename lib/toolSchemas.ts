// lib/toolSchemas.ts
export type InputType = 'simple' | 'list' | 'complex';

export interface FieldDefinition {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select';
  placeholder?: string;
  defaultValue?: string | number;
  options?: { label: string; value: string | number }[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface ListFieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select';
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
}

export interface ToolSchema {
  slug: string;
  inputType: InputType;
  label: string;
  description: string;
  fields?: FieldDefinition[];
  listFields?: ListFieldDefinition[];
  minRows?: number;
  maxRows?: number;
  defaultRows?: number;
  sections?: {
    id: string;
    label: string;
    fields: FieldDefinition[];
    optional?: boolean;
    toggleLabel?: string;
  }[];
  calculate: (data: any) => { value: number; label: string; format: 'currency' | 'percent' | 'number' | 'none' };
}

// ============================================================
// 1. SIMPLE TOOLS (2-3 inputs)
// ============================================================

const simpleTools: Record<string, ToolSchema> = {
  'percentage-of': {
    slug: 'percentage-of',
    inputType: 'simple',
    label: 'X% of Y',
    description: 'Calculate what a percentage of a number is',
    fields: [
      { id: 'percentage', label: 'Percentage (%)', type: 'number', placeholder: '25', defaultValue: 25, required: true, min: 0, max: 100 },
      { id: 'number', label: 'Number', type: 'number', placeholder: '200', defaultValue: 200, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = (data.percentage / 100) * data.number;
      return { value, label: `${data.percentage}% of ${data.number} is`, format: 'percent' };
    },
  },
  'what-percent': {
    slug: 'what-percent',
    inputType: 'simple',
    label: 'X is what % of Y',
    description: 'Find what percentage one number is of another',
    fields: [
      { id: 'number1', label: 'Number 1', type: 'number', placeholder: '50', defaultValue: 50, required: true, min: 0 },
      { id: 'number2', label: 'Number 2', type: 'number', placeholder: '200', defaultValue: 200, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = (data.number1 / data.number2) * 100;
      return { value, label: `${data.number1} is what % of ${data.number2}?`, format: 'percent' };
    },
  },
  'increase': {
    slug: 'increase',
    inputType: 'simple',
    label: 'Percentage Increase',
    description: 'Calculate the percentage increase from one number to another',
    fields: [
      { id: 'newValue', label: 'New Value', type: 'number', placeholder: '120', defaultValue: 120, required: true, min: 0 },
      { id: 'oldValue', label: 'Old Value', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.newValue - data.oldValue) / data.oldValue) * 100;
      return { value, label: `Increase from ${data.oldValue} to ${data.newValue} is`, format: 'percent' };
    },
  },
  'decrease': {
    slug: 'decrease',
    inputType: 'simple',
    label: 'Percentage Decrease',
    description: 'Calculate the percentage decrease from one number to another',
    fields: [
      { id: 'newValue', label: 'New Value', type: 'number', placeholder: '80', defaultValue: 80, required: true, min: 0 },
      { id: 'oldValue', label: 'Old Value', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.oldValue - data.newValue) / data.oldValue) * 100;
      return { value, label: `Decrease from ${data.oldValue} to ${data.newValue} is`, format: 'percent' };
    },
  },
  'discount': {
    slug: 'discount',
    inputType: 'simple',
    label: 'Discount Calculator',
    description: 'Calculate savings and final price after a discount',
    fields: [
      { id: 'discountPercent', label: 'Discount (%)', type: 'number', placeholder: '20', defaultValue: 20, required: true, min: 0, max: 100 },
      { id: 'price', label: 'Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.price - ((data.price / 100) * data.discountPercent);
      return { value, label: `After ${data.discountPercent}% off $${data.price}, you pay`, format: 'currency' };
    },
  },
  'tip': {
    slug: 'tip',
    inputType: 'simple',
    label: 'Tip Calculator',
    description: 'Calculate the perfect tip amount and total bill',
    fields: [
      { id: 'bill', label: 'Bill ($)', type: 'number', placeholder: '50', defaultValue: 50, required: true, min: 0 },
      { id: 'tipPercent', label: 'Tip (%)', type: 'number', placeholder: '15', defaultValue: 15, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.bill + ((data.bill / 100) * data.tipPercent);
      return { value, label: `With ${data.tipPercent}% tip, total bill is`, format: 'currency' };
    },
  },
  'sales-tax': {
    slug: 'sales-tax',
    inputType: 'simple',
    label: 'Sales Tax Calculator',
    description: 'Calculate total price including sales tax',
    fields: [
      { id: 'price', label: 'Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'taxRate', label: 'Tax Rate (%)', type: 'number', placeholder: '7', defaultValue: 7, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.price + ((data.price / 100) * data.taxRate);
      return { value, label: `$${data.price} with ${data.taxRate}% sales tax =`, format: 'currency' };
    },
  },
  'vat': {
    slug: 'vat',
    inputType: 'simple',
    label: 'VAT Calculator',
    description: 'Calculate Value Added Tax (VAT)',
    fields: [
      { id: 'price', label: 'Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'vatRate', label: 'VAT Rate (%)', type: 'number', placeholder: '20', defaultValue: 20, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.price + ((data.price / 100) * data.vatRate);
      return { value, label: `$${data.price} with ${data.vatRate}% VAT =`, format: 'currency' };
    },
  },
  'profit-margin': {
    slug: 'profit-margin',
    inputType: 'simple',
    label: 'Profit Margin Calculator',
    description: 'Calculate profit margin percentage',
    fields: [
      { id: 'revenue', label: 'Revenue ($)', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 0 },
      { id: 'cost', label: 'Cost ($)', type: 'number', placeholder: '600', defaultValue: 600, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.revenue - data.cost) / data.revenue) * 100;
      return { value, label: `Profit Margin is`, format: 'percent' };
    },
  },
  'markup': {
    slug: 'markup',
    inputType: 'simple',
    label: 'Markup Calculator',
    description: 'Calculate markup percentage',
    fields: [
      { id: 'revenue', label: 'Revenue ($)', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 0 },
      { id: 'cost', label: 'Cost ($)', type: 'number', placeholder: '600', defaultValue: 600, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.revenue - data.cost) / data.cost) * 100;
      return { value, label: `Markup is`, format: 'percent' };
    },
  },
  'gross-profit': {
    slug: 'gross-profit',
    inputType: 'simple',
    label: 'Gross Profit Calculator',
    description: 'Calculate gross profit and gross profit margin',
    fields: [
      { id: 'revenue', label: 'Revenue ($)', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 0 },
      { id: 'cogs', label: 'COGS ($)', type: 'number', placeholder: '600', defaultValue: 600, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.revenue - data.cogs;
      return { value, label: `Gross Profit = $${data.revenue} - $${data.cogs} =`, format: 'currency' };
    },
  },
  'net-profit': {
    slug: 'net-profit',
    inputType: 'simple',
    label: 'Net Profit Calculator',
    description: 'Calculate net profit and net profit margin',
    fields: [
      { id: 'revenue', label: 'Revenue ($)', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 0 },
      { id: 'totalExpenses', label: 'Total Expenses ($)', type: 'number', placeholder: '800', defaultValue: 800, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.revenue - data.totalExpenses;
      return { value, label: `Net Profit = $${data.revenue} - $${data.totalExpenses} =`, format: 'currency' };
    },
  },
  'roi': {
    slug: 'roi',
    inputType: 'simple',
    label: 'ROI Calculator',
    description: 'Calculate return on investment',
    fields: [
      { id: 'currentValue', label: 'Current Value ($)', type: 'number', placeholder: '12000', defaultValue: 12000, required: true, min: 0 },
      { id: 'initialCost', label: 'Initial Cost ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.currentValue - data.initialCost) / data.initialCost) * 100;
      return { value, label: `ROI on $${data.initialCost} investment is`, format: 'percent' };
    },
  },
  'commission': {
    slug: 'commission',
    inputType: 'simple',
    label: 'Commission Calculator',
    description: 'Calculate commission earnings',
    fields: [
      { id: 'salesAmount', label: 'Sales Amount ($)', type: 'number', placeholder: '5000', defaultValue: 5000, required: true, min: 0 },
      { id: 'commissionRate', label: 'Commission Rate (%)', type: 'number', placeholder: '5', defaultValue: 5, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = (data.salesAmount / 100) * data.commissionRate;
      return { value, label: `${data.commissionRate}% commission on $${data.salesAmount} =`, format: 'currency' };
    },
  },
  'conversion-rate': {
    slug: 'conversion-rate',
    inputType: 'simple',
    label: 'Conversion Rate Calculator',
    description: 'Calculate conversion rate percentage',
    fields: [
      { id: 'conversions', label: 'Conversions', type: 'number', placeholder: '50', defaultValue: 50, required: true, min: 0 },
      { id: 'visitors', label: 'Visitors', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = (data.conversions / data.visitors) * 100;
      return { value, label: `${data.conversions} / ${data.visitors} × 100 =`, format: 'percent' };
    },
  },
  'percentage-difference': {
    slug: 'percentage-difference',
    inputType: 'simple',
    label: 'Percentage Difference',
    description: 'Calculate percentage difference between two numbers',
    fields: [
      { id: 'value1', label: 'Value 1', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'value2', label: 'Value 2', type: 'number', placeholder: '80', defaultValue: 80, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const avg = (data.value1 + data.value2) / 2;
      const value = avg > 0 ? (Math.abs(data.value1 - data.value2) / avg) * 100 : 0;
      return { value, label: `Difference between ${data.value1} and ${data.value2} =`, format: 'percent' };
    },
  },
  'stock-change': {
    slug: 'stock-change',
    inputType: 'simple',
    label: 'Stock Change %',
    description: 'Calculate percentage change in stock price',
    fields: [
      { id: 'currentPrice', label: 'Current Price ($)', type: 'number', placeholder: '120', defaultValue: 120, required: true, min: 0 },
      { id: 'purchasePrice', label: 'Purchase Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.currentPrice - data.purchasePrice) / data.purchasePrice) * 100;
      return { value, label: `Stock change from $${data.purchasePrice} to $${data.currentPrice} =`, format: 'percent' };
    },
  },
  'sales-growth': {
    slug: 'sales-growth',
    inputType: 'simple',
    label: 'Sales Growth',
    description: 'Calculate sales growth percentage',
    fields: [
      { id: 'currentSales', label: 'Current Sales ($)', type: 'number', placeholder: '15000', defaultValue: 15000, required: true, min: 0 },
      { id: 'previousSales', label: 'Previous Sales ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.currentSales - data.previousSales) / data.previousSales) * 100;
      return { value, label: `Sales growth from $${data.previousSales} to $${data.currentSales} =`, format: 'percent' };
    },
  },
  'revenue-growth': {
    slug: 'revenue-growth',
    inputType: 'simple',
    label: 'Revenue Growth',
    description: 'Calculate revenue growth percentage',
    fields: [
      { id: 'currentRevenue', label: 'Current Revenue ($)', type: 'number', placeholder: '15000', defaultValue: 15000, required: true, min: 0 },
      { id: 'previousRevenue', label: 'Previous Revenue ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.currentRevenue - data.previousRevenue) / data.previousRevenue) * 100;
      return { value, label: `Revenue growth from $${data.previousRevenue} to $${data.currentRevenue} =`, format: 'percent' };
    },
  },
  'yoy-growth': {
    slug: 'yoy-growth',
    inputType: 'simple',
    label: 'YoY Growth',
    description: 'Calculate year over year growth',
    fields: [
      { id: 'thisYear', label: 'This Year ($)', type: 'number', placeholder: '15000', defaultValue: 15000, required: true, min: 0 },
      { id: 'lastYear', label: 'Last Year ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.thisYear - data.lastYear) / data.lastYear) * 100;
      return { value, label: `YoY growth from $${data.lastYear} to $${data.thisYear} =`, format: 'percent' };
    },
  },
  'mom-growth': {
    slug: 'mom-growth',
    inputType: 'simple',
    label: 'MoM Growth',
    description: 'Calculate month over month growth',
    fields: [
      { id: 'thisMonth', label: 'This Month ($)', type: 'number', placeholder: '15000', defaultValue: 15000, required: true, min: 0 },
      { id: 'lastMonth', label: 'Last Month ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = ((data.thisMonth - data.lastMonth) / data.lastMonth) * 100;
      return { value, label: `MoM growth from $${data.lastMonth} to $${data.thisMonth} =`, format: 'percent' };
    },
  },
  'price-increase': {
    slug: 'price-increase',
    inputType: 'simple',
    label: 'Price Increase',
    description: 'Calculate price after percentage increase',
    fields: [
      { id: 'price', label: 'Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'increasePercent', label: 'Increase (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.price * (1 + data.increasePercent / 100);
      return { value, label: `$${data.price} + ${data.increasePercent}% increase =`, format: 'currency' };
    },
  },
  'price-decrease': {
    slug: 'price-decrease',
    inputType: 'simple',
    label: 'Price Decrease',
    description: 'Calculate price after percentage decrease',
    fields: [
      { id: 'price', label: 'Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'decreasePercent', label: 'Decrease (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.price * (1 - data.decreasePercent / 100);
      return { value, label: `$${data.price} - ${data.decreasePercent}% decrease =`, format: 'currency' };
    },
  },
  'fraction-to-percent': {
    slug: 'fraction-to-percent',
    inputType: 'simple',
    label: 'Fraction to %',
    description: 'Convert fraction to percentage',
    fields: [
      { id: 'numerator', label: 'Numerator', type: 'number', placeholder: '1', defaultValue: 1, required: true, min: 0 },
      { id: 'denominator', label: 'Denominator', type: 'number', placeholder: '4', defaultValue: 4, required: true, min: 1 },
    ],
    calculate: (data: any) => {
      const value = (data.numerator / data.denominator) * 100;
      return { value, label: `${data.numerator}/${data.denominator} =`, format: 'percent' };
    },
  },
  'percent-to-fraction': {
    slug: 'percent-to-fraction',
    inputType: 'simple',
    label: '% to Fraction',
    description: 'Convert percentage to fraction',
    fields: [
      { id: 'percentage', label: 'Percentage (%)', type: 'number', placeholder: '25', defaultValue: 25, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.percentage / 100;
      return { value, label: `${data.percentage}% =`, format: 'none' };
    },
  },
  'percent-error': {
    slug: 'percent-error',
    inputType: 'simple',
    label: 'Percent Error',
    description: 'Calculate percent error between experimental and accepted values',
    fields: [
      { id: 'experimental', label: 'Experimental Value', type: 'number', placeholder: '95', defaultValue: 95, required: true, min: 0 },
      { id: 'accepted', label: 'Accepted Value', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.accepted > 0 ? (Math.abs(data.experimental - data.accepted) / data.accepted) * 100 : 0;
      return { value, label: `Percent error =`, format: 'percent' };
    },
  },
  'average-percentage': {
    slug: 'average-percentage',
    inputType: 'simple',
    label: 'Average Percentage',
    description: 'Calculate average of two percentages',
    fields: [
      { id: 'p1', label: 'Percentage 1 (%)', type: 'number', placeholder: '50', defaultValue: 50, required: true, min: 0, max: 100 },
      { id: 'p2', label: 'Percentage 2 (%)', type: 'number', placeholder: '70', defaultValue: 70, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = (data.p1 + data.p2) / 2;
      return { value, label: `Average of ${data.p1}% and ${data.p2}% =`, format: 'number' };
    },
  },
  'cap-rate': {
    slug: 'cap-rate',
    inputType: 'simple',
    label: 'Cap Rate',
    description: 'Calculate capitalization rate for real estate',
    fields: [
      { id: 'netIncome', label: 'Net Income ($)', type: 'number', placeholder: '50000', defaultValue: 50000, required: true, min: 0 },
      { id: 'propertyValue', label: 'Property Value ($)', type: 'number', placeholder: '500000', defaultValue: 500000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.propertyValue > 0 ? (data.netIncome / data.propertyValue) * 100 : 0;
      return { value, label: `Cap Rate = $${data.netIncome} / $${data.propertyValue} =`, format: 'percent' };
    },
  },
  'ltv': {
    slug: 'ltv',
    inputType: 'simple',
    label: 'LTV Ratio',
    description: 'Calculate loan to value ratio',
    fields: [
      { id: 'loanAmount', label: 'Loan Amount ($)', type: 'number', placeholder: '200000', defaultValue: 200000, required: true, min: 0 },
      { id: 'propertyValue', label: 'Property Value ($)', type: 'number', placeholder: '250000', defaultValue: 250000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.propertyValue > 0 ? (data.loanAmount / data.propertyValue) * 100 : 0;
      return { value, label: `LTV = $${data.loanAmount} / $${data.propertyValue} =`, format: 'percent' };
    },
  },
  'debt-to-income': {
    slug: 'debt-to-income',
    inputType: 'simple',
    label: 'Debt-to-Income',
    description: 'Calculate debt to income ratio',
    fields: [
      { id: 'monthlyDebt', label: 'Monthly Debt ($)', type: 'number', placeholder: '1500', defaultValue: 1500, required: true, min: 0 },
      { id: 'monthlyIncome', label: 'Monthly Income ($)', type: 'number', placeholder: '5000', defaultValue: 5000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.monthlyIncome > 0 ? (data.monthlyDebt / data.monthlyIncome) * 100 : 0;
      return { value, label: `DTI = $${data.monthlyDebt} / $${data.monthlyIncome} =`, format: 'percent' };
    },
  },
  'margin-vs-markup': {
    slug: 'margin-vs-markup',
    inputType: 'simple',
    label: 'Margin vs Markup',
    description: 'Convert between margin and markup',
    fields: [
      { id: 'revenue', label: 'Revenue ($)', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 0 },
      { id: 'cost', label: 'Cost ($)', type: 'number', placeholder: '600', defaultValue: 600, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const margin = data.revenue > 0 ? ((data.revenue - data.cost) / data.revenue) * 100 : 0;
      const markup = data.cost > 0 ? ((data.revenue - data.cost) / data.cost) * 100 : 0;
      return { 
        value: margin, 
        label: `Margin: ${margin.toFixed(2)}% | Markup: ${markup.toFixed(2)}%`, 
        format: 'none' 
      };
    },
  },
  'gst': {
    slug: 'gst',
    inputType: 'simple',
    label: 'GST Calculator',
    description: 'Calculate Goods and Services Tax',
    fields: [
      { id: 'price', label: 'Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'gstRate', label: 'GST Rate (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.price + ((data.price / 100) * data.gstRate);
      return { value, label: `$${data.price} with ${data.gstRate}% GST =`, format: 'currency' };
    },
  },
  'hst': {
    slug: 'hst',
    inputType: 'simple',
    label: 'HST Calculator',
    description: 'Calculate Harmonized Sales Tax',
    fields: [
      { id: 'amount', label: 'Amount ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'hstRate', label: 'HST Rate (%)', type: 'number', placeholder: '13', defaultValue: 13, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.amount + ((data.amount / 100) * data.hstRate);
      return { value, label: `$${data.amount} with ${data.hstRate}% HST =`, format: 'currency' };
    },
  },
  'pst': {
    slug: 'pst',
    inputType: 'simple',
    label: 'PST Calculator',
    description: 'Calculate Provincial Sales Tax',
    fields: [
      { id: 'amount', label: 'Amount ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'pstRate', label: 'PST Rate (%)', type: 'number', placeholder: '7', defaultValue: 7, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.amount + ((data.amount / 100) * data.pstRate);
      return { value, label: `$${data.amount} with ${data.pstRate}% PST =`, format: 'currency' };
    },
  },
  'price-elasticity': {
    slug: 'price-elasticity',
    inputType: 'simple',
    label: 'Price Elasticity',
    description: 'Calculate price elasticity of demand',
    fields: [
      { id: 'qtyChange', label: 'Quantity Change (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true },
      { id: 'priceChange', label: 'Price Change (%)', type: 'number', placeholder: '5', defaultValue: 5, required: true },
    ],
    calculate: (data: any) => {
      const value = data.priceChange !== 0 ? data.qtyChange / data.priceChange : 0;
      return { value, label: `Price Elasticity = ${data.qtyChange}% / ${data.priceChange}% =`, format: 'number' };
    },
  },
  'time-percentage': {
    slug: 'time-percentage',
    inputType: 'simple',
    label: 'Time Percentage',
    description: 'Calculate what percentage of time has passed',
    fields: [
      { id: 'timePassed', label: 'Time Passed', type: 'number', placeholder: '3', defaultValue: 3, required: true, min: 0 },
      { id: 'totalTime', label: 'Total Time', type: 'number', placeholder: '8', defaultValue: 8, required: true, min: 1 },
    ],
    calculate: (data: any) => {
      const value = (data.timePassed / data.totalTime) * 100;
      return { value, label: `${data.timePassed} / ${data.totalTime} =`, format: 'percent' };
    },
  },
  'abv': {
    slug: 'abv',
    inputType: 'simple',
    label: 'ABV Calculator',
    description: 'Calculate alcohol by volume for homebrewing',
    fields: [
      { id: 'og', label: 'Original Gravity', type: 'number', placeholder: '1.050', defaultValue: 1.050, required: true, min: 1, step: 0.001 },
      { id: 'fg', label: 'Final Gravity', type: 'number', placeholder: '1.010', defaultValue: 1.010, required: true, min: 1, step: 0.001 },
    ],
    calculate: (data: any) => {
      const value = (data.og - data.fg) * 131.25;
      return { value, label: `ABV = (${data.og} - ${data.fg}) × 131.25 =`, format: 'number' };
    },
  },
  'currency-converter': {
    slug: 'currency-converter',
    inputType: 'simple',
    label: 'Currency Converter',
    description: 'Convert currency with percentage fee',
    fields: [
      { id: 'amount', label: 'Amount ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'feePercent', label: 'Fee (%)', type: 'number', placeholder: '2', defaultValue: 2, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.amount * (data.feePercent / 100);
      return { value, label: `${data.amount} with ${data.feePercent}% fee =`, format: 'currency' };
    },
  },
  'shipping-cost': {
    slug: 'shipping-cost',
    inputType: 'simple',
    label: 'Shipping Cost',
    description: 'Calculate shipping cost based on percentage',
    fields: [
      { id: 'orderValue', label: 'Order Value ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'shippingPercent', label: 'Shipping (%)', type: 'number', placeholder: '5', defaultValue: 5, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.orderValue * (data.shippingPercent / 100);
      return { value, label: `Shipping on $${data.orderValue} at ${data.shippingPercent}% =`, format: 'currency' };
    },
  },
  'property-tax': {
    slug: 'property-tax',
    inputType: 'simple',
    label: 'Property Tax',
    description: 'Calculate property tax based on mill rate',
    fields: [
      { id: 'assessedValue', label: 'Assessed Value ($)', type: 'number', placeholder: '250000', defaultValue: 250000, required: true, min: 0 },
      { id: 'millRate', label: 'Mill Rate', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = (data.assessedValue / 1000) * data.millRate;
      return { value, label: `Property tax on $${data.assessedValue} at ${data.millRate} mills =`, format: 'currency' };
    },
  },
  'income-tax': {
    slug: 'income-tax',
    inputType: 'simple',
    label: 'Effective Tax Rate',
    description: 'Calculate effective tax rate',
    fields: [
      { id: 'income', label: 'Income ($)', type: 'number', placeholder: '50000', defaultValue: 50000, required: true, min: 0 },
      { id: 'taxPaid', label: 'Tax Paid ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.income > 0 ? (data.taxPaid / data.income) * 100 : 0;
      return { value, label: `Effective tax rate on $${data.income} income =`, format: 'percent' };
    },
  },
  'electricity-cost': {
    slug: 'electricity-cost',
    inputType: 'simple',
    label: 'Electricity % of Income',
    description: 'Calculate electricity cost as percentage of income',
    fields: [
      { id: 'electricityBill', label: 'Electricity Bill ($)', type: 'number', placeholder: '150', defaultValue: 150, required: true, min: 0 },
      { id: 'income', label: 'Income ($)', type: 'number', placeholder: '5000', defaultValue: 5000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.income > 0 ? (data.electricityBill / data.income) * 100 : 0;
      return { value, label: `Electricity as % of income =`, format: 'percent' };
    },
  },
  'profit-sharing': {
    slug: 'profit-sharing',
    inputType: 'simple',
    label: 'Profit Sharing',
    description: 'Calculate profit sharing amount',
    fields: [
      { id: 'totalProfit', label: 'Total Profit ($)', type: 'number', placeholder: '100000', defaultValue: 100000, required: true, min: 0 },
      { id: 'sharePercent', label: 'Share (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0, max: 100 },
    ],
    calculate: (data: any) => {
      const value = (data.totalProfit / 100) * data.sharePercent;
      return { value, label: `${data.sharePercent}% of $${data.totalProfit} profit to share =`, format: 'currency' };
    },
  },
  'defect-rate': {
    slug: 'defect-rate',
    inputType: 'simple',
    label: 'Defect Rate',
    description: 'Calculate defect rate percentage',
    fields: [
      { id: 'defects', label: 'Defects', type: 'number', placeholder: '5', defaultValue: 5, required: true, min: 0 },
      { id: 'totalUnits', label: 'Total Units', type: 'number', placeholder: '1000', defaultValue: 1000, required: true, min: 1 },
    ],
    calculate: (data: any) => {
      const value = (data.defects / data.totalUnits) * 100;
      return { value, label: `Defect rate = ${data.defects} / ${data.totalUnits} =`, format: 'percent' };
    },
  },
  'stock-split': {
    slug: 'stock-split',
    inputType: 'simple',
    label: 'Stock Split Calculator',
    description: 'Calculate new price after stock split',
    fields: [
      { id: 'oldPrice', label: 'Old Price ($)', type: 'number', placeholder: '200', defaultValue: 200, required: true, min: 0 },
      { id: 'splitRatio', label: 'Split Ratio', type: 'number', placeholder: '2', defaultValue: 2, required: true, min: 1 },
    ],
    calculate: (data: any) => {
      const value = data.oldPrice / data.splitRatio;
      return { value, label: `New price after ${data.splitRatio}:1 split =`, format: 'none' };
    },
  },
  'employee-turnover': {
    slug: 'employee-turnover',
    inputType: 'simple',
    label: 'Employee Turnover',
    description: 'Calculate employee turnover rate',
    fields: [
      { id: 'leavers', label: 'Number of Leavers', type: 'number', placeholder: '5', defaultValue: 5, required: true, min: 0 },
      { id: 'avgEmployees', label: 'Average Employees', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 1 },
    ],
    calculate: (data: any) => {
      const value = (data.leavers / data.avgEmployees) * 100;
      return { value, label: `Turnover = ${data.leavers} / ${data.avgEmployees} =`, format: 'percent' };
    },
  },
  'inventory-turnover': {
    slug: 'inventory-turnover',
    inputType: 'simple',
    label: 'Inventory Turnover',
    description: 'Calculate inventory turnover ratio',
    fields: [
      { id: 'cogs', label: 'COGS ($)', type: 'number', placeholder: '50000', defaultValue: 50000, required: true, min: 0 },
      { id: 'avgInventory', label: 'Average Inventory ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.avgInventory > 0 ? data.cogs / data.avgInventory : 0;
      return { value, label: `Inventory turnover = $${data.cogs} / $${data.avgInventory} =`, format: 'none' };
    },
  },
  'food-cost': {
    slug: 'food-cost',
    inputType: 'simple',
    label: 'Food Cost %',
    description: 'Calculate food cost percentage for restaurants',
    fields: [
      { id: 'cogs', label: 'COGS ($)', type: 'number', placeholder: '3000', defaultValue: 3000, required: true, min: 0 },
      { id: 'revenue', label: 'Revenue ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.revenue > 0 ? (data.cogs / data.revenue) * 100 : 0;
      return { value, label: `Food cost % = $${data.cogs} / $${data.revenue} =`, format: 'percent' };
    },
  },
  'rent-vs-buy': {
    slug: 'rent-vs-buy',
    inputType: 'simple',
    label: 'Rent vs Buy',
    description: 'Compare rent and buy as percentage of income',
    fields: [
      { id: 'rent', label: 'Rent ($)', type: 'number', placeholder: '1500', defaultValue: 1500, required: true, min: 0 },
      { id: 'income', label: 'Monthly Income ($)', type: 'number', placeholder: '5000', defaultValue: 5000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.income > 0 ? (data.rent / data.income) * 100 : 0;
      return { value, label: `Rent as % of income = $${data.rent} / $${data.income} =`, format: 'percent' };
    },
  },
  'expense-ratio': {
    slug: 'expense-ratio',
    inputType: 'simple',
    label: 'Expense Ratio',
    description: 'Calculate expense ratio for funds',
    fields: [
      { id: 'totalCosts', label: 'Total Costs ($)', type: 'number', placeholder: '5000', defaultValue: 5000, required: true, min: 0 },
      { id: 'assets', label: 'Assets ($)', type: 'number', placeholder: '1000000', defaultValue: 1000000, required: true, min: 0 },
    ],
    calculate: (data: any) => {
      const value = data.assets > 0 ? (data.totalCosts / data.assets) * 100 : 0;
      return { value, label: `Expense ratio = $${data.totalCosts} / $${data.assets} =`, format: 'percent' };
    },
  },
  'cagr': {
    slug: 'cagr',
    inputType: 'simple',
    label: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate',
    fields: [
      { id: 'endingValue', label: 'Ending Value ($)', type: 'number', placeholder: '20000', defaultValue: 20000, required: true, min: 0 },
      { id: 'beginningValue', label: 'Beginning Value ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
      { id: 'years', label: 'Years', type: 'number', placeholder: '5', defaultValue: 5, required: true, min: 1, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.beginningValue > 0 ? (Math.pow(data.endingValue / data.beginningValue, 1 / data.years) - 1) * 100 : 0;
      return { value, label: `CAGR from $${data.beginningValue} to $${data.endingValue} over ${data.years} years =`, format: 'percent' };
    },
  },
  'margin-call': {
    slug: 'margin-call',
    inputType: 'simple',
    label: 'Margin Call Calculator',
    description: 'Calculate margin call price',
    fields: [
      { id: 'entryPrice', label: 'Entry Price ($)', type: 'number', placeholder: '100', defaultValue: 100, required: true, min: 0 },
      { id: 'maintenanceMargin', label: 'Maintenance Margin (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0, max: 100 },
      { id: 'leverage', label: 'Leverage', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 1 },
    ],
    calculate: (data: any) => {
      const value = data.entryPrice * (1 - (data.maintenanceMargin / 100) / data.leverage);
      return { value, label: `Margin call price =`, format: 'currency' };
    },
  },
  'dcf': {
    slug: 'dcf',
    inputType: 'simple',
    label: 'DCF Calculator',
    description: 'Calculate Discounted Cash Flow',
    fields: [
      { id: 'futureCashFlow', label: 'Future Cash Flow ($)', type: 'number', placeholder: '10000', defaultValue: 10000, required: true, min: 0 },
      { id: 'discountRate', label: 'Discount Rate (%)', type: 'number', placeholder: '10', defaultValue: 10, required: true, min: 0, max: 100 },
      { id: 'years', label: 'Years', type: 'number', placeholder: '5', defaultValue: 5, required: true, min: 1, max: 100 },
    ],
    calculate: (data: any) => {
      const value = data.futureCashFlow / Math.pow(1 + (data.discountRate / 100), data.years);
      return { value, label: `Discounted cash flow =`, format: 'currency' };
    },
  },
  'bmr': {
    slug: 'bmr',
    inputType: 'simple',
    label: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate',
    fields: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '75', defaultValue: 75, required: true, min: 0 },
      { id: 'height', label: 'Height (cm)', type: 'number', placeholder: '175', defaultValue: 175, required: true, min: 0 },
      { id: 'age', label: 'Age (years)', type: 'number', placeholder: '30', defaultValue: 30, required: true, min: 1, max: 120 },
    ],
    calculate: (data: any) => {
      const value = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
      return { value, label: `BMR (Mifflin-St Jeor) =`, format: 'number' };
    },
  },
  'calorie-burn': {
    slug: 'calorie-burn',
    inputType: 'simple',
    label: 'Calorie Burn Calculator',
    description: 'Estimate calories burned during exercise',
    fields: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '75', defaultValue: 75, required: true, min: 0 },
      { id: 'duration', label: 'Duration (hours)', type: 'number', placeholder: '0.5', defaultValue: 0.5, required: true, min: 0, step: 0.1 },
      { id: 'met', label: 'MET Value', type: 'number', placeholder: '3.5', defaultValue: 3.5, required: true, min: 0, step: 0.1 },
    ],
    calculate: (data: any) => {
      const value = data.met * data.weight * data.duration;
      return { value, label: `Calories burned (MET ${data.met}) =`, format: 'number' };
    },
  },
};

// ============================================================
// 2. LIST TOOLS (Dynamic add/remove rows)
// ============================================================

const listTools: Record<string, ToolSchema> = {
  'gpa': {
    slug: 'gpa',
    inputType: 'list',
    label: 'GPA Calculator',
    description: 'Calculate your Grade Point Average from multiple courses with letter grades',
    listFields: [
      { 
        id: 'courseName', 
        label: 'Course Name', 
        type: 'text', 
        placeholder: 'Mathematics 101',
        required: false 
      },
      { 
        id: 'units', 
        label: 'Credits/Units', 
        type: 'number', 
        placeholder: '3',
        defaultValue: 3,
        required: true, 
        min: 0.5, 
        max: 10,
        step: 0.5
      },
      { 
        id: 'grade', 
        label: 'Grade', 
        type: 'select',
        options: [
          { label: 'A+ (5.0)', value: 'A+' },
          { label: 'A (5.0)', value: 'A' },
          { label: 'A- (4.7)', value: 'A-' },
          { label: 'B+ (4.3)', value: 'B+' },
          { label: 'B (4.0)', value: 'B' },
          { label: 'B- (3.7)', value: 'B-' },
          { label: 'C+ (3.3)', value: 'C+' },
          { label: 'C (3.0)', value: 'C' },
          { label: 'C- (2.7)', value: 'C-' },
          { label: 'D+ (2.3)', value: 'D+' },
          { label: 'D (2.0)', value: 'D' },
          { label: 'D- (1.7)', value: 'D-' },
          { label: 'E (1.0)', value: 'E' },
          { label: 'F (0.0)', value: 'F' },
        ],
        defaultValue: 'A',
        required: true 
      },
    ],
    minRows: 1,
    maxRows: 30,
    defaultRows: 4,
    calculate: (data: any) => {
      const gradePoints: Record<string, number> = {
        'A+': 5.0, 'A': 5.0, 'A-': 4.7,
        'B+': 4.3, 'B': 4.0, 'B-': 3.7,
        'C+': 3.3, 'C': 3.0, 'C-': 2.7,
        'D+': 2.3, 'D': 2.0, 'D-': 1.7,
        'E': 1.0, 'F': 0.0,
      };
      
      const courses = data.courses || data.assignments || [];
      let totalPoints = 0;
      let totalUnits = 0;
      
      for (const course of courses) {
        const units = parseFloat(course.units) || 0;
        const grade = course.grade || 'F';
        if (units <= 0) continue;
        totalPoints += units * (gradePoints[grade] || 0);
        totalUnits += units;
      }
      
      const value = totalUnits > 0 ? totalPoints / totalUnits : 0;
      return { value, label: `GPA = ${totalPoints} / ${totalUnits}`, format: 'number' };
    },
  },
  'grade': {
    slug: 'grade',
    inputType: 'list',
    label: 'Grade Calculator',
    description: 'Calculate your overall grade from multiple assignments',
    listFields: [
      { id: 'assignmentName', label: 'Assignment', type: 'text', placeholder: 'Exam 1', required: true },
      { id: 'score', label: 'Score (%)', type: 'number', placeholder: '85', defaultValue: 85, required: true, min: 0, max: 100 },
      { id: 'weight', label: 'Weight (%)', type: 'number', placeholder: '25', defaultValue: 25, required: true, min: 0, max: 100 },
    ],
    minRows: 1,
    maxRows: 20,
    defaultRows: 4,
    calculate: (data: any) => {
      const assignments = data.assignments || [];
      let totalWeighted = 0;
      let totalWeight = 0;
      assignments.forEach((a: any) => {
        const weight = parseFloat(a.weight) || 0;
        const score = parseFloat(a.score) || 0;
        totalWeighted += (score / 100) * weight;
        totalWeight += weight;
      });
      const value = totalWeight > 0 ? (totalWeighted / totalWeight) * 100 : 0;
      return { value, label: `Overall Grade =`, format: 'number' };
    },
  },
  'weighted-grade': {
    slug: 'weighted-grade',
    inputType: 'list',
    label: 'Weighted Grade Calculator',
    description: 'Calculate weighted grade with multiple assignments',
    listFields: [
      { id: 'assignmentName', label: 'Assignment', type: 'text', placeholder: 'Project', required: true },
      { id: 'score', label: 'Score (%)', type: 'number', placeholder: '90', defaultValue: 90, required: true, min: 0, max: 100 },
      { id: 'weight', label: 'Weight (%)', type: 'number', placeholder: '20', defaultValue: 20, required: true, min: 0, max: 100 },
    ],
    minRows: 1,
    maxRows: 20,
    defaultRows: 4,
    calculate: (data: any) => {
      const assignments = data.assignments || [];
      let total = 0;
      let totalWeight = 0;
      assignments.forEach((a: any) => {
        const weight = parseFloat(a.weight) || 0;
        const score = parseFloat(a.score) || 0;
        total += (score / 100) * weight;
        totalWeight += weight;
      });
      const value = totalWeight > 0 ? (total / totalWeight) * 100 : 0;
      return { value, label: `Weighted Grade =`, format: 'number' };
    },
  },
  'final-grade': {
    slug: 'final-grade',
    inputType: 'list',
    label: 'Final Grade Calculator',
    description: 'Calculate what you need on the final exam',
    listFields: [
      { id: 'assignmentName', label: 'Assignment', type: 'text', placeholder: 'Assignment 1', required: true },
      { id: 'score', label: 'Current Score (%)', type: 'number', placeholder: '80', defaultValue: 80, required: true, min: 0, max: 100 },
      { id: 'weight', label: 'Weight (%)', type: 'number', placeholder: '30', defaultValue: 30, required: true, min: 0, max: 100 },
    ],
    minRows: 1,
    maxRows: 20,
    defaultRows: 3,
    calculate: (data: any) => {
      const assignments = data.assignments || [];
      const target = data.targetGrade || 70;
      let currentWeighted = 0;
      let totalWeight = 0;
      assignments.forEach((a: any) => {
        const weight = parseFloat(a.weight) || 0;
        const score = parseFloat(a.score) || 0;
        currentWeighted += (score / 100) * weight;
        totalWeight += weight;
      });
      const finalWeight = 100 - totalWeight;
      const needed = finalWeight > 0 ? ((target - currentWeighted) / finalWeight) * 100 : 0;
      const value = Math.max(0, Math.min(100, needed));
      return { 
        value, 
        label: `You need on the final to get ${target}% =`, 
        format: 'number' 
      };
    },
  },
};

// ============================================================
// 3. COMPLEX TOOLS (sectioned with optional toggles)
// ============================================================

const complexTools: Record<string, ToolSchema> = {
  'compound-interest': {
    slug: 'compound-interest',
    inputType: 'complex',
    label: 'Compound Interest Calculator',
    description: 'See how your money grows with compound interest and additional contributions',
    sections: [
      {
        id: 'main',
        label: 'Investment Details',
        fields: [
          { 
            id: 'principal', 
            label: 'Initial Principal ($)', 
            type: 'number', 
            placeholder: '10000', 
            defaultValue: 10000, 
            required: true, 
            min: 0,
            step: 100
          },
          { 
            id: 'rate', 
            label: 'Annual Interest Rate (%)', 
            type: 'number', 
            placeholder: '5', 
            defaultValue: 5, 
            required: true, 
            min: 0, 
            max: 100,
            step: 0.25
          },
          { 
            id: 'years', 
            label: 'Time Period (years)', 
            type: 'number', 
            placeholder: '10', 
            defaultValue: 10, 
            required: true, 
            min: 0, 
            max: 100,
            step: 1
          },
          { 
            id: 'compounding', 
            label: 'Compounding Frequency', 
            type: 'select',
            options: [
              { label: 'Annually', value: 1 },
              { label: 'Semi-annually', value: 2 },
              { label: 'Quarterly', value: 4 },
              { label: 'Monthly', value: 12 },
              { label: 'Weekly', value: 52 },
              { label: 'Daily', value: 365 },
            ],
            defaultValue: 12,
            required: true 
          },
        ],
      },
      {
        id: 'extra',
        label: 'Additional Contributions',
        optional: true,
        toggleLabel: 'Add regular contributions?',
        fields: [
          { 
            id: 'monthlyDeposit', 
            label: 'Monthly Deposit ($)', 
            type: 'number', 
            placeholder: '100', 
            defaultValue: 100, 
            required: false, 
            min: 0,
            step: 10
          },
        ],
      },
    ],
    calculate: (data: any) => {
      const principal = data.principal || 0;
      const rate = data.rate || 0;
      const years = data.years || 0;
      const compounding = data.compounding || 12;
      const monthlyDeposit = data.monthlyDeposit || 0;
      
      let amount = principal * Math.pow(1 + (rate/100)/compounding, compounding * years);
      if (monthlyDeposit > 0) {
        const monthlyRate = (rate/100) / compounding;
        const totalMonths = years * compounding;
        if (monthlyRate > 0) {
          amount += monthlyDeposit * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        } else {
          amount += monthlyDeposit * totalMonths;
        }
      }
      return { value: amount, label: `Total amount after ${years} years`, format: 'currency' };
    },
  },
  'loan-interest': {
    slug: 'loan-interest',
    inputType: 'complex',
    label: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and total payment',
    sections: [
      {
        id: 'main',
        label: 'Loan Details',
        fields: [
          { 
            id: 'principal', 
            label: 'Loan Amount ($)', 
            type: 'number', 
            placeholder: '50000', 
            defaultValue: 50000, 
            required: true, 
            min: 0,
            step: 1000
          },
          { 
            id: 'rate', 
            label: 'Annual Interest Rate (%)', 
            type: 'number', 
            placeholder: '5', 
            defaultValue: 5, 
            required: true, 
            min: 0, 
            max: 100,
            step: 0.25
          },
          { 
            id: 'years', 
            label: 'Loan Term (years)', 
            type: 'number', 
            placeholder: '5', 
            defaultValue: 5, 
            required: true, 
            min: 0, 
            max: 50,
            step: 1
          },
          { 
            id: 'frequency', 
            label: 'Payment Frequency', 
            type: 'select',
            options: [
              { label: 'Monthly (12/year)', value: 12 },
              { label: 'Bi-weekly (26/year)', value: 26 },
              { label: 'Weekly (52/year)', value: 52 },
            ],
            defaultValue: 12,
            required: true 
          },
        ],
      },
      {
        id: 'extra',
        label: 'Extra Payments',
        optional: true,
        toggleLabel: 'Make extra payments?',
        fields: [
          { 
            id: 'extraPayment', 
            label: 'Extra Payment per Period ($)', 
            type: 'number', 
            placeholder: '100', 
            defaultValue: 100, 
            required: false, 
            min: 0,
            step: 10
          },
        ],
      },
    ],
    calculate: (data: any) => {
      const principal = data.principal || 0;
      const rate = (data.rate || 0) / 100;
      const years = data.years || 0;
      const frequency = data.frequency || 12;
      const extraPayment = data.extraPayment || 0;
      
      const totalPayments = years * frequency;
      const periodRate = rate / frequency;
      
      let monthlyPayment;
      if (principal <= 0) {
        monthlyPayment = 0;
      } else if (periodRate === 0) {
        monthlyPayment = principal / totalPayments;
      } else {
        monthlyPayment = principal * (periodRate * Math.pow(1 + periodRate, totalPayments)) / (Math.pow(1 + periodRate, totalPayments) - 1);
      }
      
      const value = monthlyPayment + extraPayment;
      const frequencyLabels: Record<number, string> = { 12: 'monthly', 26: 'bi-weekly', 52: 'weekly' };
      const label = `${frequencyLabels[frequency] || 'periodic'} payment (with extra) =`;
      return { value, label, format: 'currency' };
    },
  },
  'mortgage': {
    slug: 'mortgage',
    inputType: 'complex',
    label: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment and total interest',
    sections: [
      {
        id: 'main',
        label: 'Mortgage Details',
        fields: [
          { 
            id: 'homePrice', 
            label: 'Home Price ($)', 
            type: 'number', 
            placeholder: '300000', 
            defaultValue: 300000, 
            required: true, 
            min: 0,
            step: 10000
          },
          { 
            id: 'downPayment', 
            label: 'Down Payment ($)', 
            type: 'number', 
            placeholder: '60000', 
            defaultValue: 60000, 
            required: true, 
            min: 0,
            step: 1000
          },
          { 
            id: 'rate', 
            label: 'Annual Interest Rate (%)', 
            type: 'number', 
            placeholder: '6', 
            defaultValue: 6, 
            required: true, 
            min: 0, 
            max: 100,
            step: 0.125
          },
          { 
            id: 'years', 
            label: 'Loan Term (years)', 
            type: 'number', 
            placeholder: '30', 
            defaultValue: 30, 
            required: true, 
            min: 0, 
            max: 50,
            step: 1
          },
          { 
            id: 'propertyTax', 
            label: 'Annual Property Tax ($)', 
            type: 'number', 
            placeholder: '3000', 
            defaultValue: 3000, 
            required: false, 
            min: 0,
            step: 100
          },
        ],
      },
    ],
    calculate: (data: any) => {
      const homePrice = data.homePrice || 0;
      const downPayment = data.downPayment || 0;
      const principal = homePrice - downPayment;
      const rate = (data.rate || 0) / 100 / 12;
      const years = data.years || 0;
      const propertyTax = (data.propertyTax || 0) / 12;
      const totalPayments = years * 12;
      
      let monthlyPayment;
      if (principal <= 0) {
        monthlyPayment = 0;
      } else if (rate === 0) {
        monthlyPayment = principal / totalPayments;
      } else {
        monthlyPayment = principal * (rate * Math.pow(1 + rate, totalPayments)) / (Math.pow(1 + rate, totalPayments) - 1);
      }
      
      const value = monthlyPayment + propertyTax;
      const label = `Monthly payment (including property tax) =`;
      return { value, label, format: 'currency' };
    },
  },
};

// ============================================================
// 4. BMI - Enhanced with Category
// ============================================================

const bmiSchema: ToolSchema = {
  slug: 'bmi',
  inputType: 'simple',
  label: 'BMI Calculator',
  description: 'Calculate your Body Mass Index and see your weight category',
  fields: [
    { 
      id: 'weight', 
      label: 'Weight (kg)', 
      type: 'number', 
      placeholder: '75', 
      defaultValue: 75, 
      required: true, 
      min: 20, 
      max: 400,
      step: 0.5
    },
    { 
      id: 'height', 
      label: 'Height (cm)', 
      type: 'number', 
      placeholder: '175', 
      defaultValue: 175, 
      required: true, 
      min: 50, 
      max: 300,
      step: 0.5
    },
  ],
  calculate: (data: any) => {
    const weight = data.weight || 0;
    const heightCm = data.height || 0;
    const heightM = heightCm / 100;
    const value = heightM > 0 ? weight / (heightM * heightM) : 0;
    
    let category = '';
    if (value < 18.5) category = 'Underweight';
    else if (value < 25) category = 'Normal weight';
    else if (value < 30) category = 'Overweight';
    else category = 'Obese';
    
    return { 
      value, 
      label: `BMI: ${value.toFixed(1)} - ${category}`,
      format: 'number'
    };
  },
};

// ============================================================
// 5. COMBINED EXPORT
// ============================================================

export const toolSchemas: Record<string, ToolSchema> = {
  // Simple tools
  ...simpleTools,
  // Override BMI with enhanced version
  'bmi': bmiSchema,
  // List tools
  ...listTools,
  // Complex tools
  ...complexTools,
};

export function getToolSchema(slug: string): ToolSchema | undefined {
  return toolSchemas[slug];
}

export function getAllToolSlugs(): string[] {
  return Object.keys(toolSchemas);
}