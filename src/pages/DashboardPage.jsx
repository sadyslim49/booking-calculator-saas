import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ListOrdered, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import CalculatorList from '@/components/dashboard/CalculatorList';
import SubmissionList from '@/components/dashboard/SubmissionList';
import SubmissionDetailsModal from '@/components/dashboard/SubmissionDetailsModal';

const DashboardPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [calculators, setCalculators] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (submissionsError) throw submissionsError;
      setSubmissions(submissionsData || []);

      const { data: calculatorsData, error: calculatorsError } = await supabase
        .from('calculators')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (calculatorsError) throw calculatorsError;
      setCalculators(calculatorsData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({ title: "Error", description: `Could not load dashboard data: ${error.message}`, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleDeleteSubmission = async (submissionId) => {
    const { error } = await supabase.from('submissions').delete().eq('id', submissionId);
    if (error) {
      toast({ title: "Error Deleting Submission", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Submission Deleted", description: "The booking submission has been removed." });
      setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
      setSelectedSubmission(null);
    }
  };

  const handleDeleteCalculator = async (calculatorId) => {
    const { error } = await supabase.from('calculators').delete().eq('id', calculatorId);
    if (error) {
      toast({ title: "Error Deleting Calculator", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Calculator Deleted", description: "The calculator and its submissions have been removed." });
      setCalculators(prev => prev.filter(calc => calc.id !== calculatorId));
      fetchDashboardData(); 
    }
  };

  const copyBookingLink = (calculatorId) => {
    const link = `${window.location.origin}/book/${calculatorId}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        toast({ title: "Link Copied!", description: "Booking link copied to clipboard." });
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
      });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><Loader2 className="h-12 w-12 animate-spin text-primary" /> <span className="ml-4 text-lg">Loading dashboard...</span></div>;
  }

  return (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary flex items-center">
          <ListOrdered className="w-10 h-10 mr-3 text-primary" /> Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Manage your calculators and view booking submissions.</p>
      </motion.div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-primary">My Calculators</h2>
          <Button asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg">
            <Link to="/build">Create New Calculator</Link>
          </Button>
        </div>
        <CalculatorList 
          calculators={calculators} 
          onDeleteCalculator={handleDeleteCalculator}
          onCopyLink={copyBookingLink}
        />
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-primary mb-6">Booking Submissions</h2>
        <SubmissionList
          submissions={submissions}
          calculators={calculators}
          onSelectSubmission={setSelectedSubmission}
          onDeleteSubmission={handleDeleteSubmission}
        />
      </div>

      <SubmissionDetailsModal
        submission={selectedSubmission}
        calculators={calculators}
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
};

export default DashboardPage;