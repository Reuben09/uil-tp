import React, { useEffect, useState } from "react";
import { Input, Button } from "../../components";

export const TPDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [details, setDetails] = useState(null);

  async function fetchStudentProfile() {
    try {
      const response = await fetch(`https://uil-tp.com.ng/stud/get-student-details?student_id=${user?.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok.');
        
      }    

      const data = await response.json();
      setDetails(data.data);
      
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  }

  useEffect(() => {
    fetchStudentProfile();
  }, []); // Fetch student profile on component mount

  return (
    <>
      <div className="w-full py-10 px-12 h-auto">
        <h1 className="lg:text-4xl text-3xl text-background2 text-center lg:text-left font-semibold">Welcome Back</h1>

        <div className="mt-8 lg:w-4/5 w-full">
          <div className="flex flex-col justify-center items-center mb-16">
            <img src="https://i.imgur.com/3YzCjWm.png" className="mb-4" alt="User avatar" />
            <h1 className="text-colour1 text-3xl font-bold">{user?.firstname.toUpperCase()}, {user?.lastname}</h1>
          </div>

          {details && (
            <div>
              <h1 className="text-2xl font-bold mb-8">School Assigned to</h1>
              <Input bol={true} placehold={details?.name} label="School Name" value={details.schoolName} />
              <Input placehold={details?.address} label="Location" value={details.location} />
              <Input placehold={details?.subject} label="Teaching Subject" value={details.teachingSubject} />
            </div>
          )}

          <div className="flex justify-between flex-col lg:flex-row mt-5 lg:mt-10">
            <Button label="Print Posting Letter" />
            <Button label="Change School" />
          </div>
        </div>
      </div>
    </>
  );
};
