import React from "react";
import { ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  AsyncDefaultValues,
  DefaultValues,
  FieldValues,
  // @ts-expect-error:  types are exist
} from "react-hook-form/dist/types";
import { Form } from "@/components/atoms/form";
import LoadingButton from "@/components/molecules/loading-button/loading-button";
import { toast } from "sonner";
import { GenericMutationType } from "@/lib/types/form";

type Props<K> = {
  createHook: GenericMutationType;
  schema: ZodSchema;
  defaultValues: DefaultValues<K> | AsyncDefaultValues<K>;
  children: React.ReactNode;
  afterSuccessCallback?: (response: K) => void;
  afterEndCallback?: () => void;
  id?: string;
  debug?: boolean;
};

function FormMaker<EntityType extends FieldValues = FieldValues>({
  defaultValues,
  schema,
  createHook,
  children,
  afterEndCallback,
  afterSuccessCallback,
  id,
  debug,
}: Props<EntityType>) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<EntityType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const [create] = createHook();

  React.useEffect(() => {
    requestAnimationFrame(() => {
      form.reset(defaultValues);
    });
  }, [defaultValues, form, form.reset]);

  const handleSubmit = async (data: Partial<EntityType>) => {
    setLoading(true);
    try {
      const response = await create(id ? { ...data, id } : { ...data });
      afterSuccessCallback?.(response as EntityType);
    } catch (e: unknown) {
      // @ts-expect-error: is string
      toast.error(e?.message ?? "Error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      afterEndCallback?.();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        <div className={"py-4 flex justify-end animate"}>
          <LoadingButton loading={loading} type={"submit"}>
            Submit
          </LoadingButton>
        </div>
      </form>
      {debug && (
        <div>
          <div className="p-4">
            <h5>Errors</h5>
            <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
          </div>
          <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

export default FormMaker;
