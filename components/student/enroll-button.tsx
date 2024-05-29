"use client";

interface Props {
    courseId: string;
    price: number
}
import { formatter } from '@/lib/utils';
import { Button } from '../ui/button'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const EnrollButton = ({courseId, price}: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async() => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        url: window.location.pathname
      });

      window.location.assign(response.data.url);
    } catch  {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button onClick={onClick} disabled={isLoading}>
    Enroll for {formatter(price)}
    </Button>
  )
}

export default EnrollButton