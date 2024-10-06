import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";

const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
 // const userLevel = localStorage.getItem('userLevel');
 var lEdit = false;
 var lDelete = false;
  var selectedCategory = '';
 

function IncomeTax() {
   const [data, setData] = useState([]); 
    const inputReference = useRef(null);
    const [category, setCategory] = useState('');
    const [incomeFrom, setIncomeFrom] = useState(0);
    const [incomeTo, setIncomeTo] = useState(0);
    const [calFirst, setCalFirst] = useState(0);
    const [calNext, setCalNext] = useState(0);
    const [rate, setRate] = useState(0);
    const [tax, setTax] =useState(0);
    const [nextTax, setNextTax] =useState(0);
    const cat = [{label: 'A', value: 'A'},{label:'B', value: 'B'},
          {label:'C', value: 'C'},{label:'D', value: 'D'},{label:'E', value: 'E'},
           {label: 'F', value: 'F'},{label: 'G', value: 'G'},{label: 'H', value: 'H'},
           {label: 'I', value: 'I'},{label: 'J', value: 'J'},{label: 'K', value: 'K'},
           {label: 'L', value: 'L'},{label: 'M', value: 'M'}, {label: 'O', value: 'O'},
           {label: 'P', value: 'P'},{label: 'Q', value: 'Q'},{label: 'R', value: 'R'},
           {label: 'S', value: 'S'},{label: 'T', value: 'T'},{label: 'U', value: 'U'},
           {label: 'V', value: 'V'},{label: 'W', value: 'W'}, {label: 'X', value: 'X'},
           {label: 'Y', value: 'Y'},{label: 'Z', value: 'Z'}];
    //const history = useHistory();
  
    const onhandleEdit= (e) => {
     //alert(e);
     
      setCategory(e);
      for (let x = 0; x < data.length; x++) {  
       if (data[x].category === e) {
        lEdit=true;
        selectedCategory = data[x].category;
        setIncomeFrom(data[x].incomeFrom);
        setIncomeTo(data[x].incomeTo);
        setCalFirst(data[x].calFirst);
        setCalNext(data[x].calNext); 
        setRate(data[x].rate); 
        setTax(data[x].tax); 
        setNextTax(data[x].nextTax);      
       }   
      
      } // for
        // history.push("/gstEdit");
     //   alert(lEdit);
     //   alert(selectedCategory);
        inputReference.current.focus(); 
      };
      const handleChangeType= (e) =>{
         // alert(e.target.value);
          setCategory(e.target.value)
        // history.push("/gstEdit");

      };
      const onhandleRemove= (id) =>{
        // alert(e);
        lDelete=true;
         const newData = [...data];
         const index = newData.findIndex((data) => data.category === id) ;

         if (index !==-1) {
          newData.splice(index, 1);
          setData(newData);
            
        
            // newData[x].category = cat[x].value;
          }  
           
             
       
      
          //   newData.splice(index, 1);
           //  setData(newData);
            
      
        console.log(newData);

 

     

        };



      useEffect(() => {
      //  debugger;
     // alert(url+`/incomeTaxUpdate`);
        Axios
        .get(url+`/incomeTaxUpdate`,
              {
               params: {
                       
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));
          
    
       inputReference.current.focus(); 
    }, []);

    const handleInputChangeIncomeFrom =(e) => {
      e.preventDefault();
      let num = e.target.value;
     
      setIncomeFrom(num);
     // setIncomeFrom(parseFloat(num).toFixed(2))
  };
  
     const formatInputIncomeFrom = (e) => {
  
       e.preventDefault();
      let num = e.target.value;
      if (num < 0) {
        num = num *-1
    }
      setIncomeFrom(parseFloat(num).toFixed(2))
     };
     const handleInputChangeIncomeTo =(e) => {
      e.preventDefault();
      let num = e.target.value;
      setIncomeTo(num)
  };
  
     const formatInputIncomeTo = (e) => {
  
       e.preventDefault();
       let num = e.target.value;
       if (num < 0) {
        num = num *-1
    }
       setIncomeTo(parseFloat(num).toFixed(2))
     };

     const handleInputChangeCalFirst =(e) => {
      e.preventDefault();
      let num = e.target.value;
     setCalFirst()
  };
  
     const formatInputCalFirst = (e) => {
  
       e.preventDefault();
       let num = e.target.value;
       if (num < 0) {
        num = num *-1
    }
       setCalFirst(parseFloat(num).toFixed(2))
     };
     const handleInputChangeCalNext =(e) => {
      e.preventDefault();
      let num = e.target.value;
      setCalNext();
  };
  
     const formatInputCalNext = (e) => {
  
       e.preventDefault();
       let num = e.target.value;
       if (num < 0) {
        num = num *-1
    }
       setCalNext(parseFloat(num).toFixed(2))
     };    
    
    const handleInputChangeTaxRate =(e) => {
     e.preventDefault();
     const num = e.target.value;
     setRate(num)
 };
 
    const formatInputTaxRate = (e) => {
 
      e.preventDefault();
      let num = e.target.value;
      if (num < 0) {
        num = num *-1
    } 
      setRate(parseFloat(num).toFixed(2))
    };    


  const handleInputChangeTax =(e) => {
   e.preventDefault();
   const num = e.target.value;
   setTax(num)
};
const handleInputChangeNextTax =(e) => {
  e.preventDefault();
  const num = e.target.value;
  setNextTax(num)
};

  const formatInputTax = (e) => {

    e.preventDefault();
    let num = e.target.value;
    if (num < 0) {
      num = num *-1
  }
    setTax(parseFloat(num).toFixed(2))
  };    
  const formatInputNextTax = (e) => {

    e.preventDefault();
    let num = e.target.value;
    if (num < 0) {
      num = num *-1
  }
    setNextTax(parseFloat(num).toFixed(2))
  };    
    const onhandleNew = (e) => {
       let n = data.length+1;
        setCategory(cat[n])
       inputReference.current.focus();
    };
    const onhandleAdd = (e) => {
  
    
       let catText = cat[data.length].value
    //** check the date 
   // alert(lEdit);
  //  alert(incomeTo); 
    if (lEdit) {
      const newDatas = [...data];  
      for (let x = 0; x < newDatas.length; x++) {
     //   alert(newDatas[x].category+ ' == '+selectedCategory);
              if (newDatas[x].category === selectedCategory) {
                newDatas[x].incomeFrom = incomeFrom;
                newDatas[x].incomeTo = incomeTo;
                newDatas[x].calFirst = calFirst;
                newDatas[x].calNext = calNext;    
                newDatas[x].rate = rate;
                newDatas[x].tax = tax;
                newDatas[x].nextTax = nextTax;
              }

      }
      setData(newDatas);
    } else {    
     const newData = {
        companyID: companyID,
        category: catText,
        incomeFrom: incomeFrom,
        incomeTo: incomeTo,
        calFirst: calFirst,
        calNext: calNext,
        rate: rate,
        tax: tax,
        nextTax: nextTax,
      }
   //   data.push(newData);
//  alert(data.length);

     // if lEdit
const newDatas = [...data, newData];
setData(newDatas);
//data=e.target.value;
//setCategory(cat[data.length+1].value);
 
    } // if lEdit
    
   setCategory(cat[data.length+1].value);
   setIncomeFrom(0);
   setIncomeTo(0);
   setCalFirst(0);
   setCalNext(0);
   setRate(0);
   setTax(0);
   setNextTax(0);
   lEdit =false; 
   selectedCategory = '';
   inputReference.current.focus();

     

   };
    const onhandleUpdate = (e) => { 
   
   
    // ******* update income tax
    // search incomeTax if existed then delete

   // alert(data.length);

    //    incomeTaxDelete  // delete 

    var user = {  companyID: companyID}
    fetch(url+'/incomeTaxDelete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( user)
      // We convert the React state to JSON and send it as the POST body
     // data: JSON.stringify(user,user.ame)
      }).then(function(response) {
       return response.text()
    }).then(function(text) {
    
    //alert(text);
    // if (text === 'success')
    
      
     })


//alert('here');
//alert(data.length);
for (let x = 0; x < data.length; x++) { 
  data[x].category = cat[x].value;   
 }
    Axios
    .post(url+'/saveIncomeTax',data  
     
    
    
    )
    
    .then(res => {
    
     
     //  if (res.data === 'Success') {
    
    
       
       //    window.location.reload(false);
      //  window.location.href='incomeTax';
    
     //  };
  
      //  alert(text);
      }, []);
     // setData([]);
     // window.location.reload(false);
      window.location.href ='incomeTax';
    }; 
       
    const onhandleHome = () => {
     // window.location.reload(false);
      window.location.href ='/home';
    };



    return (
        <div>
        <div className="col-sm-12 btn btn-light">
          <h2>  Income Tax Chargeable Listing  </h2>
         </div>

            <div className="row" style={{ 'margin': "10px", marginTop: '1px' }}>

            </div>
            <table class="table table-bordered"style={{border: '1px solid dark'}}>

                <thead class="thead-dark" >
                    <tr>
                    <th style={{backgroundColor: '#c8cbcf', width: '10px', border: '1px solid black'}}>CAT</th>
                    <th style={{backgroundColor: '#c8cbcf', border: '1px solid black'}}>Income From</th>
                    <th style={{backgroundColor: '#c8cbcf', border: '1px solid black'}}>Income To</th>
                    <th style={{backgroundColor: '#c8cbcf', border: '1px solid black'}}>Calculations First</th>
                    <th style={{backgroundColor: '#c8cbcf', border: '1px solid black'}}>Calculation Next</th>
                    <th style={{backgroundColor: '#c8cbcf', border: '1px solid black'}}>Next Rate</th>
                    <th style={{backgroundColor: '#c8cbcf', width: '200px', border: '1px solid black'}}>First Tax</th>     
                    <th style={{backgroundColor: '#c8cbcf', width: '200px', border: '1px solid black'}}>Next Tax</th>
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '40px',width: '100px', padding: '1px', borderRadius: '50%'}} onClick={() => onhandleNew()}>New Tax <i class='fa fa-file-text-o'></i></button>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                     return <tr key={item.category}>
                        <td style={{border: '1px solid black'}}>{item.category}</td>
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.incomeFrom).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.incomeTo).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>                       
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.calFirst).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.calNext).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.rate).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.tax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td style={{backgroundColor: 'white', border: '1px solid black'}}>{parseFloat(item.nextTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                       <a><button class ={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white'}} onClick={() => onhandleEdit(item.category)}>Edit</button></a>
                        <a><button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onhandleRemove(item.category)}>Del</button></a>
                        </tr>
                    })}
                </tbody>
            </table>
            <h4> Modify Income Tax Information</h4>
     <label style={{ align: "right", color: 'black', paddingLeft: '150px'}}>
  
         Chargeable Income From :    
         <input style={{width: '100px', marginLeft: '.6rem', marginRight: '1rem', width: '200px'}} type='number' name='incomeFrom' value={incomeFrom}
          ref={inputReference}  placeholder='0.00' 
           onChange={handleInputChangeIncomeFrom} onBlur={formatInputIncomeFrom}   
         /> 
        Chargeable Income To :    
         <input style={{width: '100px', marginLeft: '.6rem', width: '200px', marginRight: '1rem'}} type='number' name='incomeTo' value={incomeTo}
          placeholder='0.00'
           onChange={handleInputChangeIncomeTo} onBlur={formatInputIncomeTo}   
         
         />  
      First Calculations :
      <input style={{width: '200px', marginLeft: '.5rem', marginRight: '1rem'}} type='number' name='calFirst' value={calFirst}
     placeholder='0.00' 
     onChange={handleInputChangeCalFirst} onBlur={formatInputCalFirst}  
       />      
   </label>        
   <label style={{ align: "right", color: 'black', paddingLeft: '150px'}}>
    
         Next Calculations :    
         <input style={{width: '200px', marginLeft: '4.2rem', marginRight: '7rem', width: '200px'}} type='number' name='calNext' value={calNext}
         placeholder='0.00' 
         onChange={handleInputChangeCalNext} onBlur={formatInputCalNext}   
         />
        Tax Rate :    
         <input style={{width: '100px', marginLeft: '.6rem', marginRight: '1rem', width: '200px'}} type='number' name='rate' value={rate}
          placeholder='0.00' 
          onChange={handleInputChangeTaxRate} onBlur={formatInputTaxRate}   
         />    
          First Tax :    
         <input style={{width: '100px', marginLeft: '4.6rem', marginRight: '1rem', width: '200px'}} type='number' name='tax' value={tax}
        placeholder='0.00' 
           onChange={handleInputChangeTax} onBlur={formatInputTax}   
         /> 
         <br></br>
        Next Tax :    
         <input style={{width: '100px', marginLeft: '.5rem', width: '200px'}} type='number' name='nextTax' value={nextTax}
        placeholder='0.00' 
           onChange={handleInputChangeNextTax} onBlur={formatInputNextTax}   
         />            
     </label>  
     <p></p>      
     <button class={'rounded-pill'} style={{ backgroundColor: 'yellow', color: 'black', height: '40px',width: '100px', padding: '1px', marginRight: '1rem'}} onClick={() => onhandleHome()}>Home <i class="fa fa-home"></i></button>
     <button class={'rounded-pill'} style={{ backgroundColor: 'cyan', color: 'black', height: '40px',width: '280px', padding: '1px', marginRight: '1rem'}} onClick={() => onhandleUpdate()}>Update Income Tax Info  <i class='fa fa-save'></i></button> 
     <button class={'rounded-pill'} style={{ backgroundColor: '#a6f6ba', color: 'black', height: '40px',width: '250px', padding: '1px', marginRight: '1rem'}} onClick={() => onhandleAdd()}>Add Income Tax Info <i class='fa fa-plus-circle'></i></button> 
     


        </div>
 
)
};

export default IncomeTax;
