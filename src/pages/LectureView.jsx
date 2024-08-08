import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

export const LectureView = () => {
  const componentRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("token")); // Provide the correct key for token

  const id = location?.state?.id || location?.state?.supervisor_id;
 

  const fetchStudentTp = async (id) => {
    if (!token) {
      setError('Token is missing.');
      return;
    }
    let url =""
   if(location?.state?.id) {
    url = `https://uil-tp.com.ng/lecture/get-students-by-school?school_id=${id}`
     
   }
    else if(location?.state?.supervisor_id){
      url =`https://uil-tp.com.ng/lecture/students-under-supervisor?supervisor_id=${id}`
   }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch details.');
        return;
      }

      const data = await response.json();
      setData(data.data || []);
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudentTp(id);
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleNavigate = (matricNo, type) => {
    navigate(`/some-route?matric_no=${matricNo}&type=${type}`);
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div
        ref={componentRef}
        className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg mt-10 FormalLetter"
      >
         All students     <p>
         {data[0]?.name}

         <p>  </p>{data[0]?.address}
         </p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Matric No</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Last Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>department</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>phone number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.matric_no}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.firstname}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.lastname}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {student.department}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {student.phone_number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button  onClick={handlePrint} className="btn btn-secondary">
          Print
        </button>
      </div>
    </>
  );
};
