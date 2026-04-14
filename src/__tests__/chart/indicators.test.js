/**
 * Technical indicator utility test suite.
 *
 * These tests validate the core mathematical helpers used to derive
 * overlay series from normalized price data.
 *
 * Why this suite matters:
 * - SMA and EMA are foundational chart overlays in this exercise
 * - errors here would propagate directly into chart rendering and tooltip values
 * - keeping these calculations covered at the utility level makes failures
 *   easier to diagnose than if they only surfaced through component tests
 *
 * Coverage strategy:
 * - validate nominal calculation behavior
 * - verify defensive behavior for invalid inputs
 * - ensure the helpers remain pure and do not mutate their source dataset
 */

import { calculateSMA, calculateEMA } from "../../utils/chart/indicator";

const sampleData = [
  { time: 1, value: 10 },
  { time: 2, value: 20 },
  { time: 3, value: 30 },
  { time: 4, value: 40 },
  { time: 5, value: 50 },
];

describe("calculateSMA", () => {
  it("calculates SMA correctly", () => {
    expect(calculateSMA(sampleData, 3)).toEqual([
      { time: 3, value: 20 },
      { time: 4, value: 30 },
      { time: 5, value: 40 },
    ]);
  });

  it("returns empty array for invalid period", () => {
    expect(calculateSMA(sampleData, 0)).toEqual([]);
  });

  it("returns empty array when dataset is shorter than period", () => {
    expect(calculateSMA(sampleData, 10)).toEqual([]);
  });

  it("does not mutate the input", () => {
    const original = [...sampleData];
    calculateSMA(sampleData, 3);
    expect(sampleData).toEqual(original);
  });
});

describe("calculateEMA", () => {
  it("calculates EMA and starts from initial SMA", () => {
    const result = calculateEMA(sampleData, 3);

    expect(result[0]).toEqual({ time: 3, value: 20 });
    expect(result).toHaveLength(3);
  });

  it("returns empty array for invalid period", () => {
    expect(calculateEMA(sampleData, 0)).toEqual([]);
  });

  it("returns empty array when dataset is shorter than period", () => {
    expect(calculateEMA(sampleData, 10)).toEqual([]);
  });

  it("does not mutate the input", () => {
    const original = [...sampleData];
    calculateEMA(sampleData, 3);
    expect(sampleData).toEqual(original);
  });
});
