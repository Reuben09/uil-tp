import { useState } from 'react'
import { Button, WindowReloader } from '../../components'


export const ChangePassword = () => {
const [password, setoldpaasward] = useState('');
const [newPassword, setNewpassord] = useState('');
const [loader, setLoader] = useState(false);

const user = JSON.parse(localStorage.getItem("user"))
const token = JSON.parse(localStorage.getItem("token"))

const CheckResponse =async()=>{

  let url = ''

if(user?.matric_no)
{
  url =`https://uil-tp.com.ng/manage/change-password`
}
else{
  url =`https://uil-tp.com.ng/manage/change-password-supervisors`
}
  setLoader(true);
  const response = await fetch(url, {
    method: "POST",
    body:JSON.stringify({
      oldPassword:password,
      newPassword:newPassword,
      id:user?.id
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  console.log(response)
  setLoader(false);
  
}



if (loader) {
  return (
    <>
      <WindowReloader />
    </>
  );
}
  return (
    <>
       <div className="h-full w-full p-10 flex flex-col">
    <h1 className="text-4xl mb-3 text-background2 font-semibold text-center mt-16">Choose a Password</h1>
    <h1 className="text-2xl font-bold mb-4 text-center">Must be 9 characters</h1>

    <div className="flex items-center justify-center justify-self-center  self-center flex-col lg:w-3/5 w-full">
      <input 
      onChange={(e)=> setoldpaasward(e.target.value)}
        className="bg-background1 my-3 md:w-4/5 w-4/5 p-3 rounded-3xl italic" placeholder="old Password" type="password" />
        <input
        onChange={(e)=> setNewpassord(e.target.value)}
        className="my-3 md:w-4/5 w-4/5 p-3 rounded-3xl italic bg-background1"
         placeholder="New Password" type="password" />
         <Button handleSubmit={CheckResponse} label="Change Password"/>
    </div>

  </div>
    </>
  )
}
