"use client";
import React from "react";
import { Button } from "@/components/atoms/button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type ActionConfirmProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
};

function ActionConfirm({ onConfirm, onCancel }: ActionConfirmProps) {
  const [show, setShow] = React.useState<"init" | "show" | "hide">("init");

  const handleConfirm = () => {
    onConfirm?.();
    setShow("hide");
  };

  const handleCancel = () => {
    onCancel?.();
    setShow("hide");
  };

  return (
    <div className="w-full min-h-8 px-2 py-1.5 flex items-center overflow-hidden relative rounded-md">
      <AnimatePresence>
        {show !== "show" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() =>
              setShow((prev) => (prev !== "show" ? "show" : "hide"))
            }
            data-testid="action-confirm-trigger"
            className="absolute z-1 flex items-center justify-start w-full text-sm gap-2"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            Delete
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show === "show" && (
          <motion.div
            className="absolute top-0 left-0 right-0 grid grid-cols-2 items-center gap-2 rounded-md z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Button
              data-testid="action-confirm-ok"
              onClick={handleConfirm}
              type="button"
              variant="destructive"
              size="sm"
              className="text-white"
              aria-label="Confirm"
            >
              Yes
            </Button>

            <Button
              onClick={handleCancel}
              data-testid="action-confirm-cancel"
              type="button"
              variant="outline"
              size="sm"
              className="flex-grow-1"
              aria-label="Cancel"
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionConfirm;
