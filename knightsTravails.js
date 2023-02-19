function createGameBoard(boardSize) {
  const adjacencyList = new Map();

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const vertex = i * boardSize + j;
      const neighbors = getLegalMoves(i, j, boardSize).map(
        (move) => move[0] * boardSize + move[1]
      );
      adjacencyList.set(vertex, neighbors);
    }
  }

  return adjacencyList;
}

// Get all legal moves for a knight on a chess board
function getLegalMoves(x, y, boardSize) {
  const legalMoves = [
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
  ];

  // Filter out moves that are off the board
  return legalMoves.filter((move) => {
    const [x, y] = move;
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  });
}

const gameBoard = createGameBoard(8);

const knight = {
  x: 0,
  y: 0,
  moves: 0,
};

// Show the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way
function knightMoves(start, end) {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const startVertex = startX * 8 + startY;
  const endVertex = endX * 8 + endY;
  const queue = [{ vertex: startVertex, path: [startVertex] }];
  const visited = new Set();

  while (queue.length > 0) {
    // Get the vertex and path from the queue
    const { vertex, path } = queue.shift();

    // If the vertex is equal to the end vertex, return the path
    if (vertex === endVertex) {
      const shortestWay = path.map((vertex) => [
        Math.floor(vertex / 8),
        vertex % 8,
      ]);
      return (
        `You have made it from [${start}] to [${end}] in ${
          shortestWay.length - 1
        } moves!\nHere is your path: ` + `[${shortestWay.join("] -> [")}]\n`
      );
    }

    // If the vertex has not been visited, add it to the visited set and add its neighbors to the queue
    if (!visited.has(vertex)) {
      visited.add(vertex);
      const neighbors = gameBoard.get(vertex);
      neighbors.forEach((neighbor) => {
        queue.push({ vertex: neighbor, path: [...path, neighbor] });
      });
    }
  }
}

console.log(knightMoves([0, 0], [1, 2])); // You have made it from [0,0] to [1,2] in 1 moves! Here is your path: [0,0] -> [1,2]
console.log(knightMoves([0, 0], [3, 3])); // You have made it from [0,0] to [3,3] in 2 moves! Here is your path: [0,0] -> [1,2] -> [3,3]
console.log(knightMoves([3, 3], [0, 0])); // You have made it from [3,3] to [0,0] in 2 moves! Here is your path: [3,3] -> [2,1] -> [0,0]
console.log(knightMoves([3, 3], [4, 3])); // You have made it from [3,3] to [4,3] in 3 moves! Here is your path: [3,3] -> [4,5] -> [6,4] -> [4,3]
console.log(knightMoves([0, 0], [7, 7])); // You have made it from [0,0] to [7,7] in 6 moves! Here is your path: [0,0] -> [1,2] -> [2,4] -> [3,6] -> [4,4] -> [5,6] -> [7,7]
