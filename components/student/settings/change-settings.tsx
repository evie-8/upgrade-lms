import Container from "@/components/ui/container"
import ChangeSettingsCard from "./change-details"
import ChangePassword from "./change-password"

const SettingsCard = () => {
  

         
  return (
    <Container>
         <h2 className='text-2xl font-bold'>Account Settings</h2>
        
        <section className="flex  flex-col gap-5">
            <ChangeSettingsCard/>
            <ChangePassword />
       
        </section>
    </Container>
  )
}

export default SettingsCard