import React, { useState } from "react";

import "./App.css";

const App = () => {
  // set the size of the grid
  const numRows = 10;
  const numCols = 10;

  const emptyGrid = () => {
    const outer_array = [];
    for (let i = 0; i < numRows; i++) {
      const inner_array = [];
      for (let j = 0; j < numCols; j++) {
        inner_array.push(0);
      }
      outer_array.push(inner_array);
    }
    return outer_array;
  };

  const [grid, setGrid] = useState(emptyGrid());
  const [generation, setGeneration] = useState(0);
  const neighborCoordinates = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, 0],
    [-1, 0]
  ];

  const runSimulation = () => {
    let nextGeneration = generation + 1;
    setGeneration(nextGeneration);
    let nextGenGrid = emptyGrid();
    
    for(let i = 0; i < numRows; i++){
      for(let j = 0; j < numCols; j++){
        // count up neighbors
        let neighbors = 0;
        // calculate neighbor coordinates
        neighborCoordinates.forEach(([x, y]) => {
          let newX = x + i;
          let newY = y + j;
          // if the new coordinates are in the grid
          // (not below 0 or greater than numRows/numCols limit)
          // count them as a neighbor and
          // add their value to neighbors
          if(newX >= 0 && newX < numRows && newY >= 0 && newY < numCols){
            neighbors += grid[newX][newY];
          }
        });
        // change cell state according to game logic
        // if there are fewer than 2 or more than 3 neighbors,
        // cell dies
        if(neighbors < 2 || neighbors > 3){
          nextGenGrid[i][j] = 0;
        } 
        // any cell with exactly 3 neighbors will either 
        // be born or survive from previous generation
        else if (neighbors === 3){
          nextGenGrid[i][j] = 1;
        } 
        // otherwise, the next generation looks the same
        else {
          nextGenGrid[i][j] = grid[i][j]
        }
      }
    }
    setGrid(nextGenGrid);
  }

  const handleCellClick = (x, y) => {
    // toggle cell value between 0 and 1
    setGrid([...grid], (grid[x][y] = grid[x][y] === 0 ? 1 : 0));
  };

  const handleNextGen = () => {
    // run simulation once
    runSimulation();
  }

  return (
    <>
    <h1>Generation: {generation}</h1>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 25px)`,
      }}
    >
      {grid.map((arr, i) => {
        return arr.map((cell, j) => {
          return (
            <div
              key={`${i}--${j}`}
              onClick={() => handleCellClick(i, j)}
              style={{
                border: "1px solid black",
                width: "25px",
                height: "25px",
                backgroundColor: grid[i][j] === 1 ? "indianred" : "",
              }}
            />
          );
        });
      })}
      
    </div>
    <button onClick={handleNextGen} type="button">see next generation</button>
    </>
  );
};

export default App;
