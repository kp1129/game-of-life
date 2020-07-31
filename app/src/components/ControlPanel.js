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
      <h2>Control Panel</h2>
      <p>
        Set generation 0 by clicking on the individual cells or "random population."
      
      </p>
      <button onClick={handleRandomPopulation} type="button">
        random population
      </button>
      <br />
      <p>
        To see the next generation of the current population,
        click "see next generation."
      </p>
      <button onClick={handleNextGen} type="button">
        see next generation
      </button>
      <br />
      <p>
        Alternatively, start the simulation and watch how this population will
        change over time.
      </p>
      <button onClick={handleSimulation} type="button">
        {runningSimulation ? "stop simulation" : "start simulation"}
      </button>
      <button className="reset" onClick={handleReset} type="button">
        reset
      </button>
      <br />
      <br />
      <label htmlFor="speed-select">Choose simulation speed </label>
      <select defaultValue="1000" onChange={(e) => handleSpeedSelect(e)} id="speed-select">
        <option value="1000">slow</option>
        <option value="500">average</option>
        <option value="100">fast</option>
      </select>
      <br />
    </div>
  );
};

export default ControlPanel;
