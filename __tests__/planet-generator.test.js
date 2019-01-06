const planetGenerator = require("../planet-generator").planetGenerator;

describe("Generate mars maps according to given sizes", () => {
  test("generate square map", () => {
    const generated = planetGenerator("3 3");
    expect(generated.length).toBe(4);
    const allRowsLengthIsCorrect = generated.every(row => row.length === 4);
    expect(allRowsLengthIsCorrect).toBe(true);
  });
  test("generate rectangular map with X (columns) coordinates larger than X (rows) ", () => {
    const generated = planetGenerator("5 2");
    expect(generated.length).toBe(3);
    const allRowsLengthIsCorrect = generated.every(row => row.length === 6);
    expect(allRowsLengthIsCorrect).toBe(true);
  });
});
