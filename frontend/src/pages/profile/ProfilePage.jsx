import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const isLoading = false;
	const isMyProfile = true;

	const user = {
		_id: "1",
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy2.png",
		coverImg: "/cover.png",
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		link: "https://youtube.com/@asaprogrammer_",
		following: ["1", "2", "3"],
		followers: ["1", "2", "3"],
	};

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

	return (
		<>
			<div className='profilePage'>
				{/* HEADER */}
				{isLoading && <ProfileHeaderSkeleton />}
				{!isLoading && !user && <p className='text-center text-lg mt-4'>User not found</p>}
				<div className='profilePage__container'>
					{!isLoading && user && (
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
									<span className='font-bold text-lg'>{user?.fullName}</span>
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
										<span>Joined July 2021</span>
									</div>
								</div>
								<div className='profilePage__container__userInfo__thirdPart'>
									<div className='profilePage__container__userInfo__thirdPart__followersAndFollowing'>
										<span>{user?.following.length}</span>
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

					<Posts />
				</div>
			</div>
		</>
	);
};
export default ProfilePage;