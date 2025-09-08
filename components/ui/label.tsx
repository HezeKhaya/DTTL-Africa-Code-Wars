"use client";

import * as React from "react";
import { Field, FieldLabel } from "@chakra-ui/react"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof FieldLabel>,
  React.ComponentPropsWithoutRef<typeof FieldLabel> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <Field.Root>
        <FieldLabel
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
    </Field.Root>
  
));
Label.displayName = FieldLabel.displayName;

export { Label };