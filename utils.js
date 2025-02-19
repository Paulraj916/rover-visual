const directions = ["N", "E", "S", "W"]

export function isValidPosition(position, grid) {
  const [x, y, direction] = position
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0
}

export function notificationTrigger(message) {
  function showNotification() {
    new Notification("MarsRover", {
        body: message,
    });
}

  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
          if (permission === "granted") {
              showNotification();
          } else {
              alert("Notification permission denied.");
          }
      });
  } else {
      alert("Notification permission denied.");
  }
}


export function wrapPosition(resPosition, height, width) {
  if (resPosition[0] < 0) {
    resPosition[0] = height - 1
  } else if (resPosition[0] >= height) {
    resPosition[0] = 0
  }
  if (resPosition[1] < 0) {
    resPosition[1] = width - 1
  } else if (resPosition[1] >= width) {
    resPosition[1] = 0
  }
  return resPosition
}

export function isTurn(instruction) {
  return instruction === "L" || instruction === "R"
}

export function isMove(instruction) {
  return instruction === "F" || instruction === "B"
}

export function triggerMove(instruction, grid, roverPos) {
  let resPos = [...roverPos]
  const direction = roverPos[2]
  if (instruction === "F") {
    if (direction === "N") resPos[0]++
    else if (direction === "S") resPos[0]--
    else if (direction === "E") resPos[1]++
    else if (direction === "W") resPos[1]--
  } else {
    if (direction === "N") resPos[0]--
    else if (direction === "S") resPos[0]++
    else if (direction === "E") resPos[1]--
    else if (direction === "W") resPos[1]++
  }
  resPos = wrapPosition(resPos, grid.length, grid[0].length)
  if (!isValidPosition(resPos, grid)) return roverPos
  return resPos
}

export function triggerTurn(instruction, initialDirection) {
  const directionMap = { N: 0, E: 1, S: 2, W: 3 }
  // if (!isTurn(instruction)) {
  //   notificationTrigger( "Invalid turn instruction. Must be 'L' or 'R'.")
  //   // throw new Error("Invalid turn instruction. Must be 'L' or 'R'.")
  // }

  let direction = directionMap[initialDirection]
  direction = instruction === "L" ? (direction + 3) % 4 : (direction + 1) % 4

  return directions[direction]
}

export function inputParser(input) {
  try {
    if(!input){
      notificationTrigger("Input is empty");
      return
    }
    const lines = input.split("\n")
    const grid = lines[0].split(" ").map(Number)
    if(grid.length  !== 2 || isNaN(grid[0]) && grid[0]<=0 || isNaN(grid[1])&& grid[1]<=0 ){
      notificationTrigger("Grid is Invalid")
      return
    }console.log(grid);
    
    const obstacleCount = Number(lines[1])
    if(obstacleCount<0 &&  !obstacleCount || isNaN(obstacleCount)){
      notificationTrigger("obstacleCount is Invalid")
      return
    }
    const obstacles = []
    for (let i = 2; i < obstacleCount + 2; i++) {
      let obstacle = lines[i].split(" ").map(Number);
      if (obstacle.length !== 2 ||obstacle[0]<0||obstacle[1]<0|| isNaN(obstacle[0]) || isNaN(obstacle[1]) || obstacle[0]>=grid[0] || obstacle[1] >= grid[1]) {
        notificationTrigger(`Invalid obstacle`);
        return
      }
      obstacles.push(obstacle)
      console.log("hu",obstacles);
      
    }
    const count = Number(lines[obstacleCount + 2])
    if(count<0 && !count || isNaN(count)){
      notificationTrigger("Rover Count is Invalid");
      return
    }
    console.log("Line",lines.length);
    
    const roverPos = []
    const commands = []
    for (let i = obstacleCount + 3; i < lines.length-1; i += 2) {
      let [x, y, dir] = lines[i].split(" ")
      dir = dir.toUpperCase();
      console.log("dir: ",dir,x,y)
      if (isNaN(x) || isNaN(y) || !directions.includes(dir)) {
        notificationTrigger(`Invalid rover position at line ${i+1}`)
        return
      }
      if(!Array.from(lines[i + 1].trim()).every((char)=>"LRFBlrfb".includes(char))){
        notificationTrigger(`Invalid command at line ${i + 2}`);
      }
      roverPos.push([Number(x), Number(y), dir.trim()])
      commands.push(lines[i + 1].trim().toUpperCase())
      console.log(roverPos , commands);
      
    }
    console.log("vbn");
    
    console.log("log",grid, obstacles, count, roverPos, commands);
    return{grid, obstacles, count, roverPos, commands};
    
  } catch (err) {
    notificationTrigger("Error parsing input:", err)
    // console.error()
    return
  }
}

