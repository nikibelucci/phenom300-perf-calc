import React from "react";
import ReactTable from "react-table";

import "react-table/react-table.css";

const AirportTable = props => {
  const rwyColumns = [
    { Header: "RWY", accessor: "ident" },
    { Header: "Length (ft)", accessor: "length" },
    { Header: "Surface", accessor: "surface" }
  ];

  var wx_indicator = {};

  if (props.airportData.weatherData.wx_category === "VFR") {
    wx_indicator = { background: "#008000" };
  } else if (props.airportData.weatherData.wx_category === "MVFR") {
    wx_indicator = { background: "#0000FF" };
  } else if (props.airportData.weatherData.wx_category === "IFR") {
    wx_indicator = { background: "#FF0000" };
  } else if (props.airportData.weatherData.wx_category === "LIFR") {
    wx_indicator = { background: "#FF00FF" };
  } else {
    wx_indicator = { background: "white" };
  }

  return (
    <div>
      <div className="airportdata__box">
        <div className="airportdata__description">
          <label className="airportdata__text__header">
            {props.airportData ? props.airportData.navData.icao : null}
          </label>
          <label
            className="airportdata__text__header"
            style={{ marginBottom: 15 }}
          >
            {props.airportData
              ? `${props.airportData.navData.name} (${
                  props.airportData.navData.iata
                })`
              : null}
          </label>
          <label className="airportdata__text">
            {props.airportData
              ? `Field Elevation ${props.airportData.navData.elevation.toFixed(
                  0
                )} ft`
              : null}
          </label>
          <div style={{ marginTop: 40 }}>
            {props.airportData.weatherData.isAlternate && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <label
                  className="airportdata__text__header"
                  style={{ color: "red", marginBottom: 20 }}
                >
                  {props.airportData
                    ? `No metar at ${props.airportData.navData.icao}`
                    : null}
                </label>
                <label className="airportdata__text__header">
                  {props.airportData
                    ? `Next METAR - ${props.airportData.weatherData.icao} `
                    : null}
                </label>
                <label
                  className="airportdata__text"
                  style={{ marginBottom: 20 }}
                >
                  {props.airportData
                    ? `(${props.airportData.weatherData.distance.toFixed(
                        0
                      )} nm away)`
                    : null}
                </label>
              </div>
            )}
            <label className="airportdata__text">
              {props.airportData
                ? `QNH ${props.airportData.weatherData.qnh} hPa`
                : null}
            </label>
            <label className="airportdata__text">
              {props.airportData
                ? `Temp ${props.airportData.weatherData.temp} °C`
                : null}
            </label>
            <label className="airportdata__text">
              {props.airportData
                ? `WX Category - ${props.airportData.weatherData.wx_category}`
                : null}{" "}
              <div className="airportdata__wx_category" style={wx_indicator} />
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div className="airportdata__tableBackground">
            <ReactTable
              columns={rwyColumns}
              data={props.airportData ? props.airportData.navData.rwys : []}
              className="airportdata__rwyTable"
              defaultPageSize={
                props.airportData ? props.airportData.navData.rwys.length : 1
              }
              showPageJump={false}
              showPageSizeOptions={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTable;
