import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getFieldLabel, formatFieldValue } from '@/lib/dashboardUtils';

const SubmissionDetailsModal = ({ submission, calculators, isOpen, onClose }) => {
  if (!submission) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-lg w-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-primary">{submission.calculator_name || 'Submission Details'}</AlertDialogTitle>
          <AlertDialogDescription>
            Submitted on: {new Date(submission.submitted_at).toLocaleString()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3 my-4 custom-scrollbar">
          {Object.entries(submission.data).map(([key, value]) => (
            <div key={key} className="border-b pb-2">
              <p className="font-semibold text-foreground text-md">{getFieldLabel(submission.calculator_id, key, calculators)}</p>
              <p className="text-muted-foreground text-sm">{formatFieldValue(submission.calculator_id, key, value, calculators)}</p>
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmissionDetailsModal;