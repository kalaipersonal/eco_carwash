import React from "react";

export class StoresData {
  nameTemplate(rowData) {
    return (
      <React.Fragment>
        <img
          alt={rowData.name}
          src={
            rowData.profile_image
              ? rowData.profile_image
              : `https://avatars.dicebear.com/api/initials/${rowData.name}.svg`
          }
          onError={(e) =>
            (e.target.src =
              "https://avatars.dicebear.com/api/initials/random.svg")
          }
          width={50}
          style={{ verticalAlign: "middle" }}
          className="border rounded-circle me-3"
        />
        <span>{rowData.name}</span>
      </React.Fragment>
    );
  }

  leaveTemplate(rowData) {
    return (
      <React.Fragment>
        <div className="d-flex flex-column align-items-center">
          <span className="row">Leave taken</span>
          <span className="row" style={{ fontSize: "40px" }}>
            04
          </span>
        </div>
      </React.Fragment>
    );
  }

  orderTemplate(rowData) {
    return (
      <React.Fragment>
        <div className="d-flex flex-column align-items-center">
          <span className="row">No. of orders</span>
          <span className="row" style={{ fontSize: "40px" }}>
            256
          </span>
        </div>
      </React.Fragment>
    );
  }

  phoneTemplate(rowData) {
    return (
      <React.Fragment>
        <div className="d-flex flex-column align-items-center">
          <span>
            <i className="fas fa-phone-alt"></i>&nbsp; 123456789
          </span>
        </div>
      </React.Fragment>
    );
  }

  emailTemplate(rowData) {
    return (
      <React.Fragment>
        <div className="d-flex flex-column align-items-center">
          <span>
            <i className="far fa-envelope"></i>&nbsp; {rowData.email}
          </span>
        </div>
      </React.Fragment>
    );
  }
}
