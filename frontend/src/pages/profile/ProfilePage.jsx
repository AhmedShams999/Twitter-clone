import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";

const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const {data:authUser} = useQuery({queryKey:["authUser"]})

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const {username} = useParams()



	


  const {data:user,isLoading,refetch,isRefetching} = useQuery({
		queryKey: ["userProfile"],
		queryFn: async()=>{
			try {
				const res = await fetch(`/api/users/profie/${username}`)

				const data = await res.json()

				if(!res.ok) throw new Error(data.error || "Something went wrong!")

				return data
			} catch (error) {
				throw new Error(error)
			}
		}
	})

	const joinedSinceDate = formatMemberSinceDate(user?.createdAt)
	const isMyProfile = authUser?._id == user?._id;

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImg" && setCoverImg(reader.result);
				state === "profileImg" && setProfileImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(()=>{
		refetch()
	},[username,refetch])

	return (
		<>
			<div className='profilePage'>
				{/* HEADER */}
				{(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
				{!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
				<div className='profilePage__container'>
					{!isLoading && !isRefetching && user && (
						<>
							<div className='profilePage__container__header'>
								<Link to='/' className="link">
									<FaArrowLeft className='w-4 h-4' />
								</Link>
								<div className='profilePage__container__header__info'>
									<p className='font-bold text-lg'>{user?.fullName}</p>
									<span className='text-sm text-slate-500'>{POSTS?.length} posts</span>
								</div>
							</div>
							{/* COVER IMG */}
							<div className='profilePage__container__cover'>
								<img
									src={coverImg || user?.coverImg || "/cover.png"}
									className='profilePage__container__cover__coverImage'
									alt='cover image'
								/>
								{isMyProfile && (
									<div
										className='profilePage__container__cover__editIcon'
										onClick={() => coverImgRef.current.click()}
									>
										<MdEdit className='w-5 h-5 text-white' />
									</div>
								)}

								<input
									type='file'
									hidden
									ref={coverImgRef}
									onChange={(e) => handleImgChange(e, "coverImg")}
								/>
								<input
									type='file'
									hidden
									ref={profileImgRef}
									onChange={(e) => handleImgChange(e, "profileImg")}
								/>
								{/* USER AVATAR */}
								<div className='profilePage__container__cover__userImage'>
										
										<img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
										
										<div className='profilePage__container__cover__userImage__editIcon'>
											{isMyProfile && (
												<MdEdit
													className='w-4 h-4 text-white'
													onClick={() => profileImgRef.current.click()}
												/>
											)}
										</div>
								</div>
							</div>
							
							<div className='profilePage__container__showBtns'>
								{isMyProfile && <EditProfileModal />}
								{!isMyProfile && (
									<button
										className='profilePage__container__showBtns__followBtn'
										onClick={() => alert("Followed successfully")}
									>
										Follow
									</button>
								)}
								{(coverImg || profileImg) && (
									<button
										className='profilePage__container__showBtns__updateBtn'
										onClick={() => alert("Profile updated successfully")}
									>
										Update
									</button>
								)}
							</div>

							<div className='profilePage__container__userInfo'>
								<div className='profilePage__container__userInfo__firstPart'>
									<span className='font-bold text-lg'>{user?.fullname}</span>
									<span className='text-sm text-slate-500'>@{user?.username}</span>
									<span className='text-sm my-1'>{user?.bio}</span>
								</div>

								<div className='profilePage__container__userInfo__seconedPart'>
									{user?.link && (
										<div className='profilePage__container__userInfo__seconedPart__userLink'>
											<>
												<FaLink className='profilePage__container__userInfo__seconedPart__userLink__icon' />
												<a
													href='https://youtube.com/@asaprogrammer_'
													target='_blank'
													rel='noreferrer'
													className="link"
												>
													youtube.com/@asaprogrammer_
												</a>
											</>
										</div>
									)}
									<div className='profilePage__container__userInfo__seconedPart__userJoinDate'>
										<IoCalendarOutline className='profilePage__container__userInfo__seconedPart__userJoinDate__icon' />
										<span>{joinedSinceDate}</span>
									</div>
								</div>
								<div className='profilePage__container__userInfo__thirdPart'>
									<div className='profilePage__container__userInfo__thirdPart__followersAndFollowing'>
										<span>{user?.followeing.length}</span>
										<span>Following</span>
									</div>
									<div className='profilePage__container__userInfo__thirdPart__followersAndFollowing'>
										<span>{user?.followers.length}</span>
										<span>Followers</span>
									</div>
								</div>
							</div>
							<div className='profilePage__container__showPostOrLikes'>
								<div
									className={`profilePage__container__showPostOrLikes__btn ${feedType == "posts"? "active":""}`}
									onClick={() => setFeedType("posts")}
								>
									Posts
									{feedType === "posts" && (
										<div className='profilePage__container__showPostOrLikes__btn__line' />
									)}
								</div>
								<div
									className={`profilePage__container__showPostOrLikes__btn ${feedType == "likes"? "active":""}`}
									onClick={() => setFeedType("likes")}
								>
									Likes
									{feedType === "likes" && (
										<div className='profilePage__container__showPostOrLikes__btn__line' />
									)}
								</div>
							</div>
						</>
					)}

					<Posts feedType={feedType} username={username} userId={user?._id}/>
				</div>
			</div>
		</>
	);
};
export default ProfilePage;