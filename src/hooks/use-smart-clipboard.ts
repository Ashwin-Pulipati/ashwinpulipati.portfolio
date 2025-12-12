"use client";

import { toast } from "sonner";
import { useCopyToClipboard, useTimeoutFn } from "react-use";
import { useState } from "react";

export function useSmartClipboard(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const [clipboardState, ] = useCopyToClipboard();

  const [, cancelReset, resetTimer] = useTimeoutFn(() => {
    setCopied(false);
  }, timeout);

  async function copy(value: string, label?: string) {
    if (!value) return;

    cancelReset();

    if (clipboardState.error) {
      toast.error("Couldn’t copy link", {
        description: "Please copy it manually.",
      });
      return false;
    }

    toast.success("Link copied", {
      description: label ?? "",
    });

    setCopied(true);
    resetTimer();
    return true;
  }

  return { copied, copy };
}
