import React, {useState} from 'react';

import './App.css';

const App = () => {

  // set the size of the grid
  
  const numRows = 10;
  const numCols = 10;

  const emptyGrid = () => {
    const outer_array = [];
    for(let i = 0; i < numRows; i++){
      const inner_array = [];
      for(let j = 0; j < numCols; j++){
        inner_array.push(0);
      }
      outer_array.push(inner_array);
    }
    return outer_array;
  }

  const [grid, setGrid] = useState(emptyGrid());

  const handleCellClick = (x, y) => {
    // toggle cell value between 0 and 1
    setGrid([...grid], grid[x][y] = (grid[x][y] === 0 ? 1 : 0));
  }

  return (
  <div style={{display: "grid", gridTemplateColumns: `repeat(${numCols}, 25px)`}}>
    {grid.map((arr, i) => {
      
      return arr.map((cell, j) => {
      return <div key={`${i}--${j}`} onClick={() => handleCellClick(i, j)} style={{border: "1px solid black", width: "25px", height: "25px", backgroundColor: grid[i][j] === 1 ? "indianred" : ""}}/>})})}
  </div>
  );
}

export default App;
