"use client";

import * as React from "react";
import VanillaTilt from "vanilla-tilt";
import { Check, Copy, Github, Globe, Share2 } from "lucide-react";
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
import { motion } from "framer-motion";

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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";

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
  onHoverChange?: (label: string | null) => void;
};

const IconActionButton = ({
  icon: Icon,
  label,
  href,
  onHoverChange,
}: IconActionButtonProps) => {
  if (!href) return null;

  return (
    <Button
      asChild
      variant="ghost"
      jellyTone="ghost"
      size="icon-sm"
      className="cursor-none rounded-full bg-card/90 hover:bg-card shadow-sm hover:shadow-md"
      aria-label={label}
      onMouseEnter={() => onHoverChange?.(label)}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => onHoverChange?.(label)}
      onBlur={() => onHoverChange?.(null)}
    >
      <Link href={href} rel="noreferrer" target="_blank">
        <Icon className="h-[18px] w-[18px] cursor-none" aria-hidden="true" />
      </Link>
    </Button>
  );
};

type LinkRowProps = {
  label: string;
  value: string;
};

const LinkRow = ({ label, value }: LinkRowProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!value) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      toast.success("Link copied", {
        description: label,
      });

      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Couldn’t copy link", {
        description: "Please copy it manually.",
      });
    }
  };

  return (
    <div className="relative flex items-center gap-3 rounded-full border border-border/60 bg-muted/60 px-3 py-1.5 text-xs md:text-sm">
      <span className="font-medium text-muted-foreground">{label}</span>

      <span className="flex-1 truncate text-[11px] md:text-xs text-muted-foreground text-right pr-3">
        {value}
      </span>

      <div className="relative shrink-0">
        <div
          className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-accent/20 blur-sm"
          aria-hidden="true"
        />
        <Button
          type="button"
          size="sm"
          variant="soft"
          onClick={handleCopy}
          className="relative h-7 px-3 text-[10px] uppercase tracking-[0.16em]"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only md:not-sr-only ml-1">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only md:not-sr-only ml-1">Copy</span>
            </>
          )}
        </Button>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? `${label} link copied to clipboard` : ""}
      </span>
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
  const [hoverLabel, setHoverLabel] = React.useState<string | null>(null);

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
      if (node.vanillaTilt) {
        node.vanillaTilt.destroy();
      }
    };
  }, []);

  const primaryShareUrl = shareUrl ?? liveUrl ?? githubUrl;
  const effectiveShareTitle = shareTitle ?? title;
  const effectiveShareText = shareText ?? "Check out this project";

  return (
    <div className="relative cursor-none">
      <CursorProvider>
        <Cursor variant="brand" />

        <article
          ref={cardRef}
          data-tilt
          className={cn(
            "rgb-card rgb-border h-fit select-none cursor-none",
            className
          )}
          style={{
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
            borderRadius: "var(--rgb-card-border-radius)",
            transformStyle: "preserve-3d",
          }}
          aria-label={title}
        >
          <div
            className={cn(
              "rgb-card-image relative",
              !imageUrl &&
                "bg-linear-to-br from-primary/90 via-secondary/80 to-accent/80"
            )}
            style={
              imageUrl
                ? {
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "translateZ(0)",
                  }
                : { transform: "translateZ(0)" }
            }
          >
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
            
            <div
              className="pointer-events-auto absolute bottom-3 lg:bottom-4 xl:bottom-1 right-3 md:right-4 lg:right-3 xl:right-4 flex items-center gap-2"
              style={{ transform: "translateZ(50px)" }}
            >
              <IconActionButton
                icon={Github}
                label="View GitHub repository"
                href={githubUrl}
                onHoverChange={setHoverLabel}
              />
              <IconActionButton
                icon={Globe}
                label="Open live demo"
                href={liveUrl}
                onHoverChange={setHoverLabel}
              />

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    jellyTone="ghost"
                    size="icon-sm"
                    className="rounded-full bg-card/90 hover:bg-card shadow-sm hover:shadow-md"
                    aria-label="Share project"
                    onMouseEnter={() => setHoverLabel("Share project")}
                    onMouseLeave={() => setHoverLabel(null)}
                    onFocus={() => setHoverLabel("Share project")}
                    onBlur={() => setHoverLabel(null)}
                  >
                    <Share2 className="h-[18px] w-[18px] cursor-none" aria-hidden="true" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg surface-soft">
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
                      {liveUrl && <LinkRow label="Live demo" value={liveUrl} />}
                      {githubUrl && (
                        <LinkRow label="GitHub repository" value={githubUrl} />
                      )}
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

            {hoverLabel && (
              <CursorFollow align="top-right" sideOffset={18}>
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  className="rounded-full border border-border/60 bg-card/95 px-3 py-1 text-xs font-medium text-foreground shadow-md backdrop-blur-sm w-28 bg-linear-to-tr from-primary/60 via-secondary/60 to-accent/60"
                >
                  {hoverLabel}
                </motion.div>
              </CursorFollow>
            )}
          </div>
          
          <div
            className="rgb-card-description px-2"
            style={{ transform: "translateZ(50px)" }}
          >
            <h3 className="rgb-card-title">{title}</h3>

            {subtitle && <p className="rgb-card-subtitle">{subtitle}</p>}

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
      </CursorProvider>
    </div>
  );
}
