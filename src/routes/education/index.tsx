import React from 'react'
import './index.scss'
import jsonData from '../../json-data/education.json'

export default function EducationPage() {
  return (
    <div className="education-page">
      <div>
        <h2>Education</h2>
        {jsonData?.education?.length > 0 ? <ul>
          {jsonData.education.map(educationItem => (
            <li key={educationItem.institution}>
              <img src={educationItem.imageUrl} alt={educationItem.imageAlt} />
              <div className="education-item__text">
                <p className="course">{educationItem.course}</p>
                <p className="institution">{educationItem.institution}</p>
                <p className="period">{educationItem.period}</p>
              </div>
            </li>
          ))}
        </ul> : <></>}
      </div>
      <div className="education-page__certs">
        <h2>Certifications</h2>
        {jsonData?.certifications?.length > 0 ? <ul>
          {jsonData.certifications.map(certificationItem => (
            <li key={certificationItem.institution}>
              <img src={certificationItem.imageUrl} alt={certificationItem.imageAlt} />
              <div className="education-item__text">
                <p className="course">{certificationItem.name}</p>
                <p className="institution">{certificationItem.institution}</p>
                <a href={certificationItem.url} target="_blank" rel="noreferrer">
                  See certification
                </a>
              </div>
            </li>
          ))}
        </ul> : <></>}
      </div>
    </div>
  )
}