"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useIdle, useMedia } from "react-use";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { SidebarNavLink } from "@/components/ui/sidebar-nav-link";
import { cn } from "@/lib/utils";

type NavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  download?: boolean;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
    download?: boolean;
  }[];
};

type ProjectFocus =
  | "all"
  | "frontend-heavy"
  | "backend-heavy"
  | "full-stack"
  | "devops"
  | "games-web3";

function normalizeFocusParam(value: string | null): ProjectFocus {
  const allowed: ProjectFocus[] = [
    "all",
    "frontend-heavy",
    "backend-heavy",
    "full-stack",
    "devops",
    "games-web3",
  ];
  if (value && allowed.includes(value as ProjectFocus)) {
    return value as ProjectFocus;
  }
  return "all";
}

function getFocusFromHref(href: string): ProjectFocus {
  try {
    const url = new URL(href, "http://localhost");
    const focusParam = url.searchParams.get("focus");
    return normalizeFocusParam(focusParam);
  } catch {
    return "all";
  }
}

type ComputedNavItem = NavMainItem & {
  basePath: string;
  hasChildren: boolean;
  isActive: boolean;
  items: {
    title: string;
    url: string;
    isActive: boolean;
    download?: boolean;
  }[];
};

const NavRow = React.memo(function NavRow({ item }: { item: ComputedNavItem }) {
  const { state, setOpen } = useSidebar();
  const router = useRouter();
  const Icon = item.icon;

  if (!item.hasChildren) {
    const content = (
      <>
        {Icon && (
          <Icon
            aria-hidden="true"
            className={cn(
              "size-5",
              item.isActive
                ? "text-sidebar-accent-foreground"
                : "text-muted-foreground"
            )}
          />
        )}
        <span className={cn("text-md", item.isActive && "font-semibold")}>
          {item.title}
        </span>
      </>
    );

    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={item.isActive}
          className={cn(
            "aria-[current=page]:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <SidebarNavLink
            href={item.url}
            download={item.download}
            className="flex items-center gap-2"
            ariaLabel={item.title}
            aria-current={!item.download && item.isActive ? "page" : undefined}
          >
            {content}
          </SidebarNavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={item.isActive}
            onClick={(e) => {
              if (state === "collapsed") {
                e.preventDefault();
                setOpen(true);
                setTimeout(() => router.push(item.url), 150);
              }
            }}
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            {Icon && (
              <Icon
                aria-hidden="true"
                className={cn(
                  "size-5",
                  item.isActive
                    ? "text-sidebar-accent-foreground"
                    : "text-muted-foreground"
                )}
              />
            )}

            <span className={cn("text-md", item.isActive && "font-semibold")}>
              {item.title}
            </span>

            <ChevronRight
              aria-hidden="true"
              className={cn(
                "ml-auto size-4 text-muted-foreground",
                "transition-transform duration-200",
                "group-data-[state=open]/collapsible:rotate-90"
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub className="mt-1">
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={subItem.isActive}
                  className={cn(
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <SidebarNavLink
                    href={subItem.url}
                    download={subItem.download}
                    className="flex items-center gap-2"
                    ariaLabel={subItem.title}
                    aria-current={
                      !subItem.download && subItem.isActive ? "page" : undefined
                    }
                  >
                    <span className="text-sm">{subItem.title}</span>
                  </SidebarNavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
});

export const NavMain = React.memo(function NavMain({
  items,
}: {
  readonly items: NavMainItem[];
}) {
  const prefersReducedMotion = useMedia(
    "(prefers-reduced-motion: reduce)",
    false
  );
  const isIdle = useIdle(60_000);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFocus = React.useMemo(
    () => normalizeFocusParam(searchParams.get("focus")),
    [searchParams]
  );

  const computedItems: ComputedNavItem[] = React.useMemo(() => {
    return items.map((item) => {
      const basePath = item.url.split("?")[0];
      const hasChildren = !!item.items?.length;

      let itemIsActive = item.download ? false : false;

      if (!hasChildren) {
        itemIsActive =
          !item.download &&
          (pathname === basePath ||
            (basePath !== "/" && pathname.startsWith(basePath)));
      }

      const computedChildren =
        item.items?.map((sub) => {
          const childBasePath = sub.url.split("?")[0];
          let subIsActive = false;

          if (sub.download) {
            subIsActive = false;
          } else if (basePath === "/work") {
            const subFocus = getFocusFromHref(sub.url);
            subIsActive = pathname === "/work" && subFocus === currentFocus;
          } else {
            subIsActive = pathname === childBasePath;
          }

          if (subIsActive) itemIsActive = true;

          return {
            title: sub.title,
            url: sub.url,
            isActive: subIsActive,
            download: sub.download,
          };
        }) ?? [];

      if (hasChildren && !item.download) {
        const parentPathMatch =
          pathname === basePath ||
          (basePath !== "/" && pathname.startsWith(basePath));
        itemIsActive = itemIsActive || parentPathMatch;
      }

      return {
        ...item,
        basePath,
        hasChildren,
        isActive: itemIsActive,
        items: computedChildren,
      };
    });
  }, [items, pathname, currentFocus]);

  return (
    <nav aria-label="Primary navigation">
      <SidebarGroup
        className={cn(
          prefersReducedMotion
            ? ""
            : "overflow-hidden transition-opacity duration-150",
          isIdle && "opacity-95"
        )}
      >
        <SidebarGroupLabel className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
          Navigation
        </SidebarGroupLabel>

        <SidebarMenu className="mt-1.5 space-y-0.5">
          {computedItems.map((item) => (
            <NavRow key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </nav>
  );
});
