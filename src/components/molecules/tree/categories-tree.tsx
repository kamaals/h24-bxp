"use client";
import React from "react";
import { CategoryWithChildren } from "@/lib/types/category";
import { Tree } from "@/components/molecules/tree/generic";
import { Folder, FolderOpen, Plus } from "lucide-react";
import { LeafAction } from "@/components/molecules/tree/leaf-action";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/atoms/card";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/lib/store/api/categoryServices";
import CategoryFormModal from "@/components/molecules/forms/category-form-modal";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  onOpenChangeProductModal,
  setCategory,
  setSelectedProduct,
} from "@/lib/store/features/app/appSlice";
import { Button } from "@/components/atoms/button";

function CategoriesTree() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState<
    CategoryWithChildren | undefined
  >(undefined);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [edit, setEdit] = React.useState<boolean>(false);

  const handleAdd = React.useCallback(
    /* istanbul ignore next @preserve */
    (root = false) => {
      /* istanbul ignore if @preserve */
      if (root) {
        setSelected(undefined);
      }
      setEdit(false);
      setOpenDialog(true);
    },
    [setOpenDialog],
  );

  const handleEdit = React.useCallback(() => {
    setEdit(true);
    setOpenDialog(true);
  }, [setOpenDialog]);

  const { data: categories } = useGetCategoriesQuery({ parentId: undefined });
  const [deleteCategory] = useDeleteCategoryMutation();

  /* istanbul ignore next @preserve */
  const handleDelete = React.useCallback(() => {
    /* istanbul ignore if @preserve */
    if (selected) {
      deleteCategory(selected.id);
    }
  }, [deleteCategory, selected]);

  const handleAddProduct = React.useCallback(() => {
    /* istanbul ignore if @preserve */
    if (selected) {
      dispatch(setSelectedProduct(null));
      dispatch(onOpenChangeProductModal(true));
    }
  }, [selected, dispatch]);

  const handleShowProducts = React.useCallback(() => {
    /* istanbul ignore if @preserve */
    if (selected) {
      router.push(`/dashboard/category/${selected.id}/product`);
    }
  }, [selected, router]);

  return Array.isArray(categories) ? (
    <Card
      className={
        'overflow-scroll relative group-data-[state="collapsed"]:hidden border-0 shadow-none bg-sidebar'
      }
    >
      <CardHeader>Categories Tree</CardHeader>
      <CardContent>
        <CategoryFormModal
          parentNode={selected}
          open={openDialog}
          openChange={setOpenDialog}
          edit={edit}
        />
        <Button onClick={() => setOpenDialog(true)} type="button">
          <Plus /> Add Root Category
        </Button>
        <Tree<CategoryWithChildren>
          actions={
            <LeafAction
              addAction={() => handleAdd(false)}
              deleteAction={handleDelete}
              editAction={handleEdit}
              addProduct={handleAddProduct}
              showProducts={handleShowProducts}
            />
          }
          defaultNodeIcon={Folder}
          defaultLeafIcon={FolderOpen}
          onSelectChange={(selected) => {
            const _selected = selected as CategoryWithChildren;
            setSelected(_selected);
            dispatch(setCategory(_selected));
            router.push(`/dashboard/category/${_selected.id}/product`);
          }}
          data={categories as Array<CategoryWithChildren>}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  ) : null;
}

export default CategoriesTree;
