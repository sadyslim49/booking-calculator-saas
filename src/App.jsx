import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/shared/Layout';
import HomePage from '@/pages/HomePage';
import CalculatorBuilderPage from '@/pages/CalculatorBuilderPage';
import BookingPage from '@/pages/BookingPage';
import DashboardPage from '@/pages/DashboardPage';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from '@/components/shared/ProtectedRoute';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/book/:calculatorId" element={<BookingPage />} />
          
          <Route 
            path="/build" 
            element={
              <ProtectedRoute>
                <CalculatorBuilderPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </>
  );
}

export default App;