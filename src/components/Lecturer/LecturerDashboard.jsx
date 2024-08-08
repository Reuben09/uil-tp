
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
export const LecturerDashboard = () => {
  const [students, setStudents] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [error, setError] = useState(null);
  const [Tpstudent, setTpstudent] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate()

  const fetchDetails = async () => {
    
    if (!user || !token) {
      setError('User or token is missing.');
      return;
    }
    try {
      const response = await fetch(`https://uil-tp.com.ng/lecture/show-schools?lecture_id=${user?.id}`, {
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
      setLecture(data.data);
    } catch (error) {
      console.error('Error occurred while fetching lecture details:', error);
      setError('Failed to load lecture details.');
    }
  };

  const fetchStudentOb = async () => {
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





  useEffect(() => {
    fetchDetails();
  }, [lecture]);

  useEffect(() => {
    fetchStudentOb();
  }, [students]);









  return (
    <div className="h-full w-full p-10">
      <h1 className="lg:text-4xl text-3xl lg:text-left text-center text-background2 font-semibold">
        Welcome Back
      </h1>

      <div className="mt-8 lg:w-4/5 w-full">
        <div className="flex flex-col justify-center items-center mb-16">
          <img src="https://i.imgur.com/3YzCjWm.png" alt="avatar" className="mb-4" />
          <h1 className="text-colour1 text-3xl font-bold">{user?.fullname}</h1>
        </div>

        <h1 className="lg:text-xl text-lg mb-8">
          Schools assigned to you will show here
        </h1>
        <div className="h-full w-full overflow-scroll mb-12">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="grid grid-cols-4 w-full" style={{ backgroundColor: "rgba(41, 23, 109, 0.1)" }}>
                {["View and print", 'School Name', 'Address', 'Supervisor Name'].map(head => (
                  <th key={head} className="p-4 tracking-widest w-full">
                    <div className="font-medium tracking-widest whitespace-nowrap text-sm flex text-background2 font-semibold">
                      {head}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#f5f6fa" }}>
              {lecture.length > 0 ? (
                lecture.map(({ id, school_name, address, supervisor_name }) => (
                  <tr key={id} className="grid grid-cols-4 border-b border-blue-gray-50">
                    <td className="p-4">
                    </td>
                    <td className="p-4">{school_name}</td>
                    <td className="p-4">{address}</td>
                    <td className="p-4">{supervisor_name}</td>
                    <td className="p-4">
        <button 
        onClick={()=>navigate("/view-schools", { state: {id:id}})}
        className="text-white py-0 px-3 rounded-xl h-10 bg-background2">view</button>
  </td> 
  </tr>
                ))
              ) : (
                <tr style={{ backgroundColor: '#f5f6fa' }} className="flex flex-col flex-1 justify-center py-32 text-center">
                  <td colSpan="4" className="flex justify-center mb-8">
                    <img src="https://i.imgur.com/VQEIj2b.png" alt="icon" />
                  </td>
                  <td colSpan="4" className="capitalize text-black font-normal text-sm">
                    {error || 'No schools assigned yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <h1 className="lg:text-xl text-lg mb-8">
        Students assigned to you will show here
      </h1>
      <h1 className="text-2xl font-bold mb-4 text-background2">Observation Students</h1>
      <div className="h-full w-full overflow-scroll mb-12">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="grid grid-cols-4 w-full" style={{ backgroundColor: "rgba(41, 23, 109, 0.1)" }}>
              {['First Name', 'Last Name', 'Matric Number'].map(head => (
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
              students.map(({ id, firstname, lastname, matric_no }) => (
                <tr key={id} className="grid grid-cols-4 border-b border-blue-gray-50">

                  <td className="p-4">{firstname}</td>
                  <td className="p-4">{lastname}</td>
                  <td className="p-4">{matric_no}</td>
                </tr>
              ))
            ) : (
              <tr style={{ backgroundColor: '#f5f6fa' }} className="flex flex-col flex-1 justify-center py-32 text-center">
                <td colSpan="4" className="flex justify-center mb-8">
                  <img src="https://i.imgur.com/VQEIj2b.png" alt="icon" />
                </td>
                <td colSpan="4" className="capitalize text-black font-normal text-sm">
                  {error || 'No students assigned yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button label={"view"} handleSubmit={()=>navigate("/view-schools", { state: {supervisor_id:user?.id}})}/>
    
    <p>Brought to you by Dr.Aderoju tech Team <Button label={"read documentation"}/></p>
    </div>
  );
};
