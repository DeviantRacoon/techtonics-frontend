import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, Printer, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ShiftData {
  shiftStartTime: string;
  shiftEndTime: string;
  employeeName: string;
  startingCash: number;
  totalSalesGross: number;
  discountsApplied: number;
  taxesCollected: number;
  expectedCashPayments: number;
  expectedCardPayments: number;
  expectedDigitalPayments: number;
}

interface Denomination {
  value: number;
  label: string;
  type: 'bill' | 'coin';
  quantity: number;
}

const CashRegisterClosing: React.FC = () => {
  // Mock shift data - in real app, this would come from props or API
  const [shiftData] = useState<ShiftData>({
    shiftStartTime: '2024-01-15 08:00:00',
    shiftEndTime: '2024-01-15 16:00:00',
    employeeName: 'María González',
    startingCash: 500.00,
    totalSalesGross: 2450.75,
    discountsApplied: 125.50,
    taxesCollected: 372.84,
    expectedCashPayments: 1200.50,
    expectedCardPayments: 950.25,
    expectedDigitalPayments: 300.00
  });

  const [denominations, setDenominations] = useState<Denomination[]>([
    { value: 1000, label: '$1,000', type: 'bill', quantity: 0 },
    { value: 500, label: '$500', type: 'bill', quantity: 0 },
    { value: 200, label: '$200', type: 'bill', quantity: 0 },
    { value: 100, label: '$100', type: 'bill', quantity: 0 },
    { value: 50, label: '$50', type: 'bill', quantity: 0 },
    { value: 20, label: '$20', type: 'bill', quantity: 0 },
    { value: 10, label: '$10', type: 'coin', quantity: 0 },
    { value: 5, label: '$5', type: 'coin', quantity: 0 },
    { value: 2, label: '$2', type: 'coin', quantity: 0 },
    { value: 1, label: '$1', type: 'coin', quantity: 0 },
    { value: 0.5, label: '$0.50', type: 'coin', quantity: 0 }
  ]);

  const [notes, setNotes] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calculations
  const netSales = shiftData.totalSalesGross - shiftData.discountsApplied;
  const expectedTotalInDrawer = shiftData.startingCash + shiftData.expectedCashPayments;
  const totalCountedCash = denominations.reduce((sum, denom) => sum + (denom.value * denom.quantity), 0);
  const difference = totalCountedCash - expectedTotalInDrawer;
  const hasCounted = denominations.some(d => d.quantity > 0);

  const updateDenomination = (index: number, quantity: number) => {
    const newDenominations = [...denominations];
    newDenominations[index].quantity = Math.max(0, quantity);
    setDenominations(newDenominations);
  };

  const getDifferenceStatus = () => {
    if (difference === 0) return { color: 'text-green-600 bg-green-50', icon: CheckCircle, label: 'Balanced', status: 'success' };
    if (difference > 0) return { color: 'text-blue-600 bg-blue-50', icon: TrendingUp, label: 'Surplus', status: 'surplus' };
    return { color: 'text-red-600 bg-red-50', icon: TrendingDown, label: 'Shortage', status: 'shortage' };
  };

  const handleCloseShift = () => {
    if (!hasCounted) return;
    setShowConfirmation(true);
  };

  const confirmCloseShift = () => {
    setIsClosing(true);
    // Simulate API call
    setTimeout(() => {
      alert('Shift closed successfully!');
      setIsClosing(false);
      setShowConfirmation(false);
    }, 2000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const differenceStatus = getDifferenceStatus();
  const DifferenceIcon = differenceStatus.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cash Register Closing</h1>
              <p className="text-gray-600 mt-1">End of shift reconciliation and cash counting</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Shift in Progress
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - System Data (Read-Only) */}
          <div className="xl:col-span-1 space-y-6">
            {/* Shift Information */}
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Shift Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee:</span>
                    <span className="font-semibold">{shiftData.employeeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-mono">{new Date(shiftData.shiftStartTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Time:</span>
                    <span className="font-mono">{new Date(shiftData.shiftEndTime).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Summary */}
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Sales Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Cash:</span>
                    <span className="font-mono font-semibold">${shiftData.startingCash.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sales (Gross):</span>
                    <span className="font-mono">${shiftData.totalSalesGross.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discounts Applied:</span>
                    <span className="font-mono text-red-600">-${shiftData.discountsApplied.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes Collected:</span>
                    <span className="font-mono">${shiftData.taxesCollected.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Net Sales:</span>
                    <span className="font-mono">${netSales.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expected Payments */}
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Expected Payments</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cash Payments:</span>
                    <span className="font-mono">${shiftData.expectedCashPayments.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Payments:</span>
                    <span className="font-mono">${shiftData.expectedCardPayments.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Digital Payments:</span>
                    <span className="font-mono">${shiftData.expectedDigitalPayments.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold bg-blue-50 p

</initial_code>