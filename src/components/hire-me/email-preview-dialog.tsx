"use client";

import { Check, Copy, Send, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  draft,
  onDraftChange,
  submitting,
  onCopyDraft,
  onConfirmSend,
  copied,
}: {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;

  readonly draft: string;
  readonly onDraftChange: (next: string) => void;

  readonly submitting: boolean;

  readonly copied: boolean;
  
  readonly onCopyDraft: () => void;
  readonly onConfirmSend: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="surface-soft max-w-[min(95vw,40rem)] rounded-2xl border border-border/70 p-4 md:p-6 ">
        <DialogHeader className="mt-10 md:mt-0">
          <DialogTitle className="text-lg">
            Preview email before sending
          </DialogTitle>
          <DialogDescription className="text-sm">
            You can edit the draft below. Use Copy to paste it anywhere.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-2xl border border-border/60">
          <Textarea
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            rows={12}
            className="whitespace-pre-wrap font-sans text-sm"
            aria-label="Email draft"
          />
        </div>

        <DialogFooter className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              jellyTone="outline"
              size="sm"
              onClick={onCopyDraft}
            >
              <span className="flex items-center justify-center gap-2">
                {copied ? (
                  <>
                    Copied
                    <Check className="h-4 w-4 shrink-0" />
                  </>
                ) : (
                  <>
                    Copy draft
                    <Copy className="h-4 w-4 shrink-0" />
                  </>
                )}
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
