"use client";

import { Send, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function EmailPreviewDialog({
  open,
  onOpenChange,
  emailBody,
  submitting,
  onEdit,
  onConfirmSend,
}: {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly emailBody: string;
  readonly submitting: boolean;
  readonly onEdit: () => void;
  readonly onConfirmSend: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="surface-soft max-w-[min(95vw,40rem)] rounded-2xl border border-border/70 p-4 md:p-6">
        <DialogHeader className="mt-10 md:mt-0">
          <DialogTitle className="text-lg">
            Preview email before sending
          </DialogTitle>
          <DialogDescription className="text-sm">
            This is the message that will be sent via EmailJS.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-6 text-sm">
          <pre className="whitespace-pre-wrap wrap-break-word font-sans">
            {emailBody}
          </pre>
        </div>

        <DialogFooter className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-between">
          <Button type="button" jellyTone="ghost" size="sm" onClick={onEdit}>
            <span className="flex items-center justify-center gap-2">
              Edit <SquarePen className="h-4 w-4 shrink-0" />
            </span>
          </Button>

          <Button
            type="button"
            jellyTone="primary"
            size="sm"
            onClick={onConfirmSend}
            disabled={submitting}
          >
            <span className="flex items-center justify-center gap-2">
              {submitting ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4 shrink-0 rotate-12" />
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
