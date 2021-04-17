import React from "react";
import { Formik, Field } from "formik";

import ResultModal from "./ResultWBModal";
import calculate from "../helpers/calculateWB";

class WeightBalanceCalc extends React.Component {
  state = {
    results: {
      macIndex: 0,
      totalWeightkg: 0,
      totalWeightlbs: 0,
      takeOffTrim: {
        flap1: 0,
        flap2: 0
      },
      aboveMTWO: false
    },
    showResultModal: false,
    collapsedPax: false
  };

  closeOptionModal = () => {
    this.setState(() => ({
      showResultModal: false
    }));
  };

  redirectTakeoff = () => {
    this.props.history.push("/takeoff");
  };

  toggle = () => {
    this.setState({
      collapsedPax: !this.state.collapsedPax
    });
  };

  render() {
    return (
      <div>
        <div>
          <div className="container">
            <div className="widget-header">
              <h3 className="widget-header__title">Weight input (in lbs)</h3>
            </div>
            <Formik
              initialValues={{
                bew: 11354,
                fwdbgg: 100,
                pilot: 190,
                copilot: 0,
                pax1l: 0,
                pax1r: 0,
                pax2l: 0,
                pax2r: 0,
                pax3l: 0,
                pax3r: 0,
                fuel: 5400,
                aftbgg: 0
              }}
              validate={values => {
                let errors = {};

                if (!values.bew) {
                  errors.bew = "required";
                } else if (values.fwdbgg > 110) {
                  errors.fwdbgg = "max. 110lbs";
                } else if (values.aftbgg > 463) {
                  errors.aftbgg = "max. 463lbs";
                } else if (values.fuel > 5401) {
                  errors.fuel = "max. 5401lbs";
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                const results = calculate(values, actions);

                this.setState({ results });
                sessionStorage.setItem("totalWeightkg", results.totalWeightkg);
                sessionStorage.setItem(
                  "totalWeightlbs",
                  results.totalWeightlbs
                );
                sessionStorage.setItem("aboveMTWO", results.aboveMTWO);
                this.setState({ showResultModal: true });

                actions.setSubmitting(false);
              }}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <div className="option">
                    <label className="option__text">
                      Basic Empty Weight (BEW)
                    </label>
                    <Field className="input-box" type="text" name="bew" />
                    {props.errors.bew && props.touched.bew && (
                      <p className="input__warning">{props.errors.bew}</p>
                    )}
                  </div>
                  <div className="option">
                    <label className="option__text">Forward Baggage</label>
                    <Field className="input-box" type="text" name="fwdbgg" />
                    {props.errors.fwdbgg && props.touched.fwdbgg && (
                      <p className="input__warning">{props.errors.fwdbgg}</p>
                    )}
                  </div>
                  <div className="option">
                    <label className="option__text">Pilot</label>
                    <Field className="input-box" type="text" name="pilot" />
                  </div>
                  <div className="option">
                    <label className="option__text">Co-Pilot</label>
                    <Field className="input-box" type="text" name="copilot" />
                  </div>
                  <div className="option">
                    <button
                      type="button"
                      className="button"
                      style={{ align: "middle" }}
                      onClick={this.toggle}
                    >
                      Edit Passengers
                    </button>
                  </div>
                  <div
                    id="pax"
                    className={
                      "collapse" + (this.state.collapsedPax ? " in" : "")
                    }
                  >
                    <div>
                      <div className="option">
                        <label className="option__text">Pax 1L</label>
                        <Field className="input-box" type="text" name="pax1l" />
                      </div>
                      <div className="option">
                        <label className="option__text">Pax 1R</label>
                        <Field className="input-box" type="text" name="pax1r" />
                      </div>
                      <div className="option">
                        <label className="option__text">Pax 2L</label>
                        <Field className="input-box" type="text" name="pax2l" />
                      </div>
                      <div className="option">
                        <label className="option__text">Pax 2R</label>
                        <Field className="input-box" type="text" name="pax2r" />
                      </div>
                      <div className="option">
                        <label className="option__text">Pax 3L</label>
                        <Field className="input-box" type="text" name="pax3l" />
                      </div>
                      <div className="option">
                        <label className="option__text">Pax 3R</label>
                        <Field className="input-box" type="text" name="pax3r" />
                      </div>
                    </div>
                  </div>
                  <div className="option">
                    <label className="option__text">Fuel</label>
                    <Field className="input-box" type="text" name="fuel" />
                    {props.errors.fuel && props.touched.fuel && (
                      <p className="input__warning">{props.errors.fuel}</p>
                    )}
                  </div>
                  <div className="option">
                    <label className="option__text">Aft Baggage</label>
                    <Field className="input-box" type="text" name="aftbgg" />
                    {props.errors.aftbgg && props.touched.aftbgg && (
                      <p className="input__warning">{props.errors.aftbgg}</p>
                    )}
                  </div>
                  <div className="option__bottom">
                    <button className="big-button" type="submit">
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
            redirectTakeoff={this.redirectTakeoff}
            macIndex={this.state.results.macIndex}
            totalWeightkg={this.state.results.totalWeightkg}
            totalWeightlbs={this.state.results.totalWeightlbs}
            takeOffTrim={this.state.results.takeOffTrim}
            aboveMTWO={this.state.results.aboveMTWO}
          />
        </div>
      </div>
    );
  }
}

export default WeightBalanceCalc;
