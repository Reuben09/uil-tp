import axios from 'axios';

export const chooseSchoolTwo = async (values) => {
  const token = JSON.parse(localStorage.getItem('token')); // Retrieve the token from local storage
  try {
    const response = await axios.post('https://uil-tp.com.ng/admin/choose-school-two', 
        
      {
        schhol_id:values?.schoolId,
        matric_number: values?.matricNumber,
        subject: values?.subject
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ensure the token is included in the request headers
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error choosing school:', error);
    return null;
  }
};
