'use client'

import React, { memo } from 'react'

function HomeCotent() {
  return (
    <div className="flex h-full">
      <div>HomeCotent</div>
    </div>
  )
}

const HomePage = memo(() => {
  return (
    <div>
      <HomeCotent />
    </div>
  )
})

export default HomePage
