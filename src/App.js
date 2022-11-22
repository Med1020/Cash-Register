import "./App.css";
import React, { useState } from "react";

function App() {
  var [bill, setBill] = useState("");
  var [payment, setPayment] = useState("");
  const [change, setChange] = useState([]);
  const notes = [2000, 500, 100, 20, 10, 5, 1];
  const [output, setOutput] = useState();
  const [error, setError] = useState("");
  let enabled = bill > 0;

  const clickHandler = () => {
    if (bill > 0) {
      payment = Number(payment);
      bill = Number(bill);
      if (payment > bill) {
        let returnChange = payment - bill;
        setOutput(returnChange);
        calculateChange(returnChange);
      } else {
        setError("You need to take more money!");
      }
    } else {
      setError("Invalid bill amount");
    }
  };

  const calculateChange = (returnChange) => {
    setChange([]);
    for (let i = 0; i < notes.length; i++) {
      let noOfNotes = Math.trunc(returnChange / notes[i]);
      setChange((change) => [...change, noOfNotes]);
      returnChange = returnChange % notes[i];
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="header">Cash Register App</h1>
        <label htmlFor="bill-amount">Bill Amount:</label>
        <br />
        <input
          id="bill-amount"
          type="text"
          value={bill}
          onChange={(e) => {
            setBill(e.target.value);
          }}
          placeholder="Enter bill amount here"
          autoComplete="off"
        />
        <br />

        <label htmlFor="cash-given">Cash given:</label>
        <br />
        <input
          id="cash-given"
          type="text"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          placeholder="Enter the cash paid"
          autoComplete="off"
          disabled={!enabled}
        />
        <br />

        <button
          className="btn"
          onClick={() => {
            setBill("");
            setPayment("");
            setChange([]);
            setOutput();
            setError("");
          }}
        >
          Clear
        </button>

        <button
          className="btn"
          onClick={() => clickHandler()}
          disabled={!enabled}
        >
          Check
        </button>
        <br />

        <h3>Return Amount: {output}</h3>
      </div>

      <div className="return amount">
        <table className="return-table">
          <tbody>
            <tr className="output">
              <th>No. of notes</th>

              {change.map((ch, index) => {
                return <td key={index}>{ch}</td>;
              })}
            </tr>

            <tr>
              <th>Notes</th>
              {notes.map((note, index) => {
                return <td key={index}> ₹{note}</td>;
              })}
            </tr>
          </tbody>
        </table>
        <span className="error">{error}</span>
      </div>
    </>
  );
}

export default App;
