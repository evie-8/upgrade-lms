import { currentRole } from "@/lib/auth"
import { redirect } from "next/navigation";

const RoleRedirectPage = async() => {
    const role = await currentRole();
    if (role === 'USER') {
        return redirect (`/student/dashboard`)
    } else if (role === 'TUTOR') {
        return redirect("/tutor/dashboard")
    }
 
    return redirect("/")
}

export default RoleRedirectPage