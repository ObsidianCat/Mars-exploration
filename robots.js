const DIRECTIONS = {
  LEFT: 'L',
  RIGHT: 'R'
}

class Robot {
  constructor(position) {
    position = position.trim().split(" ");
    this.x = Number(position[0]);
    this.y = Number(position[1]);
    this.direction = position[2];

    //Following is translation of planet direction to ordinary matrix orientation
    //D - Down, L - Left, U - Up, R - Right
    //           ["D", "L", "U", "R"]
    this.sides = ["N", "E", "S", "W"];
  }

  getFormattedPosition() {
    return `${this.x} ${this.y}`;
  }
  getDirection() {
    return this.direction;
  }

  rotate(direction){
    const modifier = direction === DIRECTIONS.LEFT? -1 : 1
    const possible = this.sides.indexOf(this.direction) + modifier;

    if (possible >= this.sides.length) {
      this.direction = this.sides[0];
    } else if(possible < 0){
      this.direction = this.sides[this.sides.length -1];
    }
    else {
      this.direction = this.sides[possible];
    }

    return this.direction;
  }

  calcNextPosition() {
    const coords = {
      col: this.x,
      row: this.y
    };
    switch (this.direction) {
      case "E":
        // Going right, instead of left
        coords.col++;
        break;
      case "S":
        // Up
        coords.row--;
        break;
      case "W":
        // Going left, instead of right
        coords.col--;
        break;
      case "N":
        // Down
        coords.row++;
        break;
    }
    return coords;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

function calculatePath(map, robot, directions) {
  let rotationOnly = false;
  for (let i = 0; i < directions.length; i++) {
    const curChar = directions[i];
    if (curChar === DIRECTIONS.RIGHT || curChar == DIRECTIONS.LEFT) {
      robot.rotate(curChar);
    } else if (!rotationOnly) {
      //It is moving direction and robot can move (not frightened by smell sign)
      let pos = robot.calcNextPosition();
      const isBeyondTheMap =
        pos.col < 0 ||
        pos.row < 0 ||
        pos.col >= map[0].length ||
        pos.row >= map.length;

      if (isBeyondTheMap) {
        //leave scent
        /*TODO Don`t use direct access to robot.x and robox.y values*/
        map[robot.y][robot.x] = 1;
        return `${robot.getFormattedPosition()} ${robot.getDirection()} LOST`;
      }

      const nextHasScentTrace = map[pos.row][pos.col] === 1;
      if (nextHasScentTrace) {
        //Stopped by scent, no move movements, only rotation
        rotationOnly = true;
        continue;
      }

      robot.setPosition(pos.col, pos.row);
    }
  }
  return `${robot.getFormattedPosition()} ${robot.getDirection()}`;
}

exports.Robot = Robot;
exports.calculatePath = calculatePath;
