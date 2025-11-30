"use client";

import * as React from "react";
import VanillaTilt from "vanilla-tilt";
import { ExternalLink, Github, Share2 } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

type ActionButtonProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
};

const ActionButton = ({ icon: Icon, label, href }: ActionButtonProps) => {
  const commonClasses =
    "h-10 w-10 md:h-12 md:w-12 lg:h-10 lg:w-10 xl:w-12 xl:h-12 " +
    "rounded-full inline-flex items-center justify-center cursor-pointer " +
    "text-foreground/80 " +
    "shadow-[4px_4px_10px_rgba(0,0,0,0.14),-4px_-4px_10px_rgba(255,255,255,0.85)] " +
    "dark:shadow-[4px_4px_10px_rgba(0,0,0,0.75),-4px_-4px_10px_rgba(0.35,0.03,265,0.85)] " +
    "transition-transform duration-150 hover:scale-[1.07] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const style: React.CSSProperties = {
    backgroundColor: "rgb(255, 214, 55)",
  };

  if (!href) return null;

  return (
    <Link
      href={href}
      rel="noreferrer"
      aria-label={label}
      className={commonClasses}
      style={style}
      target="_blank"
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </Link>
  );
};

type LinkRowProps = {
  label: string;
  value: string;
};

const LinkRow = ({ label, value }: LinkRowProps) => {
  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {
        // ignore for now
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/40 px-2 py-1">
      <span className="text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="hidden md:inline-block max-w-[180px] truncate text-[11px] text-muted-foreground">
          {value}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
        >
          Copy
        </button>
      </div>
    </div>
  );
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
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!cardRef.current) return;
    const node = cardRef.current;

    VanillaTilt.init(node, {
      max: 15,
      speed: 400,
      glare: true,
      reverse: true,
      "max-glare": 0.2,
      perspective: 1000,
      scale: 1.02,
      transition: true,
    } as any);

    return () => {
      // @ts-expect-error vanillaTilt is injected by the library
      if (node.vanillaTilt) {
        // @ts-expect-error vanillaTilt is injected by the library
        node.vanillaTilt.destroy();
      }
    };
  }, []);

  const primaryShareUrl = shareUrl ?? liveUrl ?? githubUrl;
  const effectiveShareTitle = shareTitle ?? title;
  const effectiveShareText = shareText ?? "Check out this project";

  const shareButtonClasses =
    "h-10 w-10 md:h-12 md:w-12 lg:h-10 lg:w-10 xl:w-12 xl:h-12 " +
    "rounded-full inline-flex items-center justify-center cursor-pointer " +
    "text-foreground/80 " +
    "shadow-[4px_4px_10px_rgba(0,0,0,0.14),-4px_-4px_10px_rgba(255,255,255,0.85)] " +
    "dark:shadow-[4px_4px_10px_rgba(0,0,0,0.75),-4px_-4px_10px_rgba(0.35,0.03,265,0.85)] " +
    "transition-transform duration-150 hover:scale-[1.07] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const shareButtonStyle: React.CSSProperties = {
    backgroundColor: "rgb(255, 214, 55)",
  };

  return (
    <article
      ref={cardRef}
      data-tilt
      className={cn("rgb-card rgb-border h-fit select-none", className)}
      style={{
        backgroundColor: "var(--card)",
        color: "var(--card-foreground)",
        borderRadius: "var(--rgb-card-border-radius)",
      }}
      aria-label={title}
    >
      {/* IMAGE AREA */}
      <div
        className={cn(
          "rgb-card-image relative",
          "bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/80"
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
        {/* CURVED TAB BAND */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none">
          <svg
            viewBox="0 0 400 64"
            preserveAspectRatio="none"
            className="block h-full w-full"
            aria-hidden="true"
          >
            <path
              d="
                M0 0
                H170
                C210 0 210 32 250 32
                H400
                V64
                H0
                Z
              "
              fill="var(--card)"
              transform="translate(400 0) scale(-1 1)"
            />
          </svg>
        </div>

        {/* ACTION ICONS */}
        <div className="pointer-events-auto absolute bottom-3 md:bottom-1 lg:bottom-4 xl:bottom-1 right-3 md:right-4 lg:right-3 xl:right-4 flex items-center gap-2">
          <ActionButton
            icon={Github}
            label="View GitHub repository"
            href={githubUrl}
          />
          <ActionButton
            icon={ExternalLink}
            label="Open live demo"
            href={liveUrl}
          />

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Share project"
                className={shareButtonClasses}
                style={shareButtonStyle}
              >
                <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Share this project</DialogTitle>
                <DialogDescription>
                  Share the live demo and GitHub repo wherever you like.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {primaryShareUrl && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Quick share
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <FacebookShareButton
                        url={primaryShareUrl}
                        title={effectiveShareTitle}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>

                      <TwitterShareButton
                        url={primaryShareUrl}
                        title={effectiveShareTitle}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>

                      <LinkedinShareButton
                        url={primaryShareUrl}
                        title={effectiveShareTitle}
                        summary={effectiveShareText}
                        source={primaryShareUrl}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>

                      <WhatsappShareButton
                        url={primaryShareUrl}
                        title={effectiveShareTitle}
                        separator=" - "
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>

                      <EmailShareButton
                        url={primaryShareUrl}
                        subject={effectiveShareTitle}
                        body={effectiveShareText}
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
                  {liveUrl && <LinkRow label="Live demo" value={liveUrl} />}
                  {githubUrl && (
                    <LinkRow label="GitHub repo" value={githubUrl} />
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                  >
                    Close
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* BODY */}
      <div className="rgb-card-description">
        <h3 className="rgb-card-title text-lg font-semibold text-primary">
          {title}
        </h3>

        {subtitle && (
          <p className="rgb-card-subtitle mb-1 text-xs md:text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}

        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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
      </div>
    </article>
  );
}
