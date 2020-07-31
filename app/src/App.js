import React, { useState, useEffect, useCallback } from "react";
import Rules from "./Rules";
import ControlPanel from "./ControlPanel";
import "./App.css";

const App = () => {
  // set the size of the grid
  const numRows = 25;
  const numCols = 25;

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
  // the grid
  const [grid, setGrid] = useState(emptyGrid());
  // generation counter
  const [generation, setGeneration] = useState(0);
  // simulation speed controls, defaults to slow
  const [speed, setSpeed] = useState(1000);
  // start/stop simulation flag
  const [runningSimulation, setRunningSimulation] = useState(false);

  // this helps to calculate neighbors painlessly
  const neighborCoordinates = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, 0],
    [-1, 0],
  ];

  const runSimulation = useCallback(() => {
    // increment generation
    let nextGeneration = generation + 1;
    setGeneration(nextGeneration);

    // make a new grid
    let nextGenGrid = emptyGrid();
    let oldGridCopy = [...grid];
    // iterate over the current grid
    // to calculate new values
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
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
          if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            neighbors += oldGridCopy[newX][newY];
          }
        });
        // change cell state according to game logic
        // if there are fewer than 2 or more than 3 neighbors,
        // cell dies
        if (neighbors < 2 || neighbors > 3) {
          nextGenGrid[i][j] = 0;
        }
        // any cell with exactly 3 neighbors will either
        // be born or survive from previous generation
        else if (neighbors === 3) {
          nextGenGrid[i][j] = 1;
        }
        // otherwise, the next generation looks the same
        else {
          nextGenGrid[i][j] = oldGridCopy[i][j];
        }
      }
    }
    setGrid(nextGenGrid);
  });

  useEffect(() => {
    if (runningSimulation === false) {
      return;
    }
    const timer = setInterval(() => {
      runSimulation();
    }, speed);
    return () => clearInterval(timer);
  }, [runSimulation, runningSimulation]);

  const handleCellClick = (x, y) => {
    // toggle cell value between 0 and 1
    setGrid([...grid], (grid[x][y] = grid[x][y] === 0 ? 1 : 0));
  };

  const handleNextGen = () => {
    // run simulation once
    runSimulation();
  };

  const handleSimulation = () => {
    setRunningSimulation(!runningSimulation);
  };

  const handleReset = () => {
    // reset the grid, generation counter,
    // and the running simulation flag
    setRunningSimulation(false);
    setGeneration(0);
    setGrid(emptyGrid());
  };

  const handleSpeedSelect = (e) => {
    let newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  };

  const handleRandomPopulation = () => {
    setGeneration(0);
    const outer_array = [];
    for (let i = 0; i < numRows; i++) {
      const inner_array = [];
      for (let j = 0; j < numCols; j++) {
        inner_array.push(Math.random() > 0.7 ? 1 : 0);
      }
      outer_array.push(inner_array);
    }
    setGrid(outer_array);
  };

  return (
    <div className="app">
      <h1>Generation: {generation}</h1>
      <div className="grid-container">
        {grid.map((arr, i) => {
          return arr.map((cell, j) => {
            return (
              <div
                className="cell"
                key={`${i}--${j}`}
                // onClick only works if not running simulation
                onClick={
                  runningSimulation ? undefined : () => handleCellClick(i, j)
                }
                style={{
                  backgroundColor: grid[i][j] === 1 ? "indianred" : "",
                }}
              />
            );
          });
        })}
      </div>

      <ControlPanel
        handleRandomPopulation={handleRandomPopulation}
        handleNextGen={handleNextGen}
        handleSimulation={handleSimulation}
        handleReset={handleReset}
        handleSpeedSelect={handleSpeedSelect}
        runningSimulation={runningSimulation}
      />
      <Rules />
    </div>
  );
};

export default App;
