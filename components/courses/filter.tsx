"use cilent"
import  { useState } from 'react'
import {  ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
interface Props {
    data: any[];
    title: String;


}
const FilterCard: React.FC<Props> = ({data, title}) => {
    const [filter, setFilter] = useState(false);
    const handleFilter = () => {
        setFilter(prev => !prev)
    }
  return (
    <div className='filter-wrapper'>
        <div className='filter-title'>
        <p >{title}</p>
        <ChevronUp className={ `icon  ${filter ? 'rotate-180' : ''}`} onClick={handleFilter} />
        </div>
   
   
    <ul className={`${filter ? 'hidden' : 'flex'}`}>
      {
        data.map((item:any, key: number) => {
          return <li key={key} >
               <Checkbox  id={`item${key + 1}`}/>
               <label id={`item${key + 1}`}>
                {item}
               </label>
          </li>
        })
      }

    </ul>
   
  </div>
  )
}

export default FilterCard