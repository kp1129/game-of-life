import React from "react";

const ControlPanel = ({
  handleRandomPopulation,
  handleNextGen,
  handleSimulation,
  handleReset,
  handleSpeedSelect,
  runningSimulation,
}) => {
  return (
    <div className="control-panel">
      <h3>Control Panel</h3>
      <p>
        Click on the individual cells to set the population for generation 0, or
        use the "random population" button to set it randomly.
      </p>
      <button onClick={handleRandomPopulation} type="button">
        random population
      </button>
      <br />
      <p>
        To see what the next generation of this population would look like,
        click "see next generation."
      </p>
      <button onClick={handleNextGen} type="button">
        see next generation
      </button>
      <br />
      <p>
        Alternatively, start the simulation and sit back and watch how this
        population will change over time.
      </p>
      <div className="button-row">
        <button onClick={handleSimulation} type="button">
          {runningSimulation ? "stop simulation" : "start simulation"}
        </button>
        <button className="reset" onClick={handleReset} type="button">
          reset
        </button>
      </div>
      <br />
      <br />
      <label htmlFor="speed-select">Choose simulation speed </label>
      <select onChange={(e) => handleSpeedSelect(e)} id="speed-select">
        <option selected value="1000">
          slow
        </option>
        <option value="500">average</option>
        <option value="100">fast</option>
      </select>
      <br />
    </div>
  );
};

export default ControlPanel;
