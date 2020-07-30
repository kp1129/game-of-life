import React, {useState} from 'react';

import './App.css';

const App = () => {

  // set the size of the grid
  
  const numRows = 10;
  const numCols = 10;

  const emptyGrid = () => {
    const outer_array = []
    for(let i = 0; i < numRows; i++){
      const inner_array = []
      for(let j = 0; j < numCols; j++){
        inner_array.push(0);
      }
      outer_array.push(inner_array);
    }
    console.log(outer_array);
    return outer_array;
  }

  const [grid, setGrid] = useState(emptyGrid());


  return (
  <div style={{display: "grid", gridTemplateColumns: `repeat(${numCols}, 25px)`}}>
    {grid.map(array => array.map(cell => <div style={{border: "1px solid black", width: "25px", height: "25px"}}></div>))}
  </div>
  );
}

export default App;
