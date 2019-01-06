const readline = require("readline");
const planetGenerator = require("./planet-generator").planetGenerator;
const Robot = require("./robots").Robot;
const calculatePath = require("./robots").calculatePath;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const INPUT_STAGES = {
  MAP: 1,
  ROBOT_POSITION: 2,
  DIRECTIONS: 3
};

let currentStage = 1;
let currentRobot;
let planetMap;
console.log('Provide map dimension')

rl.on("line", line => {
  switch (currentStage) {
    case INPUT_STAGES.MAP:
      planetMap = planetGenerator(line);
      currentStage = 2;
      console.log('Provide first robot initial positions')
      break;
    case INPUT_STAGES.ROBOT_POSITION:
      currentRobot = new Robot(line);
      currentStage = 3;
      console.log('Provide path instructions')
      break;
    case INPUT_STAGES.DIRECTIONS:
      console.log('This robot last known position is')
      console.log(calculatePath(planetMap, currentRobot, line));
      currentStage = 2;
      console.log('Provide next robot initial position')
      break;
  }
});
