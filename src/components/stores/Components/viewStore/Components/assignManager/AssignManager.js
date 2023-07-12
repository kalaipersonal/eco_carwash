import "./styles/AssignManager.scss";
import { useState, useEffect } from "react";
import { getManagerList } from "./api/GET.js";
import { assignStoreManager } from "./api/PATCH";

const AssignManager = ({ changeMenu, store_id, getStoreManager }) => {
  const [managerList, setManagerList] = useState({});
  let [radioValue, setRadioValue] = useState("");
  useEffect(() => {
    getManagerList(store_id)
      .then((res) => {
        console.log(res.data.Data);
        setManagerList(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  useEffect(() => {}, [radioValue]);

  const submitManager = () => {
    console.log("radioValue",store_id);
    assignStoreManager(radioValue,{store: parseInt(store_id) }).then((res) => {
        console.log(res.data.Data);
        getStoreManager()
        changeMenu(1)
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <div className="assign-manager">
      <div className="manager-head">
        <button className="btn-navy-create" onClick={() => changeMenu(1)}>
          Assign Manager
        </button>
      </div>
      <div class="card manager-list">
        <div class="card-body">
          <form>
            {managerList.results
              ? managerList.results.map((manager, index) => {
                  return (
                    <div
                      className="container row mb-3"
                      onClick={(e) => {
                        setRadioValue(manager.username);
                      }}
                      key={index}
                    >
                      <div className="profile-picture col-5">
                        <img src="https://picsum.photos/100" />
                      </div>
                      <label
                        className="form-check-label col my-auto"
                        for="managerassign"
                      >
                        {manager.name}
                      </label>
                      <div className="form-check my-auto col-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={radioValue === manager.username ? true : false}
                          value={manager.username}
                          name="managerassign"
                        />
                        {console.log("isChecked", radioValue)}
                      </div>
                    </div>
                  );
                })
              : null}
            
          </form>
        </div>
      </div>
      <button className="btn-navy mt-2" onClick={()=> submitManager()} style={{ height: '4rem' }}>Submit</button>
    </div>
  );
};

export default AssignManager;
