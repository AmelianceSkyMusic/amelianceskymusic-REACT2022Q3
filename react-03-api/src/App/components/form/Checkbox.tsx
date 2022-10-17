import React, { Component } from 'react';

export class Checkbox extends Component {
  render() {
    return (
      <>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label htmlFor="vehicle1">I have a bike</label>
      </>
    );
  }
}
