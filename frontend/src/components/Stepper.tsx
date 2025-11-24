import React, { useState, Children, useEffect } from "react";
import { motion } from "framer-motion";

import type { ReactNode } from "react";

interface StepperProps {
  children: ReactNode;
  initialStep?: number;
  currentStep?: number;
  onStepChange?: (step: number) => boolean | void;
  onFinalStepCompleted?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  customFooter?: (handleBack: () => void, handleNext: () => void) => ReactNode;
  isSuccess?: boolean;
}

export default function Stepper({
  children,
  initialStep = 1,
  currentStep: controlledCurrentStep,
  onStepChange = () => true,
  onFinalStepCompleted = () => {},
  backButtonText = 'Kembali',
  nextButtonText = 'Lanjut',
  disableStepIndicators = false,
  customFooter,
  isSuccess = false,
}: StepperProps) {
  const [internalStep, setInternalStep] = useState<number>(initialStep);
  const currentStepValue = controlledCurrentStep !== undefined ? controlledCurrentStep : internalStep;
  
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStepValue > totalSteps;
  const isLastStep = currentStepValue === totalSteps;

  // ✅ FIX: Update completedSteps when currentStep changes (controlled mode)
  useEffect(() => {
    if (controlledCurrentStep !== undefined && controlledCurrentStep > 1) {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        // Mark all previous steps as completed
        for (let i = 1; i < controlledCurrentStep; i++) {
          newSet.add(i);
        }
        return newSet;
      });
    }
  }, [controlledCurrentStep]);

  useEffect(() => {
    if (isSuccess && currentStepValue === totalSteps) {
      setCompletedSteps(prev => new Set([...prev, totalSteps]));
    }
  }, [isSuccess, currentStepValue, totalSteps]);

  const updateStep = (newStep: number) => {
    // ✅ FIX: Always update completedSteps regardless of controlled/uncontrolled
    if (newStep > currentStepValue) {
      setCompletedSteps(prev => new Set([...prev, currentStepValue]));
    }

    if (newStep < currentStepValue) {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        for (let i = newStep; i <= totalSteps; i++) {
          newSet.delete(i);
        }
        return newSet;
      });
    }

    if (controlledCurrentStep === undefined) {
      setInternalStep(newStep);
    }
    
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    }
  };

  const handleBack = () => {
    if (currentStepValue > 1) {
      const canGoBack = onStepChange(currentStepValue - 1);
      if (canGoBack === false) {
        return;
      }
      updateStep(currentStepValue - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      const canProceed = onStepChange(currentStepValue + 1);
      if (canProceed === false) {
        return;
      }
      updateStep(currentStepValue + 1);
    }
  };

  const handleComplete = () => {
    const canComplete = onStepChange(currentStepValue + 1);
    if (canComplete === false) {
      return;
    }
    
    setCompletedSteps(prev => new Set([...prev, currentStepValue]));
    updateStep(totalSteps + 1);
  };

  return (
    <div className="flex flex-col md:flex-row w-full md:h-auto">
      {/* Vertical Stepper - Left Side - Optimized for smaller width */}
      <div className="flex flex-row md:flex-col items-center justify-center md:justify-evenly px-3 md:px-6 py-4 md:py-6 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 w-full md:w-32 md:min-w-[8rem] gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          const isNotLastStep = index < totalSteps - 1;
          const isStepCompleted = completedSteps.has(stepNumber);
          const isActive = currentStepValue === stepNumber;
          
          return (
            <React.Fragment key={stepNumber}>
              {/* Step Indicator - Reduced size */}
              <button
                onClick={() => {
                  if (!disableStepIndicators && (stepNumber <= currentStepValue || isStepCompleted)) {
                    const canChange = onStepChange(stepNumber);
                    if (canChange !== false) {
                      updateStep(stepNumber);
                    }
                  }
                }}
                disabled={stepNumber > currentStepValue && !isStepCompleted}
                className="flex flex-col items-center gap-1 md:gap-2 relative z-10 shrink-0"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isStepCompleted ? '#10b981' : isActive ? '#1e40af' : '#e5e7eb',
                    borderColor: isStepCompleted ? '#059669' : isActive ? '#3b82f6' : '#d1d5db',
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center relative overflow-hidden shrink-0"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '3px solid',
                    boxShadow: isActive 
                      ? '0 0 0 4px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(30, 64, 175, 0.3)' 
                      : isStepCompleted
                      ? '0 0 0 3px rgba(16, 185, 129, 0.15), 0 2px 8px rgba(16, 185, 129, 0.3)'
                      : 'none'
                  }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ 
                      height: isStepCompleted ? '100%' : isActive ? '50%' : 0 
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(74, 222, 128, 0.4), rgba(74, 222, 128, 0.8))',
                      borderRadius: '50%'
                    }}
                  />
                  
                  <div className="relative z-10">
                    {isStepCompleted ? (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24">
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4 }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : isActive ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full shadow-lg"
                      />
                    ) : (
                      <span className="text-xs md:text-sm font-bold text-gray-400">{stepNumber}</span>
                    )}
                  </div>
                </motion.div>
                
                <span className={`text-[9px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-white/50'
                }`}>
                  Step {stepNumber}
                </span>
              </button>

              {/* Connector Line - Reduced height */}
              {isNotLastStep && (
                <div className="hidden md:flex relative w-[2px] h-8 bg-white/15 rounded-full overflow-hidden my-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ 
                      height: completedSteps.has(stepNumber) || (currentStepValue === stepNumber + 1) ? '100%' : 0 
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-500 to-green-600 rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Content Area - Right Side - Optimized for better centering */}
      <div className="flex-1 flex flex-col bg-white md:h-auto rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
        {/* Content - Improved centering */}
        <div className="flex-1 px-3 md:px-6 py-4 md:py-6 flex items-center justify-center overflow-y-auto min-h-[350px] md:min-h-[400px]">
          <div className="w-full max-w-[450px] mx-auto">
            {!isCompleted && stepsArray[currentStepValue - 1]}
          </div>
        </div>

        {/* Footer Buttons - Improved styling */}
        {!isCompleted && (
          <div className="px-4 md:px-6 py-4 md:py-5 bg-gradient-to-t from-gray-50 to-white border-t border-gray-200">
            {isLastStep && customFooter ? (
              customFooter(handleBack, handleNext)
            ) : (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-[450px] mx-auto">
                {currentStepValue !== 1 && (
                  <button
                    onClick={handleBack}
                    className="order-2 sm:order-1 w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-gray-100 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {backButtonText}
                  </button>
                )}
                {!isLastStep && (
                  <button
                    onClick={handleNext}
                    className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-sm hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-200 sm:ml-auto"
                  >
                    {nextButtonText}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
  return <>{children}</>;
}