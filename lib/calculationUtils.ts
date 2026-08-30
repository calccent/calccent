// lib/calculationUtils.ts
export type ResultFormat = 'currency' | 'percent' | 'number' | 'none';

export const formatResult = (value: string | number, format: ResultFormat): string => {
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