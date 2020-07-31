import React from "react";

const Rules = () => {
  return (
    <div>
      <h3>Rules</h3>
      <p>Any empty cell with 3 live neighbors becomes a live cell (reproduction).</p>
      <p>Any live cell with fewer than 2 neighbors dies from underpopulation.</p>
      <p>Any live cell with more than 3 neighbors dies from overpopulation.</p>
      <p>Only the live cells that have 2 or 3 live neighbors survive to the next generation.</p>
      
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more about Conway's Game of Life
      </a>
    </div>
  );
};

export default Rules;
