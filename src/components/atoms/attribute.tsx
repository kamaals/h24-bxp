import React from "react";
import { AttributeType, AttributeTypes } from "@/lib/types/product";
import { cn } from "@/lib/utils";

function Attribute({ attribute }: { attribute: AttributeType }) {
  const type = attribute.type as AttributeTypes;
  const bgClassName = () => {
    switch (type) {
      case "boolean":
        return "bg-rose-100";
      case "number":
        return "bg-violet-100";
      case "tag":
        return "bg-lime-100";
      case "text":
        return "bg-emerald-100";
      case "url":
        return "bg-cyan-100";
      default:
        return "bg-white";
    }
  };

  return (
    <span className={cn("rounded-lg text-xs p-2 inline-block", bgClassName())}>
      <span className={"flex gap-1"}>
        <span className="font-bold">{attribute.code}: </span>
        <span>{attribute.name}</span>
      </span>
      <span>{attribute.type}</span>
    </span>
  );
}

export default Attribute;
