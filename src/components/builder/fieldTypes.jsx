import React from 'react';
import { Type, ListChecks, CalendarDays, Hash, MessageSquare, ToggleLeft } from 'lucide-react';

export const fieldTypes = [
  { id: 'text', name: 'Text Input', icon: <Type className="w-4 h-4 mr-2" /> },
  { id: 'textarea', name: 'Text Area', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  { id: 'number', name: 'Number Input', icon: <Hash className="w-4 h-4 mr-2" /> },
  { id: 'select', name: 'Dropdown Select', icon: <ListChecks className="w-4 h-4 mr-2" /> },
  { id: 'radio', name: 'Radio Buttons', icon: <ListChecks className="w-4 h-4 mr-2" /> },
  { id: 'checkbox', name: 'Checkbox', icon: <ListChecks className="w-4 h-4 mr-2" /> },
  { id: 'date', name: 'Date Picker', icon: <CalendarDays className="w-4 h-4 mr-2" /> },
  { id: 'switch', name: 'Switch Toggle', icon: <ToggleLeft className="w-4 h-4 mr-2" /> },
];