import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfile } from '../../redux/apiCall.js/profileApiCall';
import './updateProfile.css';
function UpdateProfile({setUpdate,profile}) {
    console.log(profile)
    const [username,setUsername] = useState(profile.username)
    const [bio,setBio] = useState(profile.bio)
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const submitFormHandler=(e)=>{
        e.preventDefault();
        const updatedUser = {username,bio}
        if(password !== ""){
            updatedUser.password = password
        }
        dispatch(updateProfile(profile?._id , updatedUser))
        setUpdate(false)
    }

    return (
        <div className='update-profile'>
            <form className='form-update-profile' onSubmit={submitFormHandler}>
                <abbr title='close'>
                    <i onClick={()=>setUpdate(false)} className='bi bi-x-circle-fill update-profile-form-close'></i>
                </abbr>
                <h2 className='update-profile-title'>Update Profile</h2>
                <input className='update-profile-input'
                    type="text"
                    value={username}
                    placeholder='write your name'
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input className='update-profile-input'
                    type="text"
                    value={bio}
                    placeholder='write your bio'
                    onChange={(e)=>setBio(e.target.value)}
                />
                <input className='update-profile-input'
                    type="password"
                    placeholder='write your password'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type='submit'
                    className='update-profile-btn'
                >
                    Update Profile
                </button>
            </form>
        </div>
    )
}

export default UpdateProfile
