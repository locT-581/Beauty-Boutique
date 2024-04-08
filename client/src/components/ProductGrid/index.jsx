import React from 'react'
import ProductCard from '../ProductCard'

const productGrid = ({products}) => {
  return (
    <div className='grid grid-cols-3 grid-flow-col gap-8'>
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.name}
          price={product.price}
          image={product.avatar || product.imageUrls[0]}
        />
      ))}
    </div>
  )
}

export default productGrid
