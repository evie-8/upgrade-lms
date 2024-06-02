import OrdersCard from "@/components/admin/courses/orders"
import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/db"

const Orders = async() => {
    const user = await currentUser();
    const orders = await prismadb.order.findMany({
        where: {
            course: {
                tutorId: String(user?.id)
            }
        },
        include: {
            course: true,
        }
    });

for (let order of orders) {
    const userId = order.userId; 
    const userInfo = await prismadb.user.findUnique({
        where: {
            id: userId
        }
     });
    order.user= userInfo;
    }
  return (
    <OrdersCard data={orders}/>
  )
}

export default Orders