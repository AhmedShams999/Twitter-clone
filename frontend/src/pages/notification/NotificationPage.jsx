import React, { useState } from 'react'
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";


function NotificationPage() {
  const isLoading = false;
  const [showDropDown,setShowDropDown] = useState(false)
	const notifications = [
		{
			_id: "1",
			from: {
				_id: "1",
				username: "johndoe",
				profileImg: "/avatars/boy2.png",
			},
			type: "follow",
		},
		{
			_id: "2",
			from: {
				_id: "2",
				username: "janedoe",
				profileImg: "/avatars/girl1.png",
			},
			type: "like",
		},
	];

	const deleteNotifications = () => {
		alert("All notifications deleted");
	};

  return (
    <>
    <div className='notifications'>
      <div className='notifications__header'>
        <p>Notifications</p>
        <div className='notifications__header__dropdown'>
          <IoSettingsOutline className='notifications__header__dropdown__btn' onClick={()=>setShowDropDown(!showDropDown)} />
        {showDropDown&& <ul
            tabIndex={0}
            className='notifications__header__dropdown__content'
          >
            <li>
              <a onClick={deleteNotifications}>Delete all notifications</a>
            </li>
          </ul>}
        </div>
      </div>
      {isLoading && (
        <div className='notifications__loadingContainer'>
          <LoadingSpinner size='lg' />
        </div>
      )}
      {notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
      {notifications?.map((notification) => (
        <div className='notifications__notification' key={notification._id}>
          <div className='notifications__notification__container'>
            {notification.type === "follow" && <FaUser className='notifications__notification__container__followIcon' />}
            {notification.type === "like" && <FaHeart className='notifications__notification__container__likeIcon' />}
            <Link to={`/profile/${notification.from.username}`} className='link'>
             
              <img src={notification.from.profileImg || "/avatar-placeholder.png"} className='notifications__notification__container__avater' />
              
              <div className='notifications__notification__container__userInfo'>
                <span className='font-bold'>@{notification.from.username}</span>{" "}
                {notification.type === "follow" ? "followed you" : "liked your post"}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}

export default NotificationPage
