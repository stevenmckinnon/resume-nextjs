import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export function calculateYearsOfExperience(date: string): number {
  const startDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - startDate.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** A date as a count of months, so two dates can be subtracted. */
export function monthIndex(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}

/** Reads the "February 2024" format used throughout resume.tsx. */
export function parseMonthYear(value: string): number {
  const [month = "", year = ""] = value.split(" ");
  const index = MONTH_NAMES.indexOf(month);
  if (index === -1 || !/^\d{4}$/.test(year)) {
    throw new Error(`Expected a date like "February 2024", got "${value}"`);
  }
  return Number(year) * 12 + index;
}

export function formatMonthIndex(index: number): string {
  return `${MONTH_NAMES[index % 12]} ${Math.floor(index / 12)}`;
}

/** "2 years, 9 months". Written out so it reads properly aloud. */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "month" : "months"}`);
  return parts.join(", ") || "Under a month";
}
