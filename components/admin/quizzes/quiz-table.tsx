"use client";
import { Quiz } from '@prisma/client'
import { useContext, useMemo, useState} from 'react'
import {GridColDef, DataGrid} from "@mui/x-data-grid";
import { Badge } from '@/components/ui/badge'
import ActionCell from '@/components/admin/quizzes/data-grid-action'
import CustomNoRowsOverlay from '@/components/ui/no-data'
import { Input } from '@/components/ui/input'
import { themeContext } from '@/components/theme';
const columns: GridColDef<any>[] = [
 
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    }, 

    {
        field: 'duration',
        headerName: 'Duration',
        flex: 1,
        renderCell: (params) =>  <span>{params.row.duration} minutes</span>
      }, 

    {
        field: 'topic',
        headerName: 'Topic',
        flex: 1,
        renderCell: (params) => {
            return (
                
                  params.row.topic ?
                    <Badge className='pointer-events-none bg-blue1 text-white font-normal'>{params.row.topic}</Badge> :
                    <Badge className='pointer-events-none bg-danger text-white font-normal'>No topic</Badge>
  

                
            )
        }
      }, 
     
    {
        field: 'Question',
        headerName: 'Questions',
        flex: 1,
        renderCell: (params) =>  {
            return (
               <Badge className='pointer-events-none bg-warning text-white font-normal'>{params.row.Question.length}</Badge>
            )
        }
    },
    {
        field: 'Chapter',
        headerName: 'Assigned to a chapter',
        flex: 1,
        renderCell: (params) =>
            {
                return (
                    <Badge className={`pointer-events-none text-white font-normal ${!params.row.Chapter ? 'bg-danger' : 'bg-success'}`}>{params.row.Chapter ? 'yes' : 'no'}</Badge>
                )
            }
            
           
    },
    
      
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        sortable: false,
        renderCell: (params) => <ActionCell id={params.row.id}/> 
    
      }
  ]

const QuizTable = ({data}: {data: Quiz[]}) => {
    const {theme} = useContext(themeContext);
    const [searchText, setSearchText] =useState(''); 
  
  const VISIBLE_FIELDS = ['name', 'duration', 'topic', 'Chapter', 'Question']
 
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
        placeholder="Search quizzes..."
        onKeyDown={handleSearch}
        className='max-w-sm'
      />

    
  );

  return (
    
    <>
     <div className='flex items-center py-4 w-full'>
       <CustomToolbar/>
      </div>
    <div>
      <DataGrid 
     className='!border-grey  !text-gray !font-poppins !rounded-xl !bg-white'
      columns={columns} 
      rowSelection={false}
    
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
            fontFamily: 'Poppins'
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
    </>
  )
}

export default QuizTable