import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    memberEmail: '',
    memberPassword: '',
    memberName: '',
    phoneNumber: '',
    academyName: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    axios.get('0.0.0.0/api/profile', { 
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      setProfileData(response.data);
    })
    .catch(error => {
      console.error(error);
   });
  }, []);

  const handleChange = (e) => {
     setProfileData({...profileData,[e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     // send the updated data to the backend
     axios.post('0.0.0.0/api/profile/edit', profileData ,{
       headers: { 
         Authorization: `Bearer ${localStorage.getItem('token')}` 
       }
     })
     .then(response=>{
       console.log(response.data)
       // handle success
     })
     .catch(err=>{
       console.error(err)
       // handle error
     });
   };

   return (
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="memberEmail" value={profileData.memberEmail} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="memberPassword" value={profileData.memberPassword} onChange={handleChange} />
        </label>
        <label>
          Name:
          <input type="text" name="memberName" value={profileData.memberName} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={profileData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          Academy Name:
          <input type="text" name="academyName" value={profileData.academyName} onChange={handleChange} />
        </label>

         {/* Add any other fields you have */}
         
         <button type='submit'>Submit</button>  
         
       </form>    
   );
};

export default EditProfile;
