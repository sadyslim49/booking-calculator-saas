import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, FileText, CalendarClock } from 'lucide-react';
import { getFieldLabel, formatFieldValue } from '@/lib/dashboardUtils';


const SubmissionList = ({ submissions, calculators, onSelectSubmission, onDeleteSubmission }) => {
  if (submissions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center py-12 bg-card rounded-lg shadow-md glassmorphic"
      >
        <FileText className="w-20 h-20 mx-auto text-muted-foreground/40 mb-5" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Submissions Yet</h3>
        <p className="text-muted-foreground">When customers submit bookings, they will appear here.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {submissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col glassmorphic">
              <CardHeader>
                <CardTitle className="text-xl text-primary truncate">{submission.calculator_name || 'Booking Submission'}</CardTitle>
                <CardDescription className="flex items-center text-sm">
                  <CalendarClock className="w-4 h-4 mr-2 text-muted-foreground" />
                  Submitted: {new Date(submission.submitted_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-1 text-sm">
                  {Object.entries(submission.data).slice(0, 3).map(([key, value]) => (
                    <li key={key} className="truncate">
                      <span className="font-semibold text-foreground">{getFieldLabel(submission.calculator_id, key, calculators)}: </span>
                      <span className="text-muted-foreground">{formatFieldValue(submission.calculator_id, key, value, calculators)}</span>
                    </li>
                  ))}
                  {Object.keys(submission.data).length > 3 && <li className="text-muted-foreground text-xs">...and more details.</li>}
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => onSelectSubmission(submission)}>
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the submission for "{submission.calculator_name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteSubmission(submission.id)}>
                        Delete Submission
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SubmissionList;