
interface Props {
    courseId: string;
    price: number
}
import { formatter } from '@/lib/utils';
import { Button } from '../ui/button'

const EnrollButton = ({courseId, price}: Props) => {
  return (
    <Button>
    Enroll for {formatter(price)}
    </Button>
  )
}

export default EnrollButton