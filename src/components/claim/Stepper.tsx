import { Check } from "lucide-react";
import type { StepConfig } from "./types";

interface StepperProps {
  steps: StepConfig[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "bg-indigo text-indigo-foreground"
                      : isActive
                        ? "bg-ink text-primary-foreground ring-2 ring-indigo/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full ${
                    isCompleted ? "bg-indigo" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepHeader({
  step,
  steps,
}: {
  step: StepConfig;
  steps: StepConfig[];
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Step {step.number} of {steps.length}
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {step.label}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {step.description}
      </p>
    </div>
  );
}
