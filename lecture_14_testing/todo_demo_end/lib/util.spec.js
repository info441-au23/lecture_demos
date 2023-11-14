import { calculateCompleted } from "./util.js";

describe("calculateCompleted", () => {
  let items = [];
  beforeEach(() => {
    items = [{}, { completed: true }];
  });

  it("should calculate a percentage", () => {
    const output = calculateCompleted(items);
    expect(output).toBe(0.5);
  });

  it("should handle an empty array without erroring", () => {
    const output = calculateCompleted([]);
    expect(output).toBe(0);
  });
});
