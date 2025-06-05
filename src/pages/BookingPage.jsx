import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Send, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Switch } from '@/components/ui/switch';

const BookingPage = () => {
  const { calculatorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [calculator, setCalculator] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCalculator = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('calculators')
        .select('*, user_id ( email )') // Assuming you have a user_id FK on calculators table pointing to auth.users.id
        .eq('id', calculatorId)
        .single();

      if (error) {
        console.error('Error fetching calculator:', error);
        toast({ title: "Error", description: "Could not load the calculator.", variant: "destructive" });
        setCalculator(null);
      } else if (data) {
        setCalculator(data);
        const initialFormData = {};
        data.fields.forEach(field => {
          initialFormData[field.id || field.label.toLowerCase().replace(/\s+/g, '_')] = field.type === 'checkbox' || field.type === 'switch' ? false : '';
        });
        setFormData(initialFormData);
      }
      setIsLoading(false);
    };

    if (calculatorId) {
      fetchCalculator();
    }
  }, [calculatorId, toast]);

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    for (const field of calculator.fields) {
      const fieldKey = field.id || field.label.toLowerCase().replace(/\s+/g, '_');
      if (field.required && !formData[fieldKey]) {
         if ((field.type === 'checkbox' || field.type === 'switch') && formData[fieldKey] === false) {
            if (field.required && formData[fieldKey] === false) {
              toast({ title: "Validation Error", description: `${field.label} must be checked.`, variant: "destructive" });
              setIsSubmitting(false);
              return;
            }
         } else if (!formData[fieldKey]) {
             toast({ title: "Validation Error", description: `${field.label} is required.`, variant: "destructive" });
             setIsSubmitting(false);
             return;
         }
      }
    }

    const submissionPayload = {
      calculator_id: calculator.id,
      calculator_name: calculator.name,
      data: formData,
      submitted_at: new Date().toISOString(), // Add submitted_at here for the email function
    };

    const { data: submissionResult, error: submissionError } = await supabase
      .from('submissions')
      .insert([ { calculator_id: submissionPayload.calculator_id, calculator_name: submissionPayload.calculator_name, data: submissionPayload.data } ]) // Don't insert submitted_at as DB handles it
      .select()
      .single();


    if (submissionError) {
      console.error('Error submitting booking:', submissionError);
      toast({ title: "Submission Error", description: submissionError.message, variant: "destructive" });
      setIsSubmitting(false);
    } else {
      toast({ title: "Booking Submitted!", description: "Your booking request has been sent." });
      
      // Attempt to send email notification
      // In a real app, ownerEmail should be securely fetched, not assumed from client-side calculator data if not properly joined
      // For this example, we'll assume calculator.user_id.email exists if you joined user data
      // Or, you might have a dedicated 'owner_email' field on the 'calculators' table.
      // For now, using a placeholder or a hardcoded admin email for testing.
      const ownerEmail = "admin@example.com"; // Replace with actual logic to get owner's email

      try {
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-booking-email', {
          body: JSON.stringify({ submissionData: submissionPayload, ownerEmail }),
        });

        if (emailError) throw emailError;
        console.log('Email function response:', emailData);
        toast({ title: "Notification Sent (Simulated)", description: "The business owner has been notified.", duration: 4000 });
      } catch (error) {
        console.error('Failed to send email notification:', error);
        toast({ title: "Notification Error", description: "Could not send email notification to owner (simulated).", variant: "destructive", duration: 5000 });
      }
      
      navigate('/dashboard'); // Or a thank you page
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><Loader2 className="h-12 w-12 animate-spin text-primary" /> <span className="ml-4 text-lg">Loading calculator...</span></div>;
  }

  if (!calculator) {
    return (
      <Card className="max-w-lg mx-auto mt-10 text-center shadow-xl glassmorphic">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center justify-center"><AlertTriangle className="w-8 h-8 mr-2" />Calculator Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The booking calculator (ID: {calculatorId}) you are looking for does not exist or could not be loaded.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/')} className="w-full">Go to Homepage</Button>
        </CardFooter>
      </Card>
    );
  }

  const renderField = (field) => {
    const fieldKey = field.id || field.label.toLowerCase().replace(/\s+/g, '_');
    const commonProps = {
      id: fieldKey,
      value: formData[fieldKey],
      placeholder: field.placeholder,
      required: field.required,
      disabled: isSubmitting,
    };
    
    const handleFieldChange = (value) => handleInputChange(fieldKey, value);

    return (
      <motion.div 
        key={fieldKey} 
        className="space-y-2 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Label htmlFor={fieldKey} className="text-md font-medium text-foreground">
          {field.label} {field.required && <span className="text-destructive">*</span>}
        </Label>
        {field.type === 'text' && <Input {...commonProps} type="text" onChange={(e) => handleFieldChange(e.target.value)} />}
        {field.type === 'textarea' && <Textarea {...commonProps} onChange={(e) => handleFieldChange(e.target.value)} />}
        {field.type === 'number' && <Input {...commonProps} type="number" onChange={(e) => handleFieldChange(e.target.value)} />}
        {field.type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <Checkbox id={fieldKey} checked={!!formData[fieldKey]} onCheckedChange={handleFieldChange} disabled={isSubmitting} />
            <Label htmlFor={fieldKey} className="font-normal">{field.description || "Confirm"}</Label>
          </div>
        )}
        {field.type === 'switch' && (
           <div className="flex items-center space-x-2">
             <Switch id={fieldKey} checked={!!formData[fieldKey]} onCheckedChange={handleFieldChange} disabled={isSubmitting} />
             <Label htmlFor={fieldKey} className="font-normal">{field.description || field.label}</Label>
           </div>
        )}
        {field.type === 'select' && (
          <Select onValueChange={handleFieldChange} value={formData[fieldKey] || ''} disabled={isSubmitting}>
            <SelectTrigger><SelectValue placeholder={field.placeholder || "Select an option"} /></SelectTrigger>
            <SelectContent>
              {field.options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
        {field.type === 'radio' && (
          <RadioGroup onValueChange={handleFieldChange} value={formData[fieldKey] || ''} className="flex flex-col space-y-1" disabled={isSubmitting}>
            {field.options.map(opt => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`${fieldKey}-${opt.value}`} />
                <Label htmlFor={`${fieldKey}-${opt.value}`} className="font-normal">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {field.type === 'date' && (
          <Calendar
            mode="single"
            selected={formData[fieldKey] ? new Date(formData[fieldKey]) : undefined}
            onSelect={(date) => handleFieldChange(date ? date.toISOString() : '')}
            className="rounded-md border shadow"
            initialFocus
            disabled={isSubmitting || { before: new Date() } } // Disable past dates
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {calculator.name}
        </h1>
        <p className="text-muted-foreground text-center mb-8">Please fill out the form below to complete your booking.</p>
      </motion.div>
      
      <Card className="shadow-2xl glassmorphic">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {calculator.fields.map(field => renderField(field))}
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;