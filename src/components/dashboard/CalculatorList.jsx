import React from 'react';
import { Link } from 'react-router-dom';
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
import { Edit, Share2, Trash2 } from 'lucide-react';

const CalculatorList = ({ calculators, onDeleteCalculator, onCopyLink }) => {
  if (calculators.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center py-12 bg-card rounded-lg shadow-md glassmorphic"
      >
        <Edit className="w-20 h-20 mx-auto text-muted-foreground/40 mb-5" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Calculators Created Yet</h3>
        <p className="text-muted-foreground">Start by building your first service calculator!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {calculators.map((calculator, index) => (
          <motion.div
            key={calculator.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col glassmorphic">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{calculator.name}</CardTitle>
                <CardDescription className="text-xs">
                  Created: {new Date(calculator.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {calculator.fields?.length || 0} fields.
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-wrap justify-end gap-2">
                 <Button variant="outline" size="sm" onClick={() => onCopyLink(calculator.id)}>
                  <Share2 className="w-4 h-4 mr-2" /> Share Link
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Calculator: {calculator.name}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the calculator and all its associated submissions.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteCalculator(calculator.id)}>
                        Delete Calculator
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

export default CalculatorList;