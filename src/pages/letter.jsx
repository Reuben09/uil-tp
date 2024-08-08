import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import Html2Pdf from 'js-html2pdf';

export const FormalLetter = () => {
  const componentRef = useRef();
  const location = useLocation();
  const data = location?.state?.data;
  const data2 = location?.state.data2;

  useEffect(()=> {
     console.log("path:",data2?.image_path);
  },[])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementsByClassName("FormalLetter")[0];
        const options = {
          margin: 0,
          filename: "posting-letter.pdf",
        };
        const exporter = new Html2Pdf(html, options);
        await exporter.getPdf(options);
      }
    },
  });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const options = {
      weekday: 'long',  
      day: 'numeric',   
      month: 'long',    
      year: 'numeric' 
    };
  

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(date);
  };
  
  const year = () => {
    const date = new Date();
  
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();
  
    // Helper function to add ordinal suffix to the day
    const getOrdinalSuffix = (day) => {
      const j = day % 10;
      const k = Math.floor(day % 100 / 10);
      if (k === 1) {
        return day + 'th';
      }
      return day + (j === 1 ? 'st' : j === 2 ? 'nd' : j === 3 ? 'rd' : 'th');
    };
  
    return `${year}`;
  };


  const formatCurrentDate = () => {
    const date = new Date();
  
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();
  
    // Helper function to add ordinal suffix to the day
    const getOrdinalSuffix = (day) => {
      const j = day % 10;
      const k = Math.floor(day % 100 / 10);
      if (k === 1) {
        return day + 'th';
      }
      return day + (j === 1 ? 'st' : j === 2 ? 'nd' : j === 3 ? 'rd' : 'th');
    };
  
    return `${getOrdinalSuffix(day)} ${month}, ${year}`;
  };
  

  return (
    <>
    <div
      ref={componentRef}
      className="max-w-4xl mx-auto p-10 bg-white  shadow-md rounded-lg mt-10 FormalLetter"
    >
      <div className="text-center mb-6">
        <div className="h-16 my-4 flex justify-center">
          <img
            src="https://i.imgur.com/BuFYzum.png"
            alt="unilorin-logo"
            className="w-20 h-auto"
          />
        </div>
        <h1 className="text-3xl font-bold">University of Ilorin</h1>
        <h2 className="text-2xl font-bold mt-2">Faculty of Education</h2>
        <p className="text-base mt-2">{year()} Teaching Practice Exercise</p>
        <hr/>
      </div>
      <div id="formal-letter">
      <div
  style={{
    textAlign: 'Right', // Ensures text is aligned to the left
    marginBottom: '1rem' // Ensures consistent bottom margin if needed
  }}
  className="mb-4"
>
  <p className="text-sm">{formatCurrentDate()}</p>
</div>


        <div className="mb-4">
          <p className="text-base">
            The Principal, <br />
            {data?.school_name} <br />
            {data?.address}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-base">Dear Sir/Ma,</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {year()} TEACHING PRACTICE EXERCISE
          </h2>
          <p className="text-base">
            {`${data?.gender === "female" ? 'Mrs.' : 'Mr.'} ${data?.firstname} ${data?.lastname}`} has been posted for immediate resumption to your school for
            a six-week Teaching Practice exercise, {formatDate(data2?.start_date)} to {formatDate(data2?.end_date)}. He is also expected to participate fully in all other school activities daily at the usual time.
          </p>
        </div>
        <div className="mb-4">
          <p className="text-base">
            We would appreciate it if you could appoint a committed teacher to serve as MENTOR TEACHER and oversee the activities of the student. This will greatly assist in monitoring the student and ensure quality control.
          </p>
        </div>
        <div className="mb-4">
          <p className="text-base">
            As stakeholders in education, we implore you to treat him like your permanent staff, especially in the areas of dressing and attitude to work. We also wish to have a separate attendance register opened for him during the period.
          </p>
        </div>
        <div className="mb-4">
          <p className="text-base">Thank you for your usual cooperation.</p>
        </div>
        <div className="mt-6">
          <p className="text-base">Yours faithfully,</p>
          image_path
          <img
          src={`https://uil-tp.com.ng/${data2?.image_path}`}
          alt="Unilorin Logo"
          className="w-40 h-auto"
        
        />
          <p className="text-lg font-bold mt-2">{data2?.coordinator_name}</p>
          <p className="text-base">Coordinator, TP Committee</p>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-6">
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Print
      </button>
    </div>
  </>
  );
};
