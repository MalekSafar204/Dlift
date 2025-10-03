import React, { Suspense } from 'react'
// import Hero from './components/Hero'
import QuoteForm from './components/QuoteForm'

const page = () => {
  return (
    <div className='bg-white min-h-screen pt-20'>
      {/* <Hero /> */}
      <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading form...</div>}>
        <QuoteForm />
      </Suspense>
    </div>
  )
}

export default page