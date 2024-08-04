import { Input } from "../Input";
import { useEffect, useState } from "react";
import { Button } from "../Button";

export const ScoreStudents = () => {
  // Define list data as a reactive reference

  const [students, setStudents] = useState([]); 
  const [error, setError] = useState(null);
  const [Tpstudent, setTpstudent] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchStudentOb = async()=>{
    if (!user || !token) {
      setError('User or token is missing.');
      return;
    }
    try {
      const response = await fetch(`https://uil-tp.com.ng/lecture/students-under-supervisor?supervisor_id=${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        
        throw new Error('Failed to fetch details.');
      }

      const data = await response.json();
      setStudents(data.data)
    } catch (error) {
      console.error('Error occurred while fetching lecture details:', error);
      setError('Failed to load lecture details.');
    }
  }



  const fetchStudentTp = async ()=>{
    if (!user || !token) {
      setError('User or token is missing.');
      return;
    }
    try {
      const response = await fetch(`https://uil-tp.com.ng/lecture/get-students-by-school?school_id=${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch details.');
      }

      const data = await response.json();
      setTpstudent(data.data)
    } catch (error) {
      console.error('Error occurred while fetching lecture details:', error);
      setError('Failed to load lecture details.');
    }
  }

  useEffect(() => {
    fetchStudentTp();
  }, [Tpstudent]);

  useEffect(() => {
    fetchStudentOb();
  }, [students]);




  




  const studentsList = [
    { id: 1, name: 'Reuben Chukwuka', dept: 'Educational Technology', number: '08036753367' },
    { id: 2, name: 'James Blunt', dept: 'Science Technology', number: '0803675378' },
    { id: 2, name: 'Samson Siasia', dept: 'Art Education', number: '0703675378' },
  ];

  return (
    <div className="h-full w-full p-10">
      <h1 className="text-3xl text-background2 font-semibold mb-20">Score Students</h1>
      <h1 className="text-xl font-bold mb-4 mt-8 text-background2">Teaching Practice</h1>
      <div className="h-full w-full overflow-scroll mb-12">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
          <tr className="grid grid-cols-4 w-full" style={{backgroundColor: "rgba(41, 23, 109, 0.1)"}} >
            {['First Name', 'Last Name', "matric number",'scores'].map(head => (
              <th key={head} className="p-4 tracking-widest w-full">
                <div className="font-medium tracking-widest whitespace-nowrap text-sm flex text-background2 font-semibold">
                  {head}
                </div>
              </th>
            ))}
          </tr>
          </thead>
          <tbody style={{ backgroundColor: "#f5f6fa" }}>
          {Tpstudent.length > 0 ? (
            Tpstudent.map(({ id, firstname, lastname, matric_no, value
             }) => (
              <tr key={id} className="grid grid-cols-4 border-b border-blue-gray-50">
                <td className="p-4">{firstname}</td>
                <td className="p-4">{lastname}</td>
                <td className="p-4">{matric_no}</td>
                <td className="p-4">
                <input
              
                placeholder={value?value:"score"}
                style={{
                  width:70,
                  padding:10,
                 
                }}
                />
                </td>
               
              
              </tr>
            ))
          ) : (
            <tr style={{ backgroundColor: '#f5f6fa' }} className="flex flex-col flex-1 justify-center py-32 text-center">
              <td colSpan="4" className="flex justify-center mb-8">
                <img src="https://i.imgur.com/VQEIj2b.png" alt="icon" />
              </td>
              <td colSpan="4" className="capitalize text-black font-normal text-sm">
                Peers list is empty. wait for admin decision.
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <h6 style={{color:"red"}}>You can save and continue later</h6>
        <Button
        label={"Save"}
        />
      </div>
  

      <h1 className="text-xl font-bold mb-4 text-background2">Peers Teaching</h1>
      <div className="h-full w-full overflow-scroll mb-12">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
          <tr className="grid grid-cols-4 w-full" style={{backgroundColor: "rgba(41, 23, 109, 0.1)"}} >
            {['First Name', 'Last Name', 'Matric number', "scores"].map(head => (
              <th key={head} className="p-4 tracking-widest w-full">
                <div className="font-medium tracking-widest whitespace-nowrap text-sm flex text-background2 font-semibold">
                  {head}
                </div>
              </th>
            ))}
          </tr>
          </thead>
          <tbody style={{ backgroundColor: "#f5f6fa" }}>
          {students.length > 0 ? (
            students.map(({ id, firstname, lastname, matric_no, value
             }) => (
              <tr key={id} className="grid grid-cols-4 border-b border-blue-gray-50">
                <td className="p-4">{firstname}</td>
                <td className="p-4">{lastname}</td>
                <td className="p-4">{matric_no}</td>
                <td className="p-4">
                <input
                placeholder={value?value:"score"}
                style={{
                  width:70,
                  padding:10,
                }}
                />
                </td>
              </tr>
            ))
          ): (
            <tr style={{ backgroundColor: '#f5f6fa' }} className="flex flex-col flex-1 justify-center py-32 text-center">
              <td colSpan="4" className="flex justify-center mb-8">
                <img src="https://i.imgur.com/VQEIj2b.png" alt="icon" />
              </td>
              <td colSpan="4" className="capitalize text-black font-normal text-sm">
                Peers list is empty. Add a peer.
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <h6 style={{color:"red"}}>You can save and continue later</h6>
        <Button
        label={"Save"}
        />
      </div>
      <h6 style={{
        color:"darkblue"
      }}> brought to you by Dr. Aderoju tech team</h6>
    </div>
  );
};

