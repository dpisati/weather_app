import React from "react";

const Form = props => (
  <div className="inputcontainer">
    <form onSubmit={props.getWeather}>
      <div className="group">
        <input type="text" name="city" autocomplete="off" required />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>City</label>
      </div>
      <button>Get Weather</button>
    </form>
  </div>
);

export default Form;
