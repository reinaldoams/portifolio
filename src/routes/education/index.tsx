import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import jsonData from '../../json-data/education.json'

export default function EducationPage() {
  return (
    <div className="education-page">
      <div>
        <h2>Education</h2>
        {jsonData?.education?.length > 0 ? <ul>
          {jsonData.education.map(educationItem => (
            <li>
              <img src={educationItem.imageUrl} alt={educationItem.imageAlt} />
              <p>
                <p className="course">{educationItem.course}</p>
                <p className="institution">{educationItem.institution}</p>
                <p className="period">{educationItem.period}</p>
              </p>
            </li>
          ))}
        </ul> : <></>}
      </div>
      <div>
        <h2>Certificates</h2>
        {jsonData?.certifications?.length > 0 ? <ul>
          {jsonData.certifications.map(certificationItem => (
            <li>
              <img src={certificationItem.imageUrl} alt={certificationItem.imageAlt} />
              <p>
                <p className="course">{certificationItem.name}</p>
                <p className="institution">{certificationItem.institution}</p>
                <a href="{certificationItem.url}" target="_blank">See certification</a>
              </p>
            </li>
          ))}
        </ul> : <></>}
      </div>
    </div>
  )
}