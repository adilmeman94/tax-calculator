import React, { useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./styles.css";

function Home(props) {
  const [Basic, setBasic] = useState("");
  const [LTA, setLTA] = useState("");
  const [HRA, setHRA] = useState("");
  const [FA, setFA] = useState("");
  const [INV, setINV] = useState("");
  const [Rent, setRent] = useState("");
  const [Med, setMed] = useState("");
  const [cityType, setCityType] = useState("");
  const [AppHRA, setAppHRA] = useState(0);
  const [TaxIncome, setTaxIncome] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const { name } = props;
  const Id = localStorage.getItem("id");
  const Auth = localStorage.getItem("auth");

  const calculateAppHRA = (e) => {
    e.preventDefault();
    setCityType(e.target.value);
    if (e.target.value === "Metro") {
      const apphra = 0.5 * Basic + (Rent - 0.1 * Basic) + 1 * HRA;
      setAppHRA(apphra);
    } else if (e.target.value === "Non metro") {
      const apphra = 0.4 * Basic + (Rent - 0.1 * Basic) + 1 * HRA;
      setAppHRA(apphra);
    }
  };

  const goToPreview = (e) => {
    e.preventDefault();
    if (AppHRA < 1) {
      alert("Please fill All fields");
    } else {
      setOpen((o) => !o);
    }
  };

  const goToReset = (e) => {
    e.preventDefault();
    setBasic("");
    setLTA("");
    setHRA("");
    setINV("");
    setFA("");
    setMed("");
    setRent("");
    setCityType("");
    setAppHRA(0);
    setShow(false);
    setTaxIncome("");
    window.scrollTo(0, 0);
  };

  const calculateTaxIncome = (e) => {
    e.preventDefault();
    if (show) {
      const taxableIncome =
        1 * Basic + 1 * LTA + 1 * HRA + 1 * FA - 1 * AppHRA - 1 * INV - 1 * Med;
      setTaxIncome(taxableIncome);
      window.scrollTo(0, 0);
    } else {
      alert("Please confirm All Details in preview popup");
    }
    setShow(false);
  };

  const goToConfirm = (e) => {
    setOpen((o) => !o);
    var reqBody = {
      Basic: Basic,
      LTA: LTA,
      HRA: HRA,
      FA: FA,
      INV: INV,
      Rent: Rent,
      Med: Med,
      cityType: cityType,
      AppHRA: AppHRA,
    };

    axios
      .put(`https://jfbackend.herokuapp.com/user/${Id}`, reqBody, {
        headers: {
          Authorization: "Bearer " + Auth,
        },
      })
      .then((response) => {
        setShow(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="home-page">
      <h2>Welcome {name} </h2>
      <div style={{ marginTop: "2%", marginBottom: "3%" }}>
        <h3>Calculate Your Texable Income </h3>
      </div>
      {TaxIncome && (
        <div className="result col-lg-4 col-md-6 col-sm-8">
          <h4>
            {name}'s Taxable Income is {TaxIncome} Rs*
          </h4>
          <p>
            * If your Taxable Income is below 5,00,000 Rs then Your Income-Tax
            is 0 Rs.
          </p>
        </div>
      )}
      <div className="salary-component col-lg-6 col-md-6 col-sm-8 col-xs-12">
        <label className="form-label label2">Add Salary Components</label>
        <label className="form-label label1">Basic Salary (Annual)</label>
        <input
          type="number"
          className="form-control"
          placeholder="Basic Salary"
          value={Basic}
          onChange={(e) => {
            setBasic(e.target.value);
          }}
          required
        />
        <label className="form-label label1">LT Allowance (Annual)</label>
        <input
          type="number"
          className="form-control"
          placeholder="LTA component"
          value={LTA}
          onChange={(e) => {
            setLTA(e.target.value);
          }}
          required
        />
        <label className="form-label label1">HRA (Annual)</label>
        <input
          type="number"
          className="form-control"
          placeholder="HRA component"
          value={HRA}
          onChange={(e) => {
            setHRA(e.target.value);
          }}
          required
        />
        <label className="form-label label1">Food Allowance (Annual)</label>
        <input
          type="number"
          className="form-control"
          placeholder="FA component"
          value={FA}
          onChange={(e) => {
            setFA(e.target.value);
          }}
          required
        />
      </div>

      <div className="salary-component col-lg-6 col-md-6 col-sm-8 col-xs-12">
        <label className="form-label label2">Add Deduction Components</label>
        <label className="form-label label1">
          Investments under section 80C
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Investments under section 80C"
          value={INV}
          onChange={(e) => {
            setINV(e.target.value);
          }}
          required
        />
        <label className="form-label label1">
          Actual Rent paid by user (Annual)
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Actual Rent paid by user"
          value={Rent}
          onChange={(e) => {
            setRent(e.target.value);
          }}
          required
        />
        <label className="form-label label1">
          Mediclaim policy premium paid by user
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Mediclaim policy premium paid by user"
          value={Med}
          onChange={(e) => {
            setMed(e.target.value);
          }}
          required
        />
        <label className="form-label label1">City Type </label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={cityType}
          onChange={(e) => {
            calculateAppHRA(e);
          }}
        >
          <option defaultValue>User stays in Metro/Non metro city</option>
          <option value="Metro">Metro</option>
          <option value="Non metro">Non metro</option>
        </select>
        <label className="form-label label1">Applicable HRA </label>
        <input
          type="number"
          className="form-control"
          placeholder=" Your Applicable HRA"
          value={AppHRA}
          readOnly
          required
        />
      </div>
      <div className="btn-grp col-lg-4 col-md-6 col-sm-8 col-xs-12 custom-margin">
        <button
          className="btn btn-primary"
          disabled={show}
          onClick={(e) => goToPreview(e)}
        >
          Preview
        </button>
        <button
          className="btn btn-primary second-btn"
          onClick={(e) => calculateTaxIncome(e)}
        >
          Taxable Income
        </button>
        <button
          className="btn btn-primary second-btn"
          disabled={show}
          onClick={(e) => goToReset(e)}
        >
          Reset
        </button>
      </div>

      <Popup open={open}>
        <div className="popup" onClick={closeModal}>
          x
        </div>
        <div className="income-data1 col-lg-8 col-md-10 col-sm-12 ">
          <div className="popup-header">
            {name}'s Income and Deduction Detail
          </div>
          <div className="income-data">
            <div className="para1">
              Basic Salary -<p className="para">{Basic} Rs</p>
            </div>
            <div className="para1">
              LT Allowance -<p className="para"> {LTA} Rs </p>
            </div>
            <div className="para1">
              Food Allowance -<p className="para"> {LTA} Rs </p>
            </div>
            <div className="para1">
              HRA -<p className="para"> {HRA} Rs </p>
            </div>
            <div className="para1">
              Investments under section 80C -<p className="para"> {INV} Rs </p>
            </div>
            <div className="para1">
              Actual Rent paid - <p className="para">{Rent} Rs </p>{" "}
            </div>
            <div className="para1">
              City Type -<p className="para"> {cityType} </p>
            </div>
            <div className="para1">
              Applicable HRA -<p className="para">{AppHRA} Rs </p>
            </div>
          </div>
          <button
            className="btn btn-primary btn-center"
            onClick={(e) => goToConfirm(e)}
          >
            confirm
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default Home;
