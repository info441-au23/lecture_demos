import { calculateCompleted } from "./util.js";

test("calculates a percentage", () => {
  const output = calculateCompleted([{}, { completed: true }]);
  expect(output).toBe(0.5);
});
