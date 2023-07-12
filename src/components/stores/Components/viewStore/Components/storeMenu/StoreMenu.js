import { NavLink, withRouter, useRouteMatch } from "react-router-dom";
import "./../../../../../cleaner/Components/viewCleaner/styles/ViewCleaner.scss";
import "./styles/StoreMenu.scss";
import LinesEllipsis from "react-lines-ellipsis";
import { useState, useEffect } from "react";
import axios from "axios";
import AssignManagerIcon from "../../../../../../assets/assignManagerIcon.svg";

let rating;

const StoreMenu = ({ changeMenu }) => {
  let { path, url, id } = useRouteMatch();
  const [reviewData, setReviewData] = useState([]);

  url = url.split("/");
  id = url.pop();
  url = url.join("/");
  console.log("url:", url);

  const getRating = () => {
    axios
      .get(`/admin/manage_ratings/?store=${id}`)
      .then((res) => {
        setReviewData(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const StoreStarComponent = (rating) => {
    let html = [];
    for (let i = 1; i <= 5; i++) {
      i <= rating
        ? html.push(<span className="fa-solid fa-star-sharp checked"></span>)
        : html.push(<span className="fa-solid fa-star-sharp"></span>);
    }
    return html;
  };

  useEffect(() => {
    getRating();
  }, []);

  return (
    <div className="store-menu-body">
      <div className="add-agent-buttons">
        <div
          onClick={() => changeMenu(2)}
          className="d-flex flex-row p-1 btn-white-create justify-content-center align-items-center justify-content-between"
        >
          <div className="d-flex flex-row justify-content-center align-items-center h-100">
            <img src={AssignManagerIcon} className="px-2 w-100 justify-content-center align-items-center " alt="" />
            <p className="d-flex flex-column my-auto">AssignManager</p>
          </div>
          
          <i class="fas fa-chevron-right bg-dark"></i>
        </div>
        <button onClick={() => changeMenu(3)} className="btn-navy-create">
          Assign Stylist
        </button>
        <button onClick={() => changeMenu(4)} className="btn-navy-create">
          Configure services
        </button>
        <NavLink to={`/leavedetails?store=${id}`}>
          <button className="btn-navy-create">Leave Management</button>
        </NavLink>
      </div>
      <div className="user-reviews">
        <div className="card">
          <div className="card-body">
            <h5
              style={{ height: "7%" }}
              className="d-flex fw-normal justify-content-center"
            >
              User Reviews
            </h5>
            <div className="cleaner-reviews-block">
              {reviewData.map((data, index) => {
                return (
                  <div>
                    <div className="d-flex flex-column cleaner-reviews-element w-100">
                      <div
                        style={{ height: "40%" }}
                        className="d-flex flex-row align-items-center w-100 justify-content-between"
                      >
                        <div className="d-flex flex-row">
                          <div className="store-reviews-profile-picture me-2">
                            <img src="https://picsum.photos/100" />
                          </div>
                          <p className="my-auto">{data?.user?.name}</p>
                        </div>

                        <div className="d-flex flex-row">
                          {StoreStarComponent(data?.rating)}
                        </div>
                      </div>
                      <div
                        style={{ height: "60%" }}
                        className="review-content d-flex flex-row pt-2"
                      >
                        <LinesEllipsis
                          text={data?.review}
                          maxLine="2"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                        />
                      </div>
                    </div>

                    {index < reviewData.length - 1 ? (
                      <div
                        id="#bottomLine"
                        style={{ borderBottom: "1px solid #b4b4b4" }}
                      ></div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(StoreMenu);
