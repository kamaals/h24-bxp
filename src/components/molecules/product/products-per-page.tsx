import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store/hooks";
import {
  moveProductPage,
  updateProductsPaginationSetup,
  updateProductsPerPage,
} from "@/lib/store/features/app/appSlice";
import { generatePagination } from "@/lib/utils";

function ProductsPerPage() {
  const dispatch = useDispatch();
  const { limit, total } = useAppSelector(
    (state) => state.app.productPagination,
  );

  const handleChange = React.useCallback(
    (value: string) => {
      const currentLimit = Number(value);
      const pagination =
        total > 0 ? generatePagination(currentLimit, total) : [];
      dispatch(updateProductsPerPage(Number(value)));
      dispatch(updateProductsPaginationSetup(pagination));
      dispatch(moveProductPage(0));
    },
    [total, dispatch],
  );

  return (
    <div>
      <Select defaultValue={`${limit}`} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Per Page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Per Page</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ProductsPerPage;
