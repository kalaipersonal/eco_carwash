import React from 'react'

import ECommerceEmpty from '../../../../assets/ecommerce-empty.svg'

import './styles/EmptyLayout.scss'

export default function EmptyLayout({ openCreateProductModal }) {
	return (
		<div className="e-commerce-empty-layout">
			<img src={ECommerceEmpty} alt="e-commerce-empty" />
			<button className="btn-navy mt-5" onClick={()=>openCreateProductModal()}>
				Create Product
			</button>
		</div>
	)
}
