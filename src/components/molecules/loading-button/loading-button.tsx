import React from "react";
import { Button } from "@/components/atoms/button";
import SVGCircle from "@/components/molecules/loading-button/svg-circle";

type ButtonProps = React.ComponentProps<"button">;

function LoadingButton({
  loading,
  children,
  ...props
}: ButtonProps & { loading: boolean }) {
  return (
    <Button {...props} disabled={loading} data-testid="loading-button">
      <span className={"font-bold"}>{children}</span>
      {loading ? (
        <span className="ml-4">
          <SVGCircle />
        </span>
      ) : null}
    </Button>
  );
}

export default LoadingButton;
