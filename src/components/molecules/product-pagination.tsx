import React from "react";
import { Button } from "@/components/atoms/button";
import { useAppSelector } from "@/lib/store/hooks";
import { useDispatch } from "react-redux";
import { moveProductPage } from "@/lib/store/features/app/appSlice";
import { cn } from "@/lib/utils";

function ProductPagination() {
  const pagination = useAppSelector((state) => state.app.productPagination);
  const dispatch = useDispatch();
  return (
    <div>
      {pagination.setup.length > 1 &&
        pagination.setup.map((offset, index) => (
          <Button
            disabled={pagination.offset === offset}
            variant="outline"
            key={`${index}-pagination`}
            onClick={() => dispatch(moveProductPage(offset))}
            className={cn(
              "rounded-r-none rounded-l-none border-l-0 border-r-0",
              index === 0
                ? "rounded-r-none border-r-0 border-l rounded-l-3xl"
                : "",
              index === pagination.setup.length - 1
                ? "rounded-l-none border-l-0 border-r rounded-r-3xl"
                : "",
            )}
          >
            {index + 1}
          </Button>
        ))}
    </div>
  );
}

export default ProductPagination;
