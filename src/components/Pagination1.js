import React from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';  
export default function Pagination({ data, page, sizePerPage, onTableChange, totalSize, columns }) {  
   return (  
      <div>  
         <PaginationProvider  
         pagination={  
            paginationFactory({  
            custom: true,  
            page,  
            sizePerPage,  
            totalSize  
            })  
         }  
        >  
      {  
         ({  
            paginationProps,  
            paginationTableProps  
          }) => (  
      <div>  
         <BootstrapTable  
            remote  
            keyField="Id"  
            data={data}  
            columns={columns}  
            onTableChange={onTableChange}  
            {...paginationTableProps}  
          />  
      <div>  
   <PaginationListStandalone  
         {...paginationProps}  
         />  
     </div>  
   </div>  
   )  
   }  
  </PaginationProvider>  
  </div>  
 )  
}  