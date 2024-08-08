import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../Button";
import { WindowReloader } from '../WindowReloader';

const API_BASE_URL = 'https://uil-tp.com.ng/lecture';

export const ScoreStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [tpStudents, setTpStudents] = useState([]);
  const [scores, setScores] = useState([]);
  const [scoresOb, setScoresOb] = useState([]);
  const [loader, setLoader] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchStudents = async (url, setter) => {
    if (!user || !token) {
      setError('User or token is missing.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${url}?supervisor_id=${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch details.');
      const data = await response.json();
      setter(data.data || data);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      setError('Failed to load data.');
    }
  };

  useEffect(() => {
    fetchStudents('students-under-supervisor', setStudents);
    fetchStudents('students-under-tp', setTpStudents);
  }, []);

  console.log(tpStudents)

  const handleScoreChange = (tpRecordId, value) => {
    setScores(prevScores => {
      const numericValue = parseInt(value, 10) || 0;
      const updatedScores = prevScores.map(score =>
        score.tp_record_id === tpRecordId
          ? { ...score, value: numericValue }
          : score
      );
      if (!updatedScores.some(score => score.tp_record_id === tpRecordId)) {
        updatedScores.push({ tp_record_id: tpRecordId, value: numericValue });
      }
      return updatedScores;
    });
  };

  const handleScoreChangeOb = (obRecordId, value) => {
    setScoresOb(prevScores => {
      const numericValue = parseInt(value, 10) || 0;
      const updatedScores = prevScores.map(score =>
        score.ob_record_id === obRecordId
          ? { ...score, value: numericValue }
          : score
      );
      if (!updatedScores.some(score => score.ob_record_id === obRecordId)) {
        updatedScores.push({ ob_record_id: obRecordId, value: numericValue });
      }
      return updatedScores;
    });
  };

  const handleReset = async (id) => {
    setLoader(true);
    try {
      await axios.delete(`${API_BASE_URL}/reset?tp_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setScores(scores.filter(score => score.tp_record_id !== id));
    } catch (error) {
      console.error('Error resetting TP student score:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleResetOb = async (id) => {
    setLoader(true);
    try {
      await axios.delete(`${API_BASE_URL}/resetOb?ob_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setScoresOb(scoresOb.filter(score => score.ob_record_id !== id));
    } catch (error) {
      console.error('Error resetting OB student score:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/score-students`, {
        supervisor_id: user?.id,
        tp_records: scores,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setError('Scores submitted successfully.');
      }
    } catch (error) {
      setError('Error submitting scores.');
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSave2 = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/score-ob`, {
        supervisor_id: user?.id,
        ob_records: scoresOb,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setError('Scores submitted successfully.');
      }
    } catch (error) {
      setError('Error submitting scores.');
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <WindowReloader />;
  }

  return (
    <div className="h-full w-full p-10">
      <h1 className="text-3xl text-background2 font-semibold mb-20">Score Students</h1>

      <Section title="Teaching Practice">
        {tpStudents.length > 0 ? (
          <Table
            data={tpStudents}
            handleScoreChange={handleScoreChange}
            handleReset={handleReset}
            isTpStudent
          />
        ) : (
          <EmptyState message="Peers list is empty. Wait for admin decision." />
        )}
        <Button label="Save" handleSubmit={handleSave} />
      </Section>

      <Section title="Peers Teaching">
        {students.length > 0 ? (
          <Table
            data={students}
            handleScoreChange={handleScoreChangeOb}
            handleReset={handleResetOb}
          />
        ) : (
          <EmptyState message="Peers list is empty. Add a peer." />
        )}
        <Button label="Save" handleSubmit={handleSave2} />
      </Section>

      <h6 style={{ color: "darkblue" }}>Brought to you by Dr. Aderoju tech team</h6>
    </div>
  );
};

// Reusable Section component
const Section = ({ title, children }) => (
  <div className="mb-12">
    <h1 className="text-xl font-bold mb-4 text-background2">{title}</h1>
    <div className="h-full w-full overflow-scroll">
      {children}
    </div>
    <h6 style={{ color: "red" }}>You can save and continue later</h6>
  </div>
);

// Reusable Table component
const Table = ({ data, handleScoreChange, handleReset, isTpStudent }) => (
  <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr className="grid grid-cols-5 w-full" style={{ backgroundColor: "rgba(41, 23, 109, 0.1)" }}>
        {['First Name', 'Last Name', 'Matric Number', 'Scores', "Action"].map(head => (
          <th key={head} className="p-4 tracking-widest w-full">
            <div className="font-medium tracking-widest whitespace-nowrap text-sm flex text-background2 font-semibold">
              {head}
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody style={{ backgroundColor: "#f5f6fa" }}>
      {data.map(({ id, firstname, lastname, matric_no, value, tp, ob }) => (
        <tr key={id} className="grid grid-cols-5 border-b border-blue-gray-50">
          <td className="p-4">{firstname}</td>
          <td className="p-4">{lastname}</td>
          <td className="p-4">{matric_no}</td>
          <td className="p-4">
            <input
              type="number"
              disabled={value ? true : false}
              placeholder={value || "Score"}
              style={{ width: 70, padding: 5 }}
              onChange={(e) => handleScoreChange(isTpStudent ? tp : ob, e.target.value)}
            />
          </td>
          <td className="p-4">
            <button
              type="button"
              className="text-white py-3 px-10 rounded-xl bg-background2"
              onClick={() => handleReset(isTpStudent ? tp : ob)}
            >
              Reset
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Reusable EmptyState component
const EmptyState = ({ message }) => (
  <tr style={{ backgroundColor: '#f5f6fa' }} className="flex flex-col flex-1 justify-center py-32 text-center">
    <td colSpan="5" className="flex justify-center mb-8">
      <img src="https://i.imgur.com/VQEIj2b.png" alt="icon" />
    </td>
    <td colSpan="5" className="capitalize text-black font-normal text-sm">
      {message}
    </td>
  </tr>
);
