import StudentDashboard from '@/components/student/student-dashboard'
import MetaData from '@/components/ui/meta-data'
import React from 'react'

const DashBoardPage = () => {
  return (
    <>
      <MetaData title='upgrade-student | Dashboard' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
    <StudentDashboard/>
      </>
  )
}

export default DashBoardPage