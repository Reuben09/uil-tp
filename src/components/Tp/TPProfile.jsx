import React, { useEffect, useState } from 'react';
import { Input, Button } from '../../components'; 
import { WindowReloader } from '../../components';
import Select from "react-select";

export const TPProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [femail, setEmail] = useState("");
  const [fmiddle, setFmiddle] = useState("");
  const [gender, setGender] = useState("");
  const [loader, setLoader] = useState(false);

  const GenderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

  const handleGenderChange = (selectedOption)=> {
    setGender(selectedOption);
  }
  const dataform = {
    matric_no: user?.matric_no,
    email: femail,
    phone_number: phone,
    gender: gender?.value,
    lastname: lname,
    firstname: fname,
    middlename: fmiddle,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const session = 2024;
    try {
      const response = await fetch(`https://uil-tp.com.ng/stud/students-edit?session=${session}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataform),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error('Failed to update profile.');
      }

      alert('Profile updated successfully');
      setLoader(false);

    } catch (error) {
      alert('Error occurred while updating profile');
      setLoader(false);
    }
  };

  const Getdetails = async () => {
    try {
      const response = await fetch(`https://uil-tp.com.ng/stud/students-details?matric_no=${user?.matric_no}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch student details.');
      }

      const data = await response.json();
      const student = data.data[0];
      setFname(student.firstname);
      setPhone(student.phone_number);
      setFmiddle(student.middle_name);
      setEmail(student.email);
      setLname(student.lastname);
      setGender(student.gender);
    } catch (error) {
      console.error('Error occurred while fetching student details:', error);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#D9D9D9",
      cursor: "pointer",
      width: "100%",
      height: "100%",
    }),
  };

  useEffect(() => {
    Getdetails();
  }, []);

  if (loader) {
    return <WindowReloader />;
  }

  return (
    <div className="h-full w-full p-10">
      <h1 className="text-4xl text-background2 font-semibold">My Profile</h1>
      <div className="flex lg:flex-row flex-col lg:w-4/5 w-full mt-8">
        <div className="w-full">
          <div className="my-2 w-full">
            <p className="mb-2">First Name</p>
            <input 
              value={fname} 
              onChange={(e) => setFname(e.target.value)}  
              className="w-full bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="my-2 w-full">
            <p className="mb-2">Matric Number/Id</p>
            <input 
              disabled 
              value={user?.matric_no} 
              className="w-full cursor-not-allowed bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="my-2 w-full">
            <p className="mb-2">Phone Number</p>
            <input 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="my-2 w-full">
            <p className="mb-2">Middle Name</p>
            <input 
              value={fmiddle} 
              onChange={(e) => setFmiddle(e.target.value)} 
              className="w-full bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
        </div>
        <div className="lg:mx-8 mx-0 w-full">
          <div className="my-2 w-full">
            <p className="mb-2">Email</p>
            <input 
              value={femail} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="my-2 w-full">
            <p className="mb-2">Department</p>
            <input 
              disabled 
              value={user?.department} 
              className="w-full cursor-not-allowed bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="my-2 w-full">
            <p className="mb-2">Last Name</p>
            <input 
              value={lname} 
              onChange={(e) => setLname(e.target.value)} 
              className="w-full bg-background1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="my-2 w-full">
            <p className="mb-2">Gender ({user?.gender})</p>
            <Select 
              options={GenderOptions} 
              value={gender} 
              onChange={handleGenderChange}
              styles={customStyles}
              className="w-full bg-background1 border border-gray-300 rounded-md px-4 py-2 text-black focus:outline-none focus:border-blue-500" 
            />
          </div>
        </div>
      </div>

      <Button
        handleSubmit={handleSubmit}
        className="text-white mt-8 py-3 px-10 rounded-xl bg-background2"
        label="Submit"
      />
    </div>
  );
};
