import React, { lazy, Suspense } from 'react'
// import ProductSlider from '../Components/ProductSlider'
// import ProductCard from '../Components/Product-Card'
// import Category from '../Components/Category'

const ProductSlider = lazy(()=>import('../Components/ProductSlider'))
const ProductCard = lazy(()=>import('../Components/Product-Card'))
const Category = lazy(()=>import('../Components/Category'))
function Home() {
  return (
    <div>
      <Suspense fallback={<div className='font-extrabold text-center mt-10 text-2xl text-blue-600'>Loading..</div>}>
      
        <ProductSlider/>
        <ProductCard/>
        <Category/>
      </Suspense>
    </div>
  )
}

export default Home