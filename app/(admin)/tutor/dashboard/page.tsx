import TutorDashboard from '@/components/admin/tutor-dashboard'
import MetaData from '@/components/ui/meta-data'
import React from 'react'

const AdminHomePage = () => {
  return (
    <>
      <MetaData title='upgrade-admin | Dashboard' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
      <TutorDashboard/>  
      </>
  )
}

export default AdminHomePage