import React, { useState } from 'react'

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000
const INDUSTRY_START = new Date(2021, 8, 1) // September 2021 (month 0-based)

function MainPage() {
  const [yearsInIndustry] = useState(
    () => ((Date.now() - INDUSTRY_START.getTime()) / MS_PER_YEAR).toFixed(1),
  )

  return (
    <div>
      <p>
        Hi, My name is Reinaldo Assis! :)
        <br />
        <br />
        I'm a Web Developer with a passion for creating beautiful and functional websites.
        <br />
        I have been working in the industry for {yearsInIndustry} years.
        <br />
        <br />
        Navigate through the pages to know more about my services!
      </p>
    </div>
  )
}

export default MainPage