import React from "react";
import { Formik, Field } from "formik";

import AirportTable from "./AirportTable";
import fetchAirportData from "../helpers/fetchAirportData";

class AirportData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airportData: {
        navData: {
          elevation: "",
          iata: "",
          icao: "",
          name: "",
          rwys: []
        },
        weatherData: {
          icao: "",
          metar: "",
          qnh: 0,
          temp: 0,
          wx_category: ""
        }
      },
      showTable: false,
      isLoading: false
    };
  }

  //handler to transfer data to parent component
  transferAirportDataParent = airportData => {
    this.props.handleAirportdata(airportData);
  }

   validateIcao = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[a-z,A-Z]{4}$/i.test(value)) {
      error = 'Invalid icao code';
    }
    return error;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="widget-header">
            <h3 className="widget-header__title">Departure Airport</h3>
          </div>
          <Formik
            initialValues={{
              icaoCode: this.state.airportData.navData.icao
            }}
            onSubmit={async (values, actions) => {
              this.setState({ showTable: false });
              this.setState({ isLoading: true });
              const airportData = await fetchAirportData(values.icaoCode);
              this.setState({ airportData });
              this.setState({ showTable: true });
              this.setState({ isLoading: false });
              this.transferAirportDataParent(airportData);
            }}
            render={({...props,errors,touched}) => (
              <div>
                <form onSubmit={props.handleSubmit}>
                  <div className="option">
                    <label className="option__text">ICAO</label>
                    <Field className="input-box" type="text" name="icaoCode" validate={this.validateIcao} />
                    {errors.icaoCode && touched.icaoCode && <div  style={{
                        color: "#FF0000",
                        alignSelf: "center",
                        borderBottom: "0.3rem solid white"
                      }}>{errors.icaoCode}</div>}
                  </div>
                  {this.state.isLoading && (
                    <div className="spinner">
                      <div className="bounce1" />
                      <div className="bounce2" />
                      <div className="bounce3" />
                    </div>
                  )}
                  {this.state.showTable && (
                    <AirportTable airportData={this.state.airportData} />
                  )}
                  <div className="option__bottom">
                    <button
                      className="button"
                      style={{
                        background: "#c2c2d6",
                        borderBottom: "0.3rem solid white"
                      }}
                      type="submit"
                    >
                      Get airport data
                    </button>
                  </div>
                </form>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export default AirportData;
