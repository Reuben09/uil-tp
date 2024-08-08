import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

export const AdminControl = ({ setTpOptions }) => {
  const token = JSON?.parse(localStorage?.getItem("token"));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [coordinatorName, setCoordinatorName] = useState("");

  const handleFilechange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('coordinator_name', coordinatorName);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        "https://uil-tp.com.ng/admin/post_date",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
    } catch (e) {
      console.error('Error posting date:', e);
    }
  };

  const handleGetAll = async () => {
    try {
      const response = await axios.get(
        "https://uil-tp.com.ng/admin/get_date",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
    } catch (e) {
      console.error('Error getting date:', e);
    }
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <div className="w-full py-10 px-12 h-auto">
      <h4>Please select a date and time for TP practice to start and end</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">
            Enter the start date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            placeholder={data?.start_date || ''}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded p-2 mt-1 block w-full"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">
            Enter the end date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            placeholder={data?.end_date || ''}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded p-2 mt-1 block w-full"
          />
        </div>
        <div>
          <label htmlFor="coordinatorName" className="block text-sm font-medium">
            Coordinator Name
          </label>
          <input
            type="text"
            id="coordinatorName"
            value={coordinatorName}
            onChange={(e) => setCoordinatorName(e.target.value)}
            placeholder={data?.coordinator_name || ''}
            className="border border-gray-300 rounded p-2 mt-1 block w-full"
          />
          <label htmlFor="image" className="block text-sm font-medium mt-4">
            Upload Coordinator Signature
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFilechange}
            className="border border-gray-300 rounded p-2 mt-1 block w-full"
          />
        </div>
        <Button handleSubmit={handleSubmit} type="submit" label={data?.coordinator_name ? "Update" : "Submit"} />
      </form>
    </div>
  );
};
