import { useFormContext } from "react-hook-form";
import { SelectProps } from "@radix-ui/react-select";
import {
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/atoms/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  afterValueChanged?: (value: string, name: string) => void;
  children: React.ReactNode;
  name: string;
  label: string;
  description?: string;
  className?: string;
  inputClassName?: string;
} & SelectProps;

function RHFSelect({
  children,
  name,
  label,
  description = "",
  className = "",
  inputClassName = "",
  afterValueChanged,
}: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, ...rest } = field;
        return (
          <FormItem className={cn(className)}>
            <div>
              <FormLabel>{label}</FormLabel>
              <FormDescription className="text-xs">
                {description}
              </FormDescription>
            </div>
            <FormControl>
              <div className={cn(inputClassName, "space-y-1 mt-0.5")}>
                <Select
                  {...rest}
                  value={`${field.value}`}
                  onValueChange={
                    /* istanbul ignore next @preserve */
                    (value) => {
                      /* istanbul ignore next @preserve */
                      onChange({ target: { value } });
                      /* istanbul ignore next @preserve */
                      afterValueChanged?.(value, name);
                    }
                  }
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue
                      className={"select-value"}
                      placeholder={label}
                    />
                  </SelectTrigger>
                  <SelectContent>{children}</SelectContent>
                </Select>
                {!!error ? (
                  <FormMessage>{error.message}</FormMessage>
                ) : (
                  <span
                    className={
                      "inline-block h-2 bg-emerald-300 w-2 ml-1 rounded-full"
                    }
                  ></span>
                )}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

export default RHFSelect;
