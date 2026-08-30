'use client';
import { useState, useEffect, useCallback } from 'react';
import { ToolSchema, FieldDefinition } from '@/lib/toolSchemas';
import ListInput from './ListInput';

interface DynamicFormProps {
  schema: ToolSchema;
  data: any;
  onChange: (data: any) => void;
}

export default function DynamicForm({ schema, data, onChange }: DynamicFormProps) {
  const [showOptional, setShowOptional] = useState<Record<string, boolean>>({});

  // Initialize optional sections
  useEffect(() => {
    if (schema.sections) {
      const initial: Record<string, boolean> = {};
      schema.sections.forEach((section) => {
        if (section.optional) {
          const hasData = section.fields.some(field => 
            data[field.id] !== undefined && data[field.id] !== field.defaultValue
          );
          initial[section.id] = hasData;
        }
      });
      setShowOptional(initial);
    }
  }, [schema, data]);

  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    onChange({ ...data, [fieldId]: value });
  }, [data, onChange]);

  const handleListChange = useCallback((rows: any[]) => {
    // Determine which list key to use
    const listKey = schema.listFields && schema.listFields.some(f => f.id === 'courseName') 
      ? 'courses' 
      : 'assignments';
    onChange({ ...data, [listKey]: rows });
  }, [data, onChange, schema.listFields]);

  const toggleOptional = useCallback((sectionId: string) => {
    const newValue = !showOptional[sectionId];
    setShowOptional(prev => ({ ...prev, [sectionId]: newValue }));
    
    // When showing, add default values
    if (newValue) {
      const section = schema.sections?.find(s => s.id === sectionId);
      if (section) {
        const newData = { ...data };
        section.fields.forEach(field => {
          if (field.defaultValue !== undefined && data[field.id] === undefined) {
            newData[field.id] = field.defaultValue;
          }
        });
        onChange(newData);
      }
    }
  }, [showOptional, schema.sections, data, onChange]);

  const renderField = useCallback((field: FieldDefinition) => {
    const value = data[field.id] ?? field.defaultValue ?? '';
    
    if (field.type === 'select' && field.options) {
      return (
        <div key={field.id} className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.id, 
              field.type === 'number' ? parseFloat(e.target.value) : e.target.value
            )}
            className="w-full p-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-700 font-medium outline-none appearance-none"
          >
            {field.options.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={field.id} className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => handleFieldChange(field.id, 
            field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
          )}
          placeholder={field.placeholder}
          step={field.step}
          min={field.min}
          max={field.max}
          className="w-full p-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-700 font-medium outline-none"
        />
      </div>
    );
  }, [data, handleFieldChange]);

  // ===== RENDER BASED ON INPUT TYPE =====
  
  // Simple tools
  if (schema.inputType === 'simple' && schema.fields) {
    return (
      <div className="space-y-4">
        {schema.fields.map(field => renderField(field))}
      </div>
    );
  }

  // List-based tools
  if (schema.inputType === 'list' && schema.listFields) {
    const listKey = schema.listFields.some(f => f.id === 'courseName') ? 'courses' : 'assignments';
    const rows = data[listKey] || [];
    
    return (
      <ListInput
        fields={schema.listFields}
        rows={rows}
        onChange={handleListChange}
        minRows={schema.minRows || 1}
        maxRows={schema.maxRows || 20}
        defaultRows={schema.defaultRows || 3}
      />
    );
  }

  // Complex tools
  if (schema.inputType === 'complex' && schema.sections) {
    return (
      <div className="space-y-6">
        {schema.sections.map((section) => {
          const isVisible = section.optional ? showOptional[section.id] : true;
          
          if (section.optional) {
            return (
              <div key={section.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <button
                  onClick={() => toggleOptional(section.id)}
                  className="flex items-center gap-3 w-full text-left font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-lg">{isVisible ? '▼' : '▶'}</span>
                  <span>{section.toggleLabel || section.label}</span>
                </button>
                {isVisible && (
                  <div className="mt-4 space-y-4">
                    {section.fields.map(field => renderField(field))}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <div key={section.id} className="space-y-4">
              <h4 className="font-semibold text-gray-700">{section.label}</h4>
              {section.fields.map(field => renderField(field))}
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="text-gray-500">No input configuration found for this tool.</div>;
}