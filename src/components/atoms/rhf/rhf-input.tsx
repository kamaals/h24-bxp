import { useFormContext } from "react-hook-form";
import React from "react";
import { Input } from "@/components/atoms/input";
import {
  FormLabel,
  FormItem,
  FormField,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/atoms/form";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  description?: string;
  inputClassName?: string;
} & React.ComponentProps<typeof Input>;

function RHFInput({
  name,
  label,
  className,
  inputClassName,
  description = "",
  ...props
}: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn(className)}>
          <div>
            <FormLabel>{label}</FormLabel>
            <FormDescription
              style={{ marginTop: "-.125rem" }}
              className="text-xs"
            >
              {description}
            </FormDescription>
          </div>
          <FormControl>
            <div className={cn(inputClassName, "space-y-1")}>
              <Input
                {...field}
                value={field.value === undefined ? "" : field.value}
                {...props}
                data-testid={name}
              />
              {!!error ? <FormMessage>{error.message}</FormMessage> : null}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default RHFInput;
