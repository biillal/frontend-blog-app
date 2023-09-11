import React, { useEffect, useState } from 'react'
import './profile.css';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import UpdateProfile from './UpdateProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getProfile, uploadPhoto } from '../../redux/apiCall.js/profileApiCall';
import PostItems from '../../components/posts/PostItems';
import {Oval} from "react-loader-spinner";
import { logoutUser } from '../../redux/apiCall.js/authApiCall';
function Profile() {
    const [file, setfile] = useState(null);
    const [update, setUpdate] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()
    const { profileUser, loading,isProfileDeleted } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);
    // form file submit handler
    const formFileSubmitHandler = (e) => {
        e.preventDefault();
        if (!file) return toast.error("file is empty");
        const formData = new FormData();
        formData.append("image", file);
        dispatch(uploadPhoto(formData))
    }
    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isOk) => {
                if (isOk) {
                    dispatch(deleteProfile(user?._id))
                    dispatch(logoutUser())
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    if (loading) {
        <Oval
            height={120}
            width={120}
            color="#000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="gray"
            strokeWidth={3}
            strokeWidthSecondary={3}

        />
    }
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getProfile(id))
    }, [dispatch]);
    useEffect(()=>{
        if(isProfileDeleted){
            navigate('/')
        }
    },[navigate,isProfileDeleted])
    return (
        <section className='profile'>
            <div className='profile-header'>
                <div className='profile-image'>
                    <img src={file ? URL.createObjectURL(file) : profileUser?.profilePhoto?.url} alt="" className='img-prof' />
                    {
                        user?._id === profileUser?._id && (
                            <form className='update-image-profile' onSubmit={formFileSubmitHandler}>
                                <abbr title="update image">
                                    <label htmlFor='file' className='update-img-profile'>
                                        <i class="bi bi-camera-fill"></i>
                                    </label>
                                </abbr>
                                <input type="file"
                                    style={{ display: "none" }}
                                    name="file" id='file'
                                    onChange={(e) => setfile(e.target.files[0])}
                                />
                                <button type="submit" className='sub-update-img'>
                                    upload
                                </button>
                            </form>
                        )
                    }

                </div>
                <h3 className='username-profile'>{profileUser?.username}</h3>
                <div className='bio-profile'>
                    {profileUser?.bio}
                </div>
                <div className='date-profile'>
                    <span>Date joined : </span>  {new Date(profileUser?.createdAt).toDateString()}
                </div>
                {
                    user?._id === profileUser?.id && (
                        <button className='btn-update-profule' onClick={() => setUpdate(true)}>
                            <i class="bi bi-person-badge-fill"></i>
                            Update profile
                        </button>
                    )
                }

            </div>
            <h3 className='title-post-profile'>{profileUser?.username} Posts</h3>
            <span className='border-title'></span>
            <div className='posts-profile'>

                {
                    profileUser?.posts?.map(post =>
                        <PostItems
                            key={post._id}
                            posts={post}
                            username={profileUser?.username}
                            userId={profileUser?._id}
                        />
                    )
                }

            </div>

            <div>
                <button type="submit"
                    className='delete-account'
                    onClick={deleteAccountHandler}
                >
                    Delete You Account
                </button>
            </div>
            {update && <UpdateProfile profile={profileUser} setUpdate={setUpdate} />}
        </section >
    )
}

export default Profile
