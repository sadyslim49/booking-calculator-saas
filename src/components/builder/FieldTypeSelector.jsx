import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { fieldTypes } from '@/components/builder/fieldTypes';

const FieldTypeSelector = ({ selectedFieldType, onFieldTypeChange, onAddField, disabled }) => {
  return (
    <div className="flex items-end space-x-3">
      <div className="flex-grow">
        <Label htmlFor="fieldType" className="text-lg font-medium">Add New Field</Label>
        <Select value={selectedFieldType} onValueChange={onFieldTypeChange} disabled={disabled}>
          <SelectTrigger className="w-full mt-1 text-base p-3 h-auto">
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map(ft => (
              <SelectItem key={ft.id} value={ft.id} className="text-base py-2">
                <div className="flex items-center">{ft.icon} {ft.name}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onAddField} size="lg" className="h-auto py-3" disabled={disabled}>
        <PlusCircle className="w-5 h-5 mr-2" /> Add Field
      </Button>
    </div>
  );
};

export default FieldTypeSelector;