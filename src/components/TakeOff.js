import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";

import AirportData from "./AirportData";
import ResultModal from "./ResultTOModal";
import calculate from "../helpers/calculateTO";

class TakeOffCalc extends React.Component {
  constructor(props) {
    super(props);
    this.handleAirportdata = this.handleAirportdata.bind(this);
    this.state = {
      weight: {
        totalWeightkg: sessionStorage.getItem("totalWeightkg")
          ? sessionStorage.getItem("totalWeightkg")
          : 0,
        totalWeightlbs: sessionStorage.getItem("totalWeightlbs")
          ? sessionStorage.getItem("totalWeightlbs")
          : 0,
        aboveMTWO: sessionStorage.getItem("aboveMTWO")
          ? sessionStorage.getItem("aboveMTWO")
          : false
      },
      airportData: {},
      result: {},
      readytoCalc: false,
      showResultModal: false
    };
  }

  handleAirportdata(airportData) {
    this.setState({ airportData, readytoCalc: true });
  }

  closeOptionModal = () => {
    this.setState(() => ({
      showResultModal: false
    }));
  };

  render() {
    return (
      <div>
        <AirportData handleAirportdata={this.handleAirportdata} />
        <br />
        <div className="container">
          <div className="widget-header">
            <h3 className="widget-header__title">Aircraft</h3>
          </div>
          <Formik
            initialValues={{
              totalWeight: this.state.weight.totalWeightlbs
            }}
            onSubmit={(values, actions) => {
              const totalWeight = values.totalWeight;
              const elevation = this.state.airportData.navData.elevation;
              const temperature = this.state.airportData.weatherData.temp;
              const result = calculate(elevation, totalWeight, temperature);
              this.setState({ result });
              this.setState({ showResultModal: true });
              totalWeight <= 17986
                ? this.setState({ weight: { aboveMTWO: false } })
                : this.setState({ weight: { aboveMTWO: true } });
            }}
            render={props => (
              <form onSubmit={props.handleSubmit}>
                <div className="option">
                  <label className="option__text">
                    Takeoff Weight (in lbs)
                  </label>
                  <Field className="input-box" type="text" name="totalWeight" />
                </div>
                <div className="option">
                  <label className="option__text">Ice protection</label>
                  <span className="input-box__disabled">OFF</span>
                </div>
                <div className="option">
                  <label className="option__text">Flaps</label>
                  <span className="input-box__disabled">Flaps 1</span>
                </div>
                <div className="option__bottom">
                  <button
                    className="big-button"
                    type="submit"
                    disabled={!this.state.readytoCalc}
                  >
                    Calculate
                  </button>
                </div>
              </form>
            )}
          />
        </div>
        <ResultModal
          showResultModal={this.state.showResultModal}
          closeOptionModal={this.closeOptionModal}
          rwy={this.state.result.rwy}
          v1={this.state.result.v1}
          vr={this.state.result.vr}
          v2={this.state.result.v2}
          longestRwy={
            this.state.airportData.navData
              ? this.state.airportData.navData.longestRwyLength
              : null
          }
          aboveMTWO={this.state.weight.aboveMTWO}
        />
      </div>
    );
  }
}

export default TakeOffCalc;
