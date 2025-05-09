"use client";
import React from "react";
import { CategoryDocType, CategoryType } from "@/lib/types/category";
import RHFInput from "@/components/atoms/rhf/rhf-input";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/lib/store/api/categoryServices";
import { categorySchema } from "@/lib/zod-schemas/category";
import FormMaker from "@/components/molecules/forms/form-maker";

function CategoryForm({
  parentId,
  afterEndCallback,
  edit,
  data,
}: {
  parentId?: string;
  edit?: boolean;
  data?: CategoryDocType;
  afterEndCallback?: () => void;
}) {
  const [defaultValues, setDefaultValues] = React.useState<
    Partial<CategoryType>
  >({ parentId });

  React.useEffect(() => {
    if (parentId) {
      setDefaultValues({ parentId });
    }
  }, [parentId]);

  React.useEffect(() => {
    if (edit && data) {
      setDefaultValues({
        ...data,
      });
    }
  }, [edit, data]);

  return (
    <div data-testid="category-form" className="max-w-lg">
      <FormMaker<CategoryType>
        afterEndCallback={afterEndCallback}
        defaultValues={defaultValues}
        createHook={
          edit && data ? useUpdateCategoryMutation : useCreateCategoryMutation
        }
        schema={categorySchema}
        id={edit ? parentId : undefined}
        entityName={"Category"}
      >
        <div>
          <RHFInput
            name="name"
            label="Name"
            className={"grid grid-cols-4 gap-2"}
            inputClassName={"col-span-3"}
          />
        </div>
      </FormMaker>
    </div>
  );
}

export default CategoryForm;
