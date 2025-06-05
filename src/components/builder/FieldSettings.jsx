import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  Trash2,
  Refrigerator,
  Archive,
  CookingPot,
  Umbrella,
  GlassWater,
  Dog,
  Minus,
  Warehouse,
  AppWindow,
  WashingMachine,
  RectangleVertical,
  ListChecks // Fallback icon, or if needed
} from 'lucide-react';
import { motion } from 'framer-motion';

const FieldSettings = ({ field, updateField, addOption, updateOption, removeOption, disabled }) => {
  return (
    <motion.div 
      key={field.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3 p-4 border border-dashed border-primary/50 rounded-md bg-primary/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`label-${field.id}`}>Field Label</Label>
          <Input 
            id={`label-${field.id}`} 
            value={field.label} 
            onChange={(e) => updateField(field.id, { label: e.target.value })} 
            placeholder="E.g., Your Name" 
            disabled={disabled}
          />
        </div>
        {(field.type === 'text' || field.type === 'textarea' || field.type === 'number') && (
          <div>
            <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
            <Input 
              id={`placeholder-${field.id}`} 
              value={field.placeholder} 
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })} 
              placeholder="E.g., John Doe" 
              disabled={disabled}
            />
          </div>
        )}
      </div>
      
      {(field.type === 'select' || field.type === 'radio') && (
        <div className="space-y-2">
          <Label>Options</Label>
          {field.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                value={option.label} 
                onChange={(e) => updateOption(field.id, index, { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '-') })} 
                placeholder="Option Label" 
                className="flex-grow"
                disabled={disabled}
              />
              <Button variant="ghost" size="icon" onClick={() => removeOption(field.id, index)} disabled={disabled}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addOption(field.id)} disabled={disabled}>
            <PlusCircle className="w-4 h-4 mr-2" />Add Option
          </Button>
        </div>
      )}

      {field.type === 'additional-cleaning-services' && field.options && (
        <div className="space-y-2">
          <Label>Select Services</Label>
          {field.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3">
              <Checkbox
                id={`${field.id}-${option.id}`}
                checked={!!(field.selectedOptions && field.selectedOptions[option.id])}
                onCheckedChange={(checked) => {
                  const newSelectedOptions = {
                    ...(field.selectedOptions || {}),
                    [option.id]: Boolean(checked),
                  };
                  updateField(field.id, { selectedOptions: newSelectedOptions });
                }}
                disabled={disabled}
              />
              {/* The option.icon is already a React element from fieldTypes.jsx */}
              {option.icon}
              <Label htmlFor={`${field.id}-${option.id}`} className="font-normal">
                {option.name}
              </Label>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id={`required-${field.id}`} 
          checked={field.required} 
          onCheckedChange={(checked) => updateField(field.id, { required: Boolean(checked) })} 
          disabled={disabled}
        />
        <Label htmlFor={`required-${field.id}`}>Required</Label>
      </div>
    </motion.div>
  );
};

export default FieldSettings;