import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import { getCarTypeList, getCarTypeSelection } from "./api/GET";
import "./style/ServiceType.scss";

import Popupfemale from "./popupdatasfemale/Popupfemale";

import Popupdatas from "./popupdatasmale/Popupdatas";

const ServiceType = ({ changeMenu, anotherchage, store_id }) => {
  let [carTypeList, setCarTypeList] = useState([]);
  let [service_nature, setServiceNature] = useState("Interior");
  let [selectedCarType, setSelectedCarType] = useState("");
  let [standardList, setStandardList] = useState([]);
  let [premiumList, setPremiumList] = useState([]);
  let [selectedInterior, setSelectedInterior] = useState([]);
  let [selectedExterior, setSelectedExterior] = useState([]);

  

  let modalRef = useRef();

  useEffect(() => {
    getCarTypeList()
      .then((res) => {
        setCarTypeList(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  const showModals = () => {
    const modal = modalRef.current;
    const bModal = new Modal(modal, {
      backdrop: "static",
      keyboard: false,
    });
    bModal.show();
  };
  // const getServiceList = () => {
  //   getCarTypeSelection(store_id, selectedCarType, service_nature, "Standard")
  //     .then((res) => {
  //       console.log("Standard list", res.data.Data);
  //       let currentSelectInt = selectedInterior;
  //       let currentSelectExt = selectedExterior;
  //       res.data.Data.forEach((data) => {
  //         if (data.is_enabled) {
  //           if (data.service.service_type == "Interior") {
  //             currentSelectInt.push(data.service.id);
  //           } else {
  //             currentSelectExt.push(data.service.id);
  //           }
  //         }
  //       });
  //       console.log(currentSelectInt, currentSelectExt);
  //       setSelectedInterior(currentSelectInt);
  //       setSelectedExterior(currentSelectExt);
  //       setStandardList(res.data.Data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return err;
  //     });

  //   getCarTypeSelection(store_id, selectedCarType, service_nature, "Premium")
  //     .then((res) => {
  //       console.log("Premium list", res.data.Data);
  //       setPremiumList(res.data.Data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return err;
  //     });
  // };

  const selectService = (i, type) => {
    console.log(i, type);
  };

  return (
    <div className="d-flex flex-column justify-content-between services-type">
      <div className="card service-type-head">
        <div className="card-body">
          <div className="d-flex flex-column car-type-title">
            <h5
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "60%" }}
              onClick={() => changeMenu(1)}
            >
              Service Type
            </h5>
            <h6 className="fw-bold pt-2">Gender</h6>
          </div>
          <div className="mains-popup-split">
            <div className="left-popup">
              <h3 className="male">Male</h3>
              <div className="left-split-popup">
                <Popupdatas />
              </div>
            </div>
            <div className="right-popup">
              <h3 className="male">Female</h3>
              <div className="right-split-popup">
                <Popupfemale />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card service-type-body">
        <div className="card-body">
          <div className="d-flex flex-column car-type-title">
            <h5
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "60%" }}
              onClick={() => changeMenu(1)}
            >
              Services
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceType;
