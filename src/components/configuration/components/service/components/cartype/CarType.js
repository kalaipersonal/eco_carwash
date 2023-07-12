import React from "react";

import "./styles/CarType.scss";

export default function CarType({
  carList,
  carType,
  changeCarType,
  openCarModal,
}) {
  return (
    <div className="car-type-selector mt-3">
      <div className="car-type-selector-header">
        <div className="button_first">
          <button className="female_btn">Male</button>
        </div>
        <div className="button_second">
          <button className="female_btn">Female</button>
        </div>
      </div>
      {/* <div className="car-type-selector-body">
				{
					carList.map((car) => {
						return (
							<button
								className={`car-type-card ${(carType) === car.id ? 'active' : null}`}
								onClick={() => changeCarType(car.id)}
								key={car.id}
							>
								{car.name}
							</button>
						)
					})
				}
			</div>
			<div className="car-type-selector-footer ms-3">
				<button className="btn-white" onClick={()=>openCarModal()}>Add +</button>
			</div> */}
    </div>
  );
}
