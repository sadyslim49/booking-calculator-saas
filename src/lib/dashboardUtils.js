import React from 'react';

export const getCalculatorFields = (calculatorId, calculators) => {
  const calculator = calculators.find(c => c.id === calculatorId);
  return calculator ? calculator.fields : [];
};

export const getFieldLabel = (calculatorId, fieldKey, calculators) => {
  const fields = getCalculatorFields(calculatorId, calculators);
  const field = fields.find(f => (f.id || f.label.toLowerCase().replace(/\s+/g, '_')) === fieldKey);
  return field ? field.label : fieldKey;
};

export const formatFieldValue = (calculatorId, fieldKey, value, calculators) => {
  const fields = getCalculatorFields(calculatorId, calculators);
  const field = fields.find(f => (f.id || f.label.toLowerCase().replace(/\s+/g, '_')) === fieldKey);

  if (field && field.type === 'date' && value) {
    try {
      return new Date(value).toLocaleDateString();
    } catch (e) {
      return String(value);
    }
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (field && (field.type === 'select' || field.type === 'radio') && field.options && value) {
    const option = field.options.find(opt => opt.value === value);
    return option ? option.label : value;
  }
  return value || 'N/A';
};