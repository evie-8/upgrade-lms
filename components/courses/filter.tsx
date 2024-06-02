"use cilent"
import  { useState } from 'react'
import {  ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface DataItem {
  label: React.ReactNode;
  value: string | number;
}
interface Props {
    data: DataItem[];
    title: string;
    selectedValue: any;
    onFilterChange: (title: string, value: any) => void;

}
const FilterCard: React.FC<Props> = ({data, title, onFilterChange, selectedValue}) => {
    const [filter, setFilter] = useState(false);
    const handleFilter = () => {
        setFilter(prev => !prev)
    };

    const handleCheckboxChange = (value: string) => {
      onFilterChange(title, value);
  };


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
               <Checkbox  id={`item${key + 1}`}
               checked={selectedValue === item.value}
               onCheckedChange={() => handleCheckboxChange(item.value)}/>
               <label id={`item${key + 1}`}>
               
               {item.label}
               
               </label>
          </li>
        })
      }

    </ul>
   
  </div>
  )
}

export default FilterCard