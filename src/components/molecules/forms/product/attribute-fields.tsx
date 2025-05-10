import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AttributeTypes } from "@/lib/types/product";
import RHFSelect from "@/components/atoms/rhf/rhf-select";
import { SelectItem } from "@/components/atoms/select";
import { Button } from "@/components/atoms/button";
import RHFInput from "@/components/atoms/rhf/rhf-input";
import RHFSwitch from "@/components/atoms/rhf/rhf-switch";
import { Plus, Trash2 } from "lucide-react";
import { FormLabel } from "@/components/atoms/form";

export function AttributeField({ index }: { index: number }) {
  const { setValue } = useFormContext();
  const [attributeType, setAttributeType] =
    React.useState<AttributeTypes>("text");

  const handleValueChange = React.useCallback(
    /* istanbul ignore next @preserve */
    (value: string) => {
      /* istanbul ignore next @preserve */
      setAttributeType(value as AttributeTypes);
      /* istanbul ignore next @preserve */
      setValue(`attributes[${index}].name`, "");
    },
    [index, setValue],
  );

  return (
    <div className={"flex gap-2"}>
      <RHFSelect
        afterValueChanged={handleValueChange}
        name={`attributes[${index}].type`}
        label={"Type"}
      >
        <SelectItem value="text">Text</SelectItem>
        <SelectItem value="tag">Tag</SelectItem>
        <SelectItem value="number">Number</SelectItem>
        <SelectItem value="url">URL</SelectItem>
        <SelectItem value="boolean">Boolean</SelectItem>
      </RHFSelect>
      <RHFInput name={`attributes[${index}].code`} label={"Code"} />
      {attributeType === "boolean" ? (
        <RHFSwitch name={`attributes[${index}].name`} label={"Name"} />
      ) : (
        <RHFInput
          type={
            attributeType === "number"
              ? "number"
              : attributeType === "url"
                ? "url"
                : "text"
          }
          name={`attributes[${index}].name`}
          label={"Name"}
        />
      )}
      <RHFInput
        className={"hidden"}
        name={`attributes[${index}].id`}
        label={"ID"}
      />
    </div>
  );
}

export function AttributeFields() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const handleAdd = React.useCallback(() => {
    append({ name: "", code: "", type: "text" });
  }, [append]);

  return (
    <div className={"space-y-2 mt-4"}>
      <div className={"flex gap-2 mb-2 items-center"}>
        <FormLabel>Attributes</FormLabel>
        <Button
          className={"h-7"}
          variant="outline"
          onClick={handleAdd}
          type="button"
        >
          <Plus />
        </Button>
      </div>
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="flex gap-2 items-end p-3 bg-slate-50 rounded-lg -mx-1"
          >
            <AttributeField index={index} />
            <Button
              onClick={() => remove(index)}
              type="button"
              variant="destructive"
              size="sm"
              className="text-white mb-1"
              aria-label="Confirm"
            >
              <Trash2 />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
