import React from "react";
import { Button } from "@/components/atoms/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { QueryOrder } from "@/lib/store/types/product";
import { setNameOrder, setPriceOrder } from "@/lib/store/features/app/appSlice";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/store/hooks";
import ProductsPerPage from "@/components/molecules/products-per-page";

function OrderButton({
  label,
  onChange,
  order,
}: {
  label: string;
  onChange: (order: QueryOrder) => void;
  order: QueryOrder;
}) {
  return (
    <div className={"flex items-center gap-2"}>
      {label}
      <div className={"flex flex-col"}>
        <Button
          onClick={() => onChange("asc")}
          className={cn(
            "h-5 border border-b-0 bg-white rounded-b-none",
            order === "asc" ? "text-slate-700" : "text-slate-300",
          )}
          type="button"
          variant="ghost"
        >
          <ChevronUp />
        </Button>
        <Button
          onClick={() => onChange("desc")}
          className={cn(
            "h-5 border border-t-0 bg-white rounded-t-none",
            order === "desc" ? "text-slate-700" : "text-slate-300",
          )}
          type="button"
          variant="ghost"
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}

function OrderTool() {
  const dispatch = useDispatch();

  const nameOrder = useAppSelector((state) => state.app.nameOrder);
  const priceOrder = useAppSelector((state) => state.app.priceOrder);

  const handleNameOrder = React.useCallback(
    (order: QueryOrder) => {
      dispatch(setNameOrder(order));
    },
    [dispatch],
  );
  const handlePriceOrder = React.useCallback(
    (order: QueryOrder) => {
      dispatch(setPriceOrder(order));
    },
    [dispatch],
  );

  return (
    <div className={"flex gap-4"}>
      <OrderButton
        onChange={handleNameOrder}
        label={"Name"}
        order={nameOrder}
      />
      <OrderButton
        onChange={handlePriceOrder}
        label={"Price"}
        order={priceOrder}
      />
      <ProductsPerPage />
    </div>
  );
}

export default OrderTool;
