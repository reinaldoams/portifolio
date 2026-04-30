import React from 'react'
import './index.scss'

function BackgroundPage() {
  return (
    <div className="background-page">
      <h2>99x <span>(2021 - present)</span></h2>
      <ul className="roleList">
        <li>
          <h3>Public Sector Web Systems</h3>
          <ul>
            <li>Engineered and maintained high-traffic national web systems for the Norwegian government, including institutional, health, and library services.</li>
            <li>Architected global microservices architecture for asset delivery, streamlining resource management across multiple large-scale projects.</li>
          </ul>
        </li>
        <li>
          <h3>Auction house system</h3>
          <ul>
            <li>Developed real-time, low-latency auction interfaces, integrating complex React frontends with high-performance backend structures.</li>
            <li>Optimized UX by implementing live data streaming and real-time updates for active bidding environments.</li>
            <li>Governed backend data-fetching logic and business rules to ensure system integrity during peak auction traffic.</li>
          </ul>
        </li>
        <li>
          <h3>Advocacy Group for Retirees</h3>
          <ul>
            <li>Implemented custom CMS integrations and a library of reusable components to empower non-technical staff to manage content dynamically.</li>
            <li>Automated data synchronization by developing robust CRON jobs and internal system pipelines.</li>
            <li>Enhanced security and user experience by managing complex authentication flows and advanced search optimization.</li>
          </ul>
        </li>
        <li>
          <h3>99x (Main Website)</h3>
          <ul>
            <li>Orchestrated the end-to-end development of the company’s flagship web platform, steering the project from its initial greenfield phase to its current high-performance production state.</li>
            <li>Functioned as a core Fullstack contributor across the entire lifecycle.</li>
            <li>Executed full-cycle feature delivery, including database schema design, API development, and the implementation of responsive, accessible frontend interfaces.</li>
            <li>Directed continuous iterations and system migrations, ensuring the platform evolved to meet modern performance standards and scaling requirements.</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default BackgroundPage