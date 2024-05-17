"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressLoader = () => {
   
    return (
        <ProgressBar
        height="3px"
        color = "#007BFF"
        options={{ showSpinner: false }}
        shallowRouting
        />
    )
  

}
export default ProgressLoader