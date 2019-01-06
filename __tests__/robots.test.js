const Robot = require("../robots").Robot;
const planetGenerator = require("../planet-generator").planetGenerator;
const calculatePath = require("../robots").calculatePath;

test("create robot object form an input line ", () => {
  const robot = new Robot("1 1 E");
  expect(robot.x).toBe(1);

  expect(robot.y).toBe(1);

  expect(robot.direction).toEqual("E");
});

describe("Calculating path for different movement scenarios", () => {
  let map;

  beforeEach(() => {
    map = planetGenerator("5 3");
  });

  test("calculate path for Robot whose final position is equal to initial position", () => {
    const position = "1 1 E";
    const robot = new Robot(position);
    const expectedFinalLocation = position;
    expect(calculatePath(map, robot, "RFRFRFRF")).toEqual(
      expectedFinalLocation
    );
  });

  test("calculate path for Robot who was lost", () => {
    const position = "3 2 N";
    const robot = new Robot(position);
    const expectedFinalLocation = "3 3 N LOST";
    expect(calculatePath(map, robot, "FRRFLLFFRRFLL")).toEqual(
      expectedFinalLocation
    );
  });

  test("calculate path for Robot who wasn`t lost because of scent trace", () => {
    map[3][3] = 1;
    const position = "0 3 W";
    const robot = new Robot(position);
    const expectedFinalLocation = "2 3 S";
    expect(calculatePath(map, robot, "LLFFFLFLFL")).toEqual(
      expectedFinalLocation
    );
  });

  test("calculate path for Rover", () => {
    map = planetGenerator("5 5");
    const position = "1 2 N";
    const robot = new Robot(position);
    const expectedFinalLocation = "1 3 N";
    expect(calculatePath(map, robot, "LMLMLMLMM")).toEqual(
      expectedFinalLocation
    );
  });
});
