'use client';
import { useState, useCallback, useEffect } from 'react';
import { ListFieldDefinition } from '@/lib/toolSchemas';

interface ListInputProps {
  fields: ListFieldDefinition[];
  rows: any[];
  onChange: (rows: any[]) => void;
  minRows?: number;
  maxRows?: number;
  defaultRows?: number;
}

export default function ListInput({ 
  fields, 
  rows, 
  onChange, 
  minRows = 1, 
  maxRows = 20,
  defaultRows = 3,
}: ListInputProps) {
  
  // Initialize rows if empty
  useEffect(() => {
    if (rows.length === 0 && defaultRows > 0) {
      const initialRows = [];
      for (let i = 0; i < defaultRows; i++) {
        const newRow: any = {};
        fields.forEach(field => {
          newRow[field.id] = field.defaultValue || (field.type === 'text' ? '' : 0);
        });
        initialRows.push(newRow);
      }
      onChange(initialRows);
    }
  }, [rows.length, defaultRows, fields, onChange]);

  const addRow = useCallback(() => {
    if (rows.length < maxRows) {
      const newRow: any = {};
      fields.forEach(field => {
        newRow[field.id] = field.defaultValue || (field.type === 'text' ? '' : 0);
      });
      onChange([...rows, newRow]);
    }
  }, [rows, maxRows, fields, onChange]);

  const removeRow = useCallback((index: number) => {
    if (rows.length > minRows) {
      const newRows = rows.filter((_, i) => i !== index);
      onChange(newRows);
    }
  }, [rows, minRows, onChange]);

  const updateRow = useCallback((index: number, fieldId: string, value: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [fieldId]: value };
    onChange(newRows);
  }, [rows, onChange]);

  const renderFieldInput = useCallback((row: any, field: ListFieldDefinition, index: number) => {
    const value = row[field.id] ?? '';
    
    if (field.type === 'select' && field.options) {
      return (
        <select
          value={value}
          onChange={(e) => updateRow(index, field.id, 
            field.type === 'number' ? parseFloat(e.target.value) : e.target.value
          )}
          className="w-full p-2 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
        >
          {field.options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type === 'text' ? 'text' : 'number'}
        value={value}
        onChange={(e) => updateRow(index, field.id, 
          field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
        )}
        placeholder={field.placeholder}
        className="w-full p-2 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
      />
    );
  }, [updateRow]);

  // If rows are empty, show loading or placeholder
  if (rows.length === 0) {
    return (
      <div className="text-gray-400 text-sm p-4 text-center">
        Loading input fields...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {fields.map((field) => (
                <th key={field.id} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider p-3 border-b border-gray-200">
                  {field.label}
                </th>
              ))}
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider p-3 border-b border-gray-200 w-12">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                {fields.map((field) => (
                  <td key={field.id} className="p-2 border-b border-gray-100">
                    {renderFieldInput(row, field, index)}
                  </td>
                ))}
                <td className="p-2 border-b border-gray-100 text-center">
                  <button
                    onClick={() => removeRow(index)}
                    disabled={rows.length <= minRows}
                    className={`p-1.5 rounded-lg transition-colors ${
                      rows.length <= minRows 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-red-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                    title="Remove row"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        disabled={rows.length >= maxRows}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
          rows.length >= maxRows
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:shadow-sm'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Row
        {rows.length >= maxRows && <span className="text-xs">(max {maxRows})</span>}
      </button>
      
      <div className="text-xs text-gray-400 mt-1">
        {rows.length} of {maxRows} rows
      </div>
    </div>
  );
}