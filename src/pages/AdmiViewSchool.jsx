import axios from "axios";
import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";


export const AdmiViewSchool=()=>{

   const token = JSON?.parse(localStorage?.getItem("token"))
   const location = useLocation()
   const id = location?.state?.school_id


async function GetAllInfo(){

try{
const response = await axios.get(`https://uil-tp.com.ng/admin/school-info?school_id=${id}`,{
   headers:{
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
   }
)
console.log(response)
}
catch (e){
console.log(e)
}

}


useEffect(()=>{
if(id){
 GetAllInfo()
}
},[id])



   return(
      <>
      <div>
         <p>Hello</p>
      </div>
      </>
   )
}