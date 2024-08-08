import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSchoolList } from '../../services/admin/schoollogic/schoollogic';
import axios from 'axios';

export const SchoolList = ({ setAddSchool, setSelectedSchool, setModalShow }) => {
  const [schools, setSchools] = useState([]);
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('')
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate()

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const handlesCHli = async () => {
    const data = await fetchSchoolList();
    console.log(data);
    if (data) {
      setSchools(data); 
    }
  };

  const Deketeschool = (id)=>{
    try{
const response = fetch(`https://uil-tp.com.ng/admin/admin-delete?id=${id}`,{
  method:"POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  },
})
    }
    catch(e){
console.log(e)
    }
  }

const Updateschool =(id)=>{
try{
const response = axios.put("https://uil-tp.com.ng/admin/update-school",{
  id:id,
  name:name,
  capacity:capacity
},{
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }
})
}
catch (e){
console.log(e)
}

}


  useEffect(() => {
    handlesCHli();
  }, []);

  const formatResult = (item) => {
    return (
      <div className="flex cursor-pointer">
        <span className="mx-2">{item.name}</span>
        <span className="mx-2">{item.school}</span>
      </div>
    );
  };

  const handleUpdate = (capacity, name, id)=> {
    const data = {
      capacity: capacity,
      name: name,
      id: id
    }

    console.log(data);
    setModalShow(true);
    setSelectedSchool(data)
  }

  return (
    <div className="flex flex-col my-4 justify-center items-center">
      <div className="flex items-center my-12 w-11/12 justify-start">
        <h1 className="text-xl font-bold text-background2">Schools</h1>
        <button onClick={() => setAddSchool(true)} className="mx-2 py-3 px-5 rounded-xl bg-background1">
          Add new
        </button>
      </div>
        <label className="sr-only">Search</label>
        <div className="relative w-full mb-6">
          <ReactSearchAutocomplete
            items={schools}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            placeholder="Search for school"
            styling={{
              backgroundColor: "#29176D",
              color: "white",
            }}
          />
        </div>
        <h6>Total Number of schools {schools?.length}</h6>
      <div style={{width: "58rem"}} className="h-full overflow-scroll mb-12">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="grid grid-cols-6 w-full" style={{ backgroundColor: "rgba(41, 23, 109, 0.1)" }}>
              {['S/N', 'School', 'Address', 'Allocation/Space',"No of student", 'Actions'].map((head) => (
                <th key={head} className="p-4 tracking-widest w-full">
                  <div className="font-medium tracking-widest whitespace-nowrap text-sm flex text-background2 font-semibold">
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#f5f6fa" }}>
            {schools.length > 0 ? (
              schools.map(({ id, name, address, capacity, tp_count }) => (
                <tr key={id} className="grid grid-cols-6 border-b border-blue-gray-50">
                  <td className="p-4">{id}</td>
                  <td className="p-4">{name}</td>
                  <td className="p-4">{address}</td>
                  <td className="p-4">{capacity}</td>
                  <td className="p-4">{tp_count}</td>
                  <td className="p-4 flex space-x-2">
                    <button className="py-1 px-2 text-sm bg-background1 text-black rounded" onClick={()=>handleUpdate(capacity, name, id)}>Update</button>
                    <button className="py-1 px-2 text-sm bg-red-700 text-white rounded" onClick={() => Deketeschool(id)}>Delete</button>
                    <button className="py-1 px-2 text-sm bg-blue-700 text-white rounded" onClick={()=>navigate("/viewpage",{state:{school_id:id}})} >View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ backgroundColor: '#f5f6fa' }} className="flex flex-col flex-1 justify-center py-32 text-center">
                <td colSpan="6" className="flex justify-center mb-8">
                  <img src="https://i.imgur.com/VQEIj2b.png" alt="icon" />
                </td>
                <td colSpan="6" className="capitalize text-black font-normal text-sm">
                  School list is empty. Add a School.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  console.log(`Delete school with id ${id}`);
  // Implement your delete logic here
};
