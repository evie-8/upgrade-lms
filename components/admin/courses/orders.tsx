"use client"
import { themeContext } from '@/components/theme'
import Container from '@/components/ui/container'
import {   PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useContext, useMemo, useState} from 'react'

import {GridColDef, DataGrid} from "@mui/x-data-grid";
import {  Course, Order, User, } from '@prisma/client'
import { formatter } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import ActionCell from '../data-grid-action'
import CustomNoRowsOverlay from '@/components/ui/no-data'
import { Input } from '@/components/ui/input'
import { getFullDay } from '@/lib/date'

interface Props {
  data: Order & {course: Course} &{user: User} []| []
}
const columns: GridColDef<Order & {course: Course} &{user: User}>[] = [
 
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
  }, 
  
    {
      field: 'userId',
      headerName: 'Name',
      flex: 1,
      
      renderCell: (params) => params.row.user.name
    },

    {
        field: 'course.name',
        headerName: 'Course Name',
        flex: 1,
        renderCell: (params) => params.row.course.name
      },
    {
      field: 'course.price',
      headerName: 'Price',
      flex: 1,
      renderCell: (params) => formatter(params.row.course.price)
    },
    {
        field: 'createdAt',
        headerName: 'Order Date',
        flex: 1,
        renderCell: (params) => getFullDay(params.row.createdAt)
      },

   
    
]

const OrdersCard = ({data}: Props) => {
  const {theme} = useContext(themeContext);
  const [searchText, setSearchText] =useState(''); 
  
  const VISIBLE_FIELDS = ['Id', 'Name',  'Course Name', 'Price']
 
  const handleSearch = (event: any) => {
    const query = event.target.value;
   
  if (event.keyCode === 13 && query.length) {
       setSearchText(query.toLowerCase())
       
    }
}
  const filteredData = useMemo(() => {
    if (!searchText) {
      return data;
    }
    const searchTextLower = searchText.toLowerCase();
    return data.filter((row) => 
      columns.some((column) => {
        if (VISIBLE_FIELDS.includes(column.field)) {
          //@ts-ignore
          const value = row[column.field]?.toString()?.toLowerCase() || '';
          return value.includes(searchTextLower);
        }
        return false;
      })
    );
  }, [data, searchText]);


  const CustomToolbar = () => (
   
      <Input
        placeholder="Search orders..."
        onKeyDown={handleSearch}
        className='max-w-sm'
      />

    
  );



  return (
   <>
   <Container>
    <div className='flex items-center justify-between'>
    
    <h2 className='text-2xl font-bold'>Our Orders</h2>

     
    </div>
    <div className='flex items-center py-4 w-full'>
       <CustomToolbar/>
      </div>
    <div>
      <DataGrid 
     className='!border-grey  !text-gray !font-poppins !rounded-xl !bg-white'
      columns={columns} 
     
      checkboxSelection
      rows={filteredData.length ? filteredData : []}
      autoHeight
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay
      }}
      
      initialState={{
        pagination: {
          paginationModel: {page: 0, pageSize: 5},
        },

        
      }}
      sx={{
        
         '& .css-1pmk00y-MuiDataGrid-columnHeaders': {
          backgroundColor: "#C3DDF9",
          borderRadius: '12px'
         },
         '.MuiDataGrid-topContainer': {
          borderRadius: '12px'
         },

         '& .MuiDataGrid-columnHeader': {
          backgroundColor: "#007bff",
          color: '#fff'
         },

        '& .MuiDataGrid-row': {
          borderColor: theme === 'dark' ? '#E5E8F3' : '#333'
        

        },

        '& .MuiDataGrid-row:nth-child(2n + 1)': {
            backgroundColor: theme === 'light' ? '#f4f5f7' : '#131314'
        },
        '& .MuiDataGrid-row:nth-child(2n):hover': {
          backgroundColor: theme === 'light' ? '#fff' : '#1E1F20'
      },

          '& .MuiDataGrid-footerContainer': {
            color: theme === 'light' ? "#3c4852" : '#fff',
            fontFamily: 'Poppins',
          },
          '& .MuiTablePagination-root': {
            color: theme === 'light' ? "#3c4852" : '#fff',
            fontFamily: 'Poppins'
          },
          '& .MuiDataGrid-menu': {
            color: theme === 'light' ? "#3c4852" : '#fff',
            backgroundColor: theme === 'light' ? '#fff' : '#1E1F20'
          },
          '.MuiDataGrid-iconButtonContainer': {
            visibility: 'visible',
          },
          '.MuiDataGrid-sortIcon': {
            opacity: 'inherit !important',
            color: "#fff"
          }, 
         
          '.MuiDataGrid-menuIcon':{
            display: 'none'

          }
        
      }}
      pageSizeOptions={[5,10,20]}/>
      
    </div>
   </Container>
   </>
  )
}

export default OrdersCard