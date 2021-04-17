import React from "react";
import Modal from "react-modal";

const ResultModal = props => (
  <Modal
    isOpen={props.showResultModal}
    contentLabel="Calculated Results"
    onRequestClose={props.closeOptionModal}
    closeTimeoutMS={200}
    className="modal"
    appElement={document.getElementById("app")}
  >
    <h3 className="modal__title">MAC and Weight</h3>
    <div style={{ align: "center" }}>
      <table style={{ alignSelf: "justify" }}>
        <tbody>
          <tr>
            <td>
              {<p className="modal__body">MAC:</p>}
              {<p className="modal__body">Total kg:</p>}
              {<p className="modal__body">Total lbs:</p>}
            </td>
            <td>
              {<p className="modal__body">{props.macIndex} %</p>}
              {props.aboveMTWO ? (
                <p className="modal__body__warning">{props.totalWeightkg} kg</p>
              ) : (
                <p className="modal__body">{props.totalWeightkg} kg</p>
              )}
              {props.aboveMTWO ? (
                <p className="modal__body__warning">
                  {props.totalWeightlbs} lbs
                </p>
              ) : (
                <p className="modal__body">{props.totalWeightlbs} lbs</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {props.aboveMTWO && (
      <div>
        <p className="modal__body__warning">
          WARNING - above MTOW <br />
          8150 kg / 17968 lbs
        </p>
      </div>
    )}
    <div className="modal__subsection">
      <div className="modal__message">
        <p>Takeoff Trim</p>
      </div>
      <div className="modal__message">
        {<p>Flap 1: {props.takeOffTrim.flap1.toFixed(1)}</p>}
      </div>
      <div className="modal__message">
        {<p>Flap 2: {props.takeOffTrim.flap2.toFixed(1)}</p>}
      </div>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      <button className="button" onClick={props.closeOptionModal}>
        Go back
      </button>
      <button className="button" onClick={props.redirectTakeoff}>
        Takeoff
      </button>
    </div>
  </Modal>
);

export default ResultModal;
