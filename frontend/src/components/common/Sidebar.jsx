import React from 'react'
import { Link } from 'react-router-dom'
import XSvg from '../svgs/X'
import { MdHomeFilled } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { IoNotifications } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

function Sidebar() {
  const data = {
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy1.png",
	};
  return (
    <div className='sidebar'>
      <div className='sidebar__container'>
         <Link to="/" className='sidebar__container__logo link'>
            <XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
         </Link>
         <ul className='sidebar__container__list'>
           <li>
            <Link to="/" className='link'>
              <MdHomeFilled className='icon'/>
              <span>Home</span> 
            </Link>
           </li>
           <li>
            <Link to="/notifications" className='link'>
              <IoNotifications  className='icon' />
              <span>Notifications</span> 
            </Link>
           </li>
           <li>
            <Link to="/" className='link'>
              <FaUser className='icon' />
              <span>Profile</span> 
            </Link>
           </li>
         </ul>
         {data && (
					<Link
						to={`/profile/${data.username}`}
						className='sidebar__container__user-container link'
					>
						<div className='sidebar__container__user-container__avatar'>
								<img src={data?.profileImg || "/avatar-placeholder.png"} className='sidebar__container__user-container__avatar__profile-image' />
						</div>
						<div className='sidebar__container__user-container__info'>
							<div className='sidebar__container__user-container__info__text'>
								<p className=''>{data?.fullName}</p>
								<p className=''>@{data?.username}</p>
							</div>
							<BiLogOut className='icon' />
						</div>
					</Link>
				)}
      </div>
    </div>
  )
}

export default Sidebar
