// LupinIcons.tsx
// Generic SVG icon set for Lupin CRM (React – web)

import * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

/** Base SVG wrapper */
function SvgIcon({
  size = 24,
  strokeWidth = 2,
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ─────────────────────────
 * Core Icons for the Modal
 * ───────────────────────── */

export const IconSunrise: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    {/* sun */}
    <circle cx="12" cy="10" r="3.5" />
    {/* rays */}
    <path d="M12 3.5v2" />
    <path d="M6 6l1.4 1.4" />
    <path d="M18 6l-1.4 1.4" />
    {/* horizon and ground */}
    <path d="M4 16h16" />
    <path d="M7 19h10" />
  </SvgIcon>
);

/** Small trend / analytics arrow (for “Your Priorities for Today”) */
export const IconTrendUp: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <polyline points="4 17 10 11 14 15 20 9" />
    <polyline points="14 9 20 9 20 15" />
  </SvgIcon>
);

/** Generic home icon (from your earlier layout) */
export const IconHome: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M3 12l9-8 9 8" />
    <path d="M5 10v8a2 2 0 002 2h3v-5a2 2 0 012-2h2a2 2 0 012 2v5h3a2 2 0 002-2v-8" />
  </SvgIcon>
);

/** Check in circle – used for success / “On track” */
export const IconCheckCircle: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12.5l2 2 4-4" />
  </SvgIcon>
);

/** Alert circle – used for warning / process issues */
export const IconAlertCircle: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4" />
    <circle cx="12" cy="16" r="0.75" fill="currentColor" stroke="none" />
  </SvgIcon>
);

/** Clipboard / hygiene / tasks */
export const IconClipboard: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <rect x="7" y="5" width="10" height="14" rx="2" />
    <path d="M9 5V4a2 2 0 012-2h2a2 2 0 012 2v1" />
    <path d="M10 11h4" />
    <path d="M10 14h3" />
  </SvgIcon>
);

/** Calendar – used in “Today’s Visit Plan” */
export const IconCalendar: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M4 10h16" />
  </SvgIcon>
);

/** User circle – doctor avatar */
export const IconUserCircle: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 17.5a6 6 0 0 1 11 0" />
  </SvgIcon>
);

/** Clock – visit time */
export const IconClock: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </SvgIcon>
);

/** Spark / AI icon – for “AI Recommendations / Smart Insights” */
export const IconSparkles: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M6 10l1.2-3.2L10 5.5 7.2 4 6 1l-1.2 3L2 5.5l2.8 1.3L6 10z" />
    <path d="M18 21l1-2.5 2.5-1L19 16l-1-2.5L17 16l-2.5 1.5L17 18.5 18 21z" />
    <path d="M13 12.5l.6-1.5 1.6-.7-1.6-.7L13 8.1l-.6 1.5-1.6.7 1.6.7.6 1.5z" />
  </SvgIcon>
);

/** Route / navigation icon – “Optimal Route Suggested” */
export const IconRoute: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="7" cy="6" r="2.2" />
    <circle cx="17" cy="18" r="2.2" />
    <path d="M9 6h3a5 5 0 0 1 5 5v1.5" />
    <path d="M7 8.2V10a4 4 0 0 0 4 4h2" />
  </SvgIcon>
);

/** Upward opportunity arrow – “High-Value Opportunity” */
export const IconArrowUpRight: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M7 17L17 7" />
    <polyline points="9 7 17 7 17 15" />
  </SvgIcon>
);

/** Circular check – button “Start My Day” */
export const IconButtonCheck: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.5 12.5l2.3 2.3L16 9.5" />
  </SvgIcon>
);

/** Plan / list icon – button “View Full Plan” */
export const IconPlan: React.FC<IconProps> = (props) => (
  <SvgIcon {...props}>
    <rect x="4" y="5" width="16" height="14" rx="2" />
    <path d="M8 9h8" />
    <path d="M8 13h6" />
    <path d="M8 17h4" />
  </SvgIcon>
);

/* You can export them as a map if that’s convenient */

export const LupinIcons = {
  Sunrise: IconSunrise,
  TrendUp: IconTrendUp,
  Home: IconHome,
  CheckCircle: IconCheckCircle,
  AlertCircle: IconAlertCircle,
  Clipboard: IconClipboard,
  Calendar: IconCalendar,
  UserCircle: IconUserCircle,
  Clock: IconClock,
  Sparkles: IconSparkles,
  Route: IconRoute,
  ArrowUpRight: IconArrowUpRight,
  ButtonCheck: IconButtonCheck,
  Plan: IconPlan,
};

export default LupinIcons;
