"use client";
import React from "react";
import RHFInput from "@/components/atoms/rhf/rhf-input";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/lib/store/api/productServices";
import FormMaker from "@/components/molecules/forms/form-maker";
import { productWithAttributesSchema } from "@/lib/zod-schemas/product";
import { ProductDocType, ProductWithAttributesType } from "@/lib/types/product";
import { AttributeFields } from "@/components/molecules/forms/product/attribute-fields";

function CategoryForm({
  categoryId,
  afterEndCallback,
  edit,
  data,
}: {
  categoryId: string;
  edit?: boolean;
  data?: ProductDocType;
  afterEndCallback?: () => void;
}) {
  const [defaultValues, setDefaultValues] = React.useState<
    Partial<ProductWithAttributesType>
  >({ categoryId });

  React.useEffect(() => {
    if (categoryId) {
      setDefaultValues({ categoryId });
    }
  }, [categoryId]);

  React.useEffect(() => {
    if (edit && data) {
      setDefaultValues({
        ...(data as ProductWithAttributesType),
      });
    }
  }, [edit, data]);

  return (
    <div data-testid="product-form" className="max-w-lg">
      <FormMaker<ProductWithAttributesType>
        afterEndCallback={afterEndCallback}
        defaultValues={defaultValues}
        createHook={
          edit && data ? useUpdateProductMutation : useCreateProductMutation
        }
        schema={productWithAttributesSchema}
        id={edit ? data?.id : undefined}
        entityName={"Product"}
      >
        <div>
          <RHFInput name="name" label="Name" />
          <AttributeFields />
        </div>
      </FormMaker>
    </div>
  );
}

export default CategoryForm;
