import React from 'react';
import {
  Type,
  ListChecks,
  CalendarDays,
  Hash,
  MessageSquare,
  ToggleLeft,
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
  CheckSquare, // Default icon
} from 'lucide-react';

export const fieldTypes = [
  { id: 'text', name: 'Text Input', icon: <Type className="w-4 h-4 mr-2" /> },
  { id: 'textarea', name: 'Text Area', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  { id: 'number', name: 'Number Input', icon: <Hash className="w-4 h-4 mr-2" /> },
  { id: 'select', name: 'Dropdown Select', icon: <ListChecks className="w-4 h-4 mr-2" /> },
  { id: 'radio', name: 'Radio Buttons', icon: <ListChecks className="w-4 h-4 mr-2" /> },
  { id: 'checkbox', name: 'Checkbox', icon: <ListChecks className="w-4 h-4 mr-2" /> },
  { id: 'date', name: 'Date Picker', icon: <CalendarDays className="w-4 h-4 mr-2" /> },
  { id: 'switch', name: 'Switch Toggle', icon: <ToggleLeft className="w-4 h-4 mr-2" /> },
  {
    id: 'additional-cleaning-services',
    name: 'Additional Cleaning Services',
    icon: <ListChecks className="w-4 h-4 mr-2" />, // Main icon for the field type
    options: [
      { id: 'refrigerator', name: 'Refrigerator', icon: <Refrigerator className="w-4 h-4 mr-2" /> },
      { id: 'basement', name: 'Basement', icon: <Archive className="w-4 h-4 mr-2" /> },
      { id: 'oven', name: 'Oven', icon: <CookingPot className="w-4 h-4 mr-2" /> },
      { id: 'patio', name: 'Patio', icon: <Umbrella className="w-4 h-4 mr-2" /> },
      { id: 'dishes', name: 'Dishes', icon: <GlassWater className="w-4 h-4 mr-2" /> },
      { id: 'pet', name: 'Pet Hair/Stains', icon: <Dog className="w-4 h-4 mr-2" /> },
      { id: 'baseboard', name: 'Baseboards', icon: <Minus className="w-4 h-4 mr-2" /> },
      { id: 'garage', name: 'Garage', icon: <Warehouse className="w-4 h-4 mr-2" /> },
      { id: 'window', name: 'Windows (Interior)', icon: <AppWindow className="w-4 h-4 mr-2" /> },
      { id: 'dishwasher', name: 'Dishwasher', icon: <WashingMachine className="w-4 h-4 mr-2" /> }, // Using WashingMachine as a placeholder
      { id: 'wall', name: 'Walls', icon: <RectangleVertical className="w-4 h-4 mr-2" /> },
      { id: 'cabinet', name: 'Cabinets (Interior)', icon: <Archive className="w-4 h-4 mr-2" /> },
      { id: 'washer-dryer', name: 'Washer/Dryer', icon: <WashingMachine className="w-4 h-4 mr-2" /> },
      // Example of a service with a default icon if a specific one is not found/suitable
      // { id: 'another-service', name: 'Another Service', icon: <CheckSquare className="w-4 h-4 mr-2" /> },
    ],
    component: 'checkbox-group', // Assuming a component named 'checkbox-group' will handle rendering
  },
];