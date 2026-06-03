import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// We go i18n at home
class Formatter {
  private INTEGER_FORMATTER = new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  DATE_FORMATTER = new Intl.DateTimeFormat("fr-MA", { dateStyle: "short" });

  date(date: Date | string | number) {
    return this.DATE_FORMATTER.format(new Date(date));
  }

  currency(amount: number) {
    return this.INTEGER_FORMATTER.format(amount);
  }

  currencyType() {
    return this.INTEGER_FORMATTER.resolvedOptions().currency;
  }
}

export const formatter = new Formatter();
