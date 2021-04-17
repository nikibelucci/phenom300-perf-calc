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
    <h3 className="modal__title">Takeoff Distance</h3>
    <div style={{ align: "center" }}>
      <table style={{ alignSelf: "justify" }}>
        <tbody>
          <tr>
            <td>{<p className="modal__body">Required:</p>}</td>
            <td>{<p className="modal__body">{props.rwy} ft</p>}</td>
          </tr>
          <tr>
            <td>{<p className="modal__body">Available:</p>}</td>
            <td>{<p className="modal__body">{props.longestRwy} ft</p>}</td>
          </tr>
        </tbody>
      </table>
      {props.rwy > props.longestRwy && (
        <div>
          <p className="modal__body__warning">
            WARNING - NO TAKE-OFF <br />
            Runway too short!
          </p>
        </div>
      )}
    </div>
    <div className="modal__subsection">
      <div className="modal__message">
        <p>Takeoff Speeds</p>
      </div>
      <div className="modal__message">{<p>V1: {props.v1}</p>}</div>
      <div className="modal__message">{<p>Vr: {props.vr}</p>}</div>
      <div className="modal__message">{<p>V2: {props.v2}</p>}</div>
    </div>
    {props.aboveMTWO && (
      <div>
        <p className="modal__body__warning">
          WARNING - above MTOW <br />
          8150 kg / 17968 lbs
        </p>
      </div>
    )}

    <button className="button" onClick={props.closeOptionModal}>
      Go back
    </button>
  </Modal>
);

export default ResultModal;
