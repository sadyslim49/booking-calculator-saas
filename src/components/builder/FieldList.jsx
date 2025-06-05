import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SortableItem } from '@/components/builder/SortableItem';
import FieldSettings from '@/components/builder/FieldSettings';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { fieldTypes } from '@/components/builder/fieldTypes';

const FieldList = ({ fields, updateField, removeField, addOption, updateOption, removeOption, disabled }) => {
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {fields.map((field) => (
          <SortableItem key={field.id} id={field.id}>
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
                  <CardTitle className="text-lg flex items-center">
                    {fieldTypes.find(f => f.id === field.type)?.icon}
                    {field.label || `New ${fieldTypes.find(f => f.id === field.type)?.name}`}
                    <span className="ml-2 text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">{fieldTypes.find(f => f.id === field.type)?.name}</span>
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => removeField(field.id)} disabled={disabled}>
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <FieldSettings 
                    field={field} 
                    updateField={updateField} 
                    addOption={addOption} 
                    updateOption={updateOption} 
                    removeOption={removeOption}
                    disabled={disabled}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </SortableItem>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FieldList;