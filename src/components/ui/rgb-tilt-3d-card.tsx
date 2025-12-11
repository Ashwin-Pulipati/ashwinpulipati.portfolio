"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Copy, Github, Globe, Share2 } from "lucide-react";
import * as React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSmartClipboard } from "@/hooks/use-smart-clipboard";
import { cn } from "@/lib/utils";
import Link from "next/link";

type RgbTiltCardProps = {
  readonly title: string;
  readonly description: string;
  readonly subtitle?: string;
  readonly imageUrl?: string;
  readonly tags?: string[];
  readonly className?: string;
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly shareUrl?: string;
  readonly shareTitle?: string;
  readonly shareText?: string;
};

type IconActionButtonProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
};

type LinkRowProps = {
  label: string;
  value: string;
};

type SimpleCopyButtonProps = {
  label: string;
  value: string;
};

const IconActionButton = React.memo(function IconActionButtonBase({
  icon: Icon,
  label,
  href,
}: IconActionButtonProps) {
  if (!href) return null;

  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          jellyTone="ghost"
          size="icon-sm"
          className="rounded-full text-muted-foreground hover:bg-card/70 hover:text-foreground"
          aria-label={label}
        >
          <Link href={href} rel="noreferrer" target="_blank">
            <Icon className="h-[18px] w-[18px] " aria-hidden="true" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={6}
        className="hidden sm:block rounded-full text-xs font-medium"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
});

const LinkRow = React.memo(function LinkRowBase({
  label,
  value,
}: LinkRowProps) {
  const { copied, copy } = useSmartClipboard();

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/70 px-3 py-1.5 text-xs md:text-sm">
      <div className="flex min-w-0 flex-col text-muted-foreground">
        <span className="font-medium">{label}</span>

        <span
          className={cn(
            "text-[11px] md:text-xs text-muted-foreground",
            "text-wrap balance wrap=break-words leading-snug",
            "max-w-full"
          )}
        >
          {value}
        </span>
      </div>

      <Button
        type="button"
        size="sm"
        jellyTone="ghost"
        onClick={() => copy(value, label)}
        className="text-[10px] uppercase tracking-[0.16em]"
      >
        {copied ? (
          <div className="flex items-center gap-2">
            <Check className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only md:not-sr-only">Copied</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Copy className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only md:not-sr-only">Copy</span>
          </div>
        )}
      </Button>

      <span className="sr-only" aria-live="polite">
        {copied ? `${label} link copied to clipboard` : ""}
      </span>
    </div>
  );
});

const SimpleCopyButton = React.memo(function SimpleCopyButtonBase({
  label,
  value,
}: SimpleCopyButtonProps) {
  const { copied, copy } = useSmartClipboard();

  return (
    <Button
      type="button"
      variant="soft"
      size="sm"
      onClick={() => copy(value, label)}
      className="flex w-full items-center justify-between gap-2 rounded-full text-[11px] uppercase tracking-[0.16em]"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" aria-hidden="true" />
          <span>{label.replace("Copy ", "").replace("URL", "copied")}</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
});

const cardVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 18,
    },
  },
};

const imageVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const bodyVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

export function RgbTilt3DCard({
  title,
  description,
  subtitle,
  imageUrl,
  tags,
  className,
  githubUrl,
  liveUrl,
  shareUrl,
  shareTitle,
  shareText,
}: RgbTiltCardProps) {
  const primaryShareUrl = shareUrl ?? liveUrl ?? githubUrl;
  const effectiveShareTitle = shareTitle ?? title;
  const effectiveShareText = shareText ?? "Check out this project";

  return (
    <div className="relative h-full w-full">
      <motion.article
        variants={cardVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className={cn(
          "rgb-card rgb-border h-fit w-full select-none",
          className
        )}
        style={{
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          borderRadius: "var(--rgb-card-border-radius)",
        }}
        aria-label={title}
      >
        <motion.div
          variants={imageVariants}
          className={cn(
            "rgb-card-image relative w-full",
            !imageUrl &&
              "bg-linear-to-br from-primary/90 via-secondary/80 to-accent/80 "
          )}
          style={
            imageUrl
              ? {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          <div className="pointer-events-auto absolute -bottom-5 right-0 flex max-w-full items-center gap-2 rounded-3xl bg-card px-3 py-3">
            <IconActionButton
              icon={Github}
              label="View GitHub repository"
              href={githubUrl}
            />
            <IconActionButton
              icon={Globe}
              label="Open live demo"
              href={liveUrl}
            />

            <Dialog>
              <Tooltip delayDuration={80}>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      jellyTone="ghost"
                      size="icon-sm"
                      className="rounded-full text-muted-foreground hover:bg-card/70 hover:text-foreground"
                      aria-label="Share project"
                    >
                      <Share2
                        className="h-[18px] w-[18px] "
                        aria-hidden="true"
                      />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={6}
                  className="hidden sm:block rounded-full text-xs font-medium"
                >
                  Share project
                </TooltipContent>
              </Tooltip>

              <DialogContent className="surface-soft w-[min(95vw,40rem)] rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-base md:text-lg">
                    Share this project
                  </DialogTitle>
                  <DialogDescription className="text-xs md:text-sm">
                    Share the live demo and GitHub repository with others.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                  {primaryShareUrl && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Quick share
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <FacebookShareButton
                          url={primaryShareUrl}
                          title={effectiveShareTitle}
                          aria-label="Share on Facebook"
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <TwitterShareButton
                          url={primaryShareUrl}
                          title={effectiveShareTitle}
                          aria-label="Share on X / Twitter"
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        <LinkedinShareButton
                          url={primaryShareUrl}
                          title={effectiveShareTitle}
                          summary={effectiveShareText}
                          source={primaryShareUrl}
                          aria-label="Share on LinkedIn"
                        >
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>

                        <WhatsappShareButton
                          url={primaryShareUrl}
                          title={effectiveShareTitle}
                          separator=" - "
                          aria-label="Share on WhatsApp"
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        <EmailShareButton
                          url={primaryShareUrl}
                          subject={effectiveShareTitle}
                          body={effectiveShareText}
                          aria-label="Share via Email"
                        >
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Project links
                    </p>

                    <div className="flex flex-col gap-2 sm:hidden">
                      {liveUrl && (
                        <SimpleCopyButton
                          label="Live demo URL"
                          value={liveUrl}
                        />
                      )}
                      {githubUrl && (
                        <SimpleCopyButton
                          label="GitHub repository URL"
                          value={githubUrl}
                        />
                      )}
                    </div>

                    <div className="hidden flex-col gap-2 sm:flex">
                      {liveUrl && <LinkRow label="Live demo" value={liveUrl} />}
                      {githubUrl && (
                        <LinkRow label="GitHub repository" value={githubUrl} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      jellyTone="ghost"
                      size="sm"
                      className="text-xs uppercase tracking-[0.16em]"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <motion.div variants={bodyVariants} className="rgb-card-description">
          <h3 className="rgb-card-title">{title}</h3>

          {subtitle && <p className="rgb-card-subtitle">{subtitle}</p>}

          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="mt-3 mb-6 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </motion.article>
    </div>
  );
}
