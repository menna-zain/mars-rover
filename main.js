// entre the information
function createRover(x, y, direction, obstacles = []) {
    return { x, y, direction, obstacles };
}

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];



function hasObstacle(rover) {
    return rover.obstacles.some(([obstacleX, obstacleY]) => obstacleX === rover.x && obstacleY === rover.y);
}



function moveRover(rover, command) {
    let prevX = rover.x, prevY = rover.y;

    switch (command) {
        case 'F':
            if (rover.direction === "NORTH") rover.y += 1;
            else if (rover.direction === "SOUTH") rover.y -= 1;
            else if (rover.direction === "EAST") rover.x += 1;
            else if (rover.direction === "WEST") rover.x -= 1;
            break;

        case 'B':
            if (rover.direction === "NORTH") rover.y -= 1;
            else if (rover.direction === "SOUTH") rover.y += 1;
            else if (rover.direction === "EAST") rover.x -= 1;
            else if (rover.direction === "WEST") rover.x += 1;
            break;

        case 'L':
            let leftIndex = (directions.indexOf(rover.direction) - 1 + 4) % 4;
            rover.direction = directions[leftIndex];
            break;

        case 'R':
            let rightIndex = (directions.indexOf(rover.direction) + 1) % 4;
            rover.direction = directions[rightIndex];
            break;
    }

    if (hasObstacle(rover)) {
        console.log(`(${rover.x}, ${rover.y}) is Collision `);
        rover.x = prevX;
        rover.y = prevY;
        return false; //  yatawakf 2l-tanfez 
    }

    return true; 
}


function executeCommands(rover, commands) {
    for (let command of commands) {
        let canMove = moveRover(rover, command);
        // lw 7asal tasadom
        if (!canMove) break;
    }
}

function getPosition(rover) {
    return `(${rover.x}, ${rover.y}) ${rover.direction}`;
}

//! Test
let rover = createRover(4, 2, "EAST", [[9, 4], [3, 4], [6, 4]]);
executeCommands(rover, "FLFFFRFLB");
console.log(getPosition(rover));
