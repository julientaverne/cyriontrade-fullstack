/**
 * JTA___ DO DOCS
 * Example: ...
 */
export function calculateSMA(data, period) {
    if (!Array.isArray(data) || period <= 0 || data.length < period) {
      return [];
    }
  
    const result = [];
  
    for (let index = period - 1; index < data.length; index += 1) {
      const slice = data.slice(index - period + 1, index + 1);
      const sum = slice.reduce((acc, point) => acc + point.value, 0);
  
      result.push({
        time: data[index].time,
        value: Number((sum / period).toFixed(2)),
      });
    }
  
    return result;
  }

/**
 * JTA___ DO DOCS
 * Example: ...
*/
export function calculateEMA(data, period) {
if (!Array.isArray(data) || period <= 0 || data.length < period) {
    return [];
}

const multiplier = 2 / (period + 1);
const initialSlice = data.slice(0, period);
const initialSma =
    initialSlice.reduce((acc, point) => acc + point.value, 0) / period;

const result = [
    {
    time: data[period - 1].time,
    value: Number(initialSma.toFixed(2)),
    },
];

let previousEma = initialSma;

for (let index = period; index < data.length; index += 1) {
    const current = data[index].value;
    const ema = current * multiplier + previousEma * (1 - multiplier);

    result.push({
    time: data[index].time,
    value: Number(ema.toFixed(2)),
    });

    previousEma = ema;
}

return result;
}