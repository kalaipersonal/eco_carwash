import React, { Component } from "react";
import "./styles/Popupfemale.scss";
const Machines = {
  blank: {
    NEW_ITEM: "newItem",
    SETTINGS: "settings",
  },
  newItem: {
    NEW_ITEM: "blank",
    SETTINGS: "settings",
  },
  settings: {
    SETTINGS: "blank",
    NEW_ITEM: "newItem",
  },
};
class Popupfemale extends Component {
  constructor() {
    super();

    this.state = { render: "newItem" };
  }
  componentDidMount()
  {
    var nav = document.querySelectorAll("li");

    nav.forEach((li) => {
      li.addEventListener("click", function () {
        removeActive();
        this.classList.add("active");
      });
    });

    function removeActive() {
      nav.forEach((li) => {
        li.classList.remove("active");
      });
    }
  }
  transition(action) {
    const currentState = this.state.render;
    const nextState = Machines[currentState][action];
    this.setState({ render: nextState });
  }
  renderContent() {
    switch (this.state.render) {
      case "blank":
        return;
        break;
      case "newItem":
        return this.newItem();
        break;
      case "settings":
        return this.settings();
    }
  }
  newItem() {
    return (
      <div className="input-female-datas">
        <div className="standard-left">
          <div className="text-standard mt-4 mb-3">
            <span>Standard</span>
          </div>
          <div className="input-types">
            <div
              className="input-split mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                checked
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Straight Hair Cut
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                U Cut
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Layer Cut
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                French Bob Cut
              </span>
            </div>
            <div
              className="input-split"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Super Sleek A Line
              </span>
            </div>
          </div>
        </div>
        <div className="standard-right">
          <div className="text-standard mt-4 mb-3">
            <span>Premium</span>
          </div>
          <div className="input-types">
            <div
              className="input-split mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                checked
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Straight Hair Cut
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                U Cut
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Layer Cut
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                French Bob Cut
              </span>
            </div>
            <div
              className="input-split mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Super Sleek A Line
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  settings() {
    return(
        <div className="input-female-datas">
        <div className="standard-left">
          <div className="text-standard mt-4 mb-3">
            <span>Standard</span>
          </div>
          <div className="input-types">
            <div
              className="input-split mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                checked
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Herbal Body Wrap
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                paraffin Body Wrap
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Full Body Massage
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Full Body Massage
              </span>
            </div>
            <div
              className="input-split"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Full Body Facial
              </span>
            </div>
          </div>
        </div>
        <div className="standard-right">
          <div className="text-standard mt-4 mb-3">
            <span>Premium</span>
          </div>
          <div className="input-types">
            <div
              className="input-split mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                checked
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Herbal Body Wrap
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                paraffin Body Wrap
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Full Body Massage
              </span>
            </div>
            <div
              className="input-split  mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Full Body Facial
              </span>
            </div>
            <div
              className="input-split mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="checkbox"
                style={{ fontSize: "6rem", padding: "20px" }}
              ></input>
              <span
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4em",
                }}
              >
                Body Tanning
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="main-female-datas">
        <button
          type="button"
          class="btnsed"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop1"
        >
          <i class="far fa-chevron-right"></i>
        </button>

        <div
          class="modal fade"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-titles" id="staticBackdropLabel">
                  Gender :  <span className="px-2" style={{color:"darkblue"}}>Female</span>
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="hair-buttons">
                <div className="hairs">
                    <div className="button-first">
                      <ul>
                        <li
                          className="lis"
                          onClick={() => {
                            this.transition("NEW_ITEM");
                          }}
                        >
                          HairCut
                        </li>
                      </ul>
                    </div>
                    <div className="button-second">
                      <ul>
                        <li
                          className="lis"
                          onClick={() => {
                            this.transition("SETTINGS");
                          }}
                        >
                          Spa
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {this.renderContent()}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  style={{
                    width: "12%",
  
                    border: "none",
                    outline: "none",
                    borderRadius: "20px",
                    backgroundColor: "#04294B",
                    color: "white",
                    fontSize: "1.3em",
                    fontWeight: "700",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popupfemale;
