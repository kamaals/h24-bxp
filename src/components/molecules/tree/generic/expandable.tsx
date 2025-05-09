import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export const ExpandableContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pt-0">{children}</div>
  </AccordionPrimitive.Content>
));

ExpandableContent.displayName = AccordionPrimitive.Content.displayName;

export const ExpandableTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="bg-zinc-50 h-10 flex items-center border rounded-l-lg border-r-0">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "accordion-trigger  flex items-center transition-all first:[&[data-state=open]>svg]:rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronRight
        className={cn(
          "h-4 w-4 shrink-0 ml-2 transition-transform duration-200 text-accent-foreground/50 mr-1 relative z-20",
        )}
      />

      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

ExpandableTrigger.displayName = AccordionPrimitive.Trigger.displayName;
