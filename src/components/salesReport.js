import React, {useState} from 'react';
export function yearlyReport(startDate, endDate) { 
    const [Data, setData] = useState([]);
    var sYear = new Date (startDate).getFullYear();
    var eYear = new Date (endDate).getFullYear();
    var newData={};
    
    //  alert(sYear+' to '+eYear);
    //alert(startDate+" - "+endDate);
    // const currentYear = new Date().getFullYear();
    for (let i = sYear; i < eYear ; i++) {
        newData[i] = {
          year:i,
          sales: 0,
          cost: 0,
          percent: 0,
          remark: '',
        }

        const newDatas = [...Data, newData];
         setData(newDatas);   
    
     
    
    } ;
   // alert(newData[0].)
     return Data;
    
    };
export function quarterlyReport(startDate, endDate) {
 
} ;
export function monthlyReport(startDate, endDate) {
    
};