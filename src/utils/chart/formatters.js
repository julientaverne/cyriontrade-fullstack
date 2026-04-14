/**
 * JTA___ DO DOCS
 * Example: ...
 */
export function formatChartTime(time, days) {
    if (!time) {
      return "";
    }
  
    const date = new Date(Number(time) * 1000);
  
    if (days === 1) {
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
  
      hours = hours % 12 || 12;
  
      return `${hours}:${minutes} ${period}`;
    }
  
    return date.toLocaleDateString();
  }
 
/**
 * JTA___ DO DOCS
 * Example: ...
 */
export function formatPrice(value, currency) {
if (value === undefined || Number.isNaN(value)) {
    return "-";
}

return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value > 1000 ? 0 : 2,
}).format(value);
}