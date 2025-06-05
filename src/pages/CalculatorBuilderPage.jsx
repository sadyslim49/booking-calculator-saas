import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, Save, Settings2, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { supabase } from '@/lib/supabaseClient';
import FieldList from '@/components/builder/FieldList';
import FieldTypeSelector from '@/components/builder/FieldTypeSelector';
import { fieldTypes } from '@/components/builder/fieldTypes';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const CalculatorBuilderPage = () => {
  const [calculatorName, setCalculatorName] = useState('');
  const [fields, setFields] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState(fieldTypes[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth(); // Get the authenticated user

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const addField = () => {
    const newField = {
      id: Date.now().toString(), // Temporary ID for client-side rendering
      type: selectedFieldType,
      label: `New ${fieldTypes.find(f => f.id === selectedFieldType)?.name || 'Field'}`,
      placeholder: '',
      options: selectedFieldType === 'select' || selectedFieldType === 'radio' ? [{ value: 'option1', label: 'Option 1' }] : [],
      required: false,
    };
    setFields(prevFields => [...prevFields, newField]);
  };

  const updateField = (id, updatedProps) => {
    setFields(prevFields => prevFields.map(field => field.id === id ? { ...field, ...updatedProps } : field));
  };

  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  const addOption = (fieldId) => {
    setFields(prevFields => prevFields.map(field => {
      if (field.id === fieldId) {
        const newOption = { value: `option${field.options.length + 1}`, label: `Option ${field.options.length + 1}` };
        return { ...field, options: [...field.options, newOption] };
      }
      return field;
    }));
  };

  const updateOption = (fieldId, optionIndex, updatedOptionProps) => {
    setFields(prevFields => prevFields.map(field => {
      if (field.id === fieldId) {
        const updatedOptions = field.options.map((opt, idx) => idx === optionIndex ? { ...opt, ...updatedOptionProps } : opt);
        return { ...field, options: updatedOptions };
      }
      return field;
    }));
  };
  
  const removeOption = (fieldId, optionIndex) => {
    setFields(prevFields => prevFields.map(field => {
      if (field.id === fieldId) {
        return { ...field, options: field.options.filter((_, idx) => idx !== optionIndex) };
      }
      return field;
    }));
  };

  const saveCalculator = async () => {
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to save a calculator.", variant: "destructive" });
      return;
    }
    if (!calculatorName.trim()) {
      toast({ title: "Validation Error", description: "Calculator name cannot be empty.", variant: "destructive" });
      return;
    }
    if (fields.length === 0) {
      toast({ title: "Validation Error", description: "Please add at least one field to the calculator.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    // Ensure field IDs are consistent or regenerated if necessary before saving
    const processedFields = fields.map((field, index) => ({
      ...field,
      // If you want to ensure IDs are unique and map to something specific, you can process them here.
      // For simplicity, we're using the client-generated IDs.
      id: field.id || `field_${index}_${Date.now()}` 
    }));

    const calculatorData = { 
      name: calculatorName, 
      fields: processedFields,
      user_id: user.id // Associate calculator with the logged-in user
    };
    
    const { data, error } = await supabase
      .from('calculators')
      .insert([calculatorData])
      .select();

    setIsLoading(false);

    if (error) {
      console.error('Error saving calculator:', error);
      toast({ title: "Error Saving Calculator", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Calculator Saved!", description: `${calculatorName} has been saved successfully.` });
      setCalculatorName('');
      setFields([]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items; 
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary flex items-center">
          <Settings2 className="w-10 h-10 mr-3 text-primary" /> Calculator Builder
        </h1>
        <p className="text-muted-foreground mt-2">Design your custom booking calculator form. Add fields, set options, and save your creation.</p>
      </motion.div>

      <Card className="shadow-xl glassmorphic">
        <CardHeader>
          <CardTitle>Calculator Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="calculatorName" className="text-lg font-medium">Calculator Name</Label>
            <Input 
              id="calculatorName" 
              value={calculatorName} 
              onChange={(e) => setCalculatorName(e.target.value)} 
              placeholder="E.g., Cleaning Service Calculator" 
              className="mt-1 text-base p-3"
              disabled={isLoading}
            />
          </div>
          <FieldTypeSelector
            selectedFieldType={selectedFieldType}
            onFieldTypeChange={setSelectedFieldType}
            onAddField={addField}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Form Fields</h2>
      {fields.length === 0 && (
        <p className="text-muted-foreground text-center py-8">No fields added yet. Start by selecting a field type and clicking "Add Field".</p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
          <FieldList
            fields={fields}
            updateField={updateField}
            removeField={removeField}
            addOption={addOption}
            updateOption={updateOption}
            removeOption={removeOption}
            disabled={isLoading}
          />
        </SortableContext>
      </DndContext>

      {fields.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex justify-end">
          <Button 
            size="lg" 
            onClick={saveCalculator} 
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-500/90 hover:to-emerald-600/90 text-white shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            {isLoading ? 'Saving...' : 'Save Calculator'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CalculatorBuilderPage;