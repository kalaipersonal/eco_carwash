import React from 'react'

import './styles/CarType.scss'

export default function CarType({ carList, carType, changeCarType, openCarModal }) {
	return (
		<div className="garage-car-type-selector mt-3">
			<div className="car-type-selector-header">
				Car Type
			</div>
			<div className="car-type-selector-body">
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
		</div>
	)
}
