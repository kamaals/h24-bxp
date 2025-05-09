import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import { Switch } from "@/components/atoms/switch";
import {
  FormLabel,
  FormItem,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/atoms/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

type Props = {
  name: string;
  label: string;
  description?: string;
  beforeChange?: (value: boolean) => void;
  afterChange?: (value: boolean) => void;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
};
export default function RHFSwitch({
  name,
  label,
  description = "",
  beforeChange,
  afterChange,
  tooltip,
}: Props) {
  const { control } = useFormContext();
  const _switch = (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription className="text-xs">{description}</FormDescription>
          <FormControl className={""}>
            <Switch
              onCheckedChange={
                /* istanbul ignore next @preserve */
                async (value: boolean) => {
                  /* istanbul ignore next @preserve */
                  beforeChange?.(value);
                  /* istanbul ignore next @preserve */
                  field.onChange({ target: { value } });
                  /* istanbul ignore next @preserve */
                  afterChange?.(value);
                }
              }
              checked={!!field.value}
            />
          </FormControl>
          {!!error ? (
            <FormMessage>{error.message}</FormMessage>
          ) : (
            <span className="block h-3 w-3 relative">
              <span
                className={
                  "absolute inline-block h-2 bg-emerald-300 w-2 -top-0.5 rounded-full"
                }
              ></span>
            </span>
          )}
        </FormItem>
      )}
    />
  );
  /* istanbul ignore if @preserve */
  if (!tooltip) {
    return _switch;
  }
  /* istanbul ignore next @preserve */
  if (typeof tooltip === "string") {
    /* istanbul ignore next @preserve */
    tooltip = {
      children: tooltip,
    };
  }
  /* istanbul ignore next @preserve */
  return (
    <Tooltip>
      <TooltipTrigger asChild>{_switch}</TooltipTrigger>
      <TooltipContent side="right" align="center" {...tooltip} />
    </Tooltip>
  );
}
