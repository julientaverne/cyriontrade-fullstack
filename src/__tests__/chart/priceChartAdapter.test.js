import { normalizePriceData } from "../../utils/chart/priceChartAdapter";

describe("normalizePriceData", () => {
  it("sorts price data by timestamp ascending", () => {
    const input = [
      [2000, 20],
      [1000, 10],
      [3000, 30],
    ];

    expect(normalizePriceData(input)).toEqual([
      { time: 1, value: 10 },
      { time: 2, value: 20 },
      { time: 3, value: 30 },
    ]);
  });

  it("returns an empty array for empty input", () => {
    expect(normalizePriceData([])).toEqual([]);
  });

  it("casts price values to numbers", () => {
    const input = [[1000, "42.5"]];

    expect(normalizePriceData(input)).toEqual([{ time: 1, value: 42.5 }]);
  });

  it("keeps already sorted data stable", () => {
    const input = [
      [1000, 10],
      [2000, 20],
    ];

    expect(normalizePriceData(input)).toEqual([
      { time: 1, value: 10 },
      { time: 2, value: 20 },
    ]);
  });
});