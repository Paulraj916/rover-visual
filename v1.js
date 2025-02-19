const directions = ["N", "E", "S", "W"]

export function isValidPosition(position, grid) {
  const [x, y, direction] = position
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0
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
  if (!isTurn(instruction)) {
    throw new Error("Invalid turn instruction. Must be 'L' or 'R'.")
  }

  let direction = directionMap[initialDirection]
  direction = instruction === "L" ? (direction + 3) % 4 : (direction + 1) % 4

  return directions[direction]
}

export function inputParser(input) {
  try {
    const lines = input.split("\n")
    const grid = lines[0].split(" ").map(Number)
    const obstacleCount = Number(lines[1])
    const obstacles = []
    for (let i = 2; i < obstacleCount + 2; i++) {
      obstacles.push(lines[i].split(" ").map(Number))
    }
    const count = Number(lines[obstacleCount + 2])
    const roverPos = []
    const commands = []
    for (let i = obstacleCount + 3; i < lines.length; i += 2) {
      const [x, y, dir] = lines[i].split(" ")
      roverPos.push([Number(x), Number(y), dir.trim()])
      commands.push(lines[i + 1].trim())
    }
    return { grid, obstacles, count, roverPos, commands }
  } catch (err) {
    console.error("Error parsing input:", err)
    return null
  }
}

