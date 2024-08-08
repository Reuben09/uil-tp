import { useState } from 'react'
import { TPSelectStdSchool, TPChangeStdSchool, TPViewStdProfile, BackButton, AdminControl } from "../../components"

export const TeachingPracticeselect = ({ setStudentSelectTP }) => {
  const [tpOptions, setTpOptions] = useState("neutral");

  const handleBack = () => {
    setStudentSelectTP(null);
  }

  const renderContent = () => {
    switch (tpOptions) {
      case "selectSchool":
        return <TPSelectStdSchool setTpOptions={setTpOptions} />;
      case "adminschool":
        return <AdminControl setTpOptions={setTpOptions} />;
      case "changeSchool":
        return <TPChangeStdSchool setTpOptions={setTpOptions} />;
      case "viewProfile":
        return <TPViewStdProfile setTpOptions={setTpOptions} />;
      default:
        return (
          <div className="w-full flex justify-center">
            <div className="w-4/5">
              <div className="w-full mt-12 flex justify-end">
                <BackButton handleBack={handleBack} />
              </div>
              <div className='w-full grid grid-cols-3 gap-4 mt-5'>
                <OptionCard
                  title="Select Student School"
                  onClick={() => setTpOptions("selectSchool")}
                />
                <OptionCard
                  title="Change Student School"
                  onClick={() => setTpOptions("changeSchool")}
                />
                <OptionCard
                  title="View Student Profile"
                  onClick={() => setTpOptions("viewProfile")}
                />
                <OptionCard
                  title="Set TP Date"
                  onClick={() => setTpOptions("adminschool")}
                />
              </div>    
            </div>
          </div>
        );
    }
  }

  return renderContent();
}

const OptionCard = ({ title, onClick }) => (
  <div onClick={onClick} className='bg-background1 h-32 rounded-lg p-4 hover:bg-background2 hover:text-white cursor-pointer'>
    <h2 className='ml-2 mb-4 font-semibold'>{title}</h2>
  </div>
);
