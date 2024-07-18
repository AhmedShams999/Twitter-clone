import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import LoadingSpinner from "../common/LoadingSpinner.jsx"

const Post = ({ post }) => {
	const [comment, setComment] = useState("");
	const {data:authUser} = useQuery({queryKey:["authUser"]})
	const queryClient = useQueryClient()

	const {mutate:deletePost,isPending} = useMutation({
		mutationFn: async()=>{
			try {
				const res = await fetch(`api/posts/${post._id}`,{
					method: "DELETE"
				})
				const data = await res.json()

				if(!res.ok) throw new Error (data.error || "Something went wrong!")
				return data;
			} catch (error) {
				throw new Error(error)
			}
		},
		onSuccess: ()=>{
			toast.success("Post deleted successfully")
			queryClient.invalidateQueries({queryKey: ["posts"]})
		}
	})

	const postOwner = post.user;
	const isLiked = false;

	const isMyPost = authUser._id === postOwner._id;

	const formattedDate = "1h";

	const isCommenting = false;

	const handleDeletePost = () => {
		deletePost()
	};

	const handlePostComment = (e) => {
		e.preventDefault();
	};

	const handleLikePost = () => {};

	return (
		<>
			<div className='post'>
				<Link to={`/profile/${postOwner.username}`} className='post__avatar link'>
						<img src={postOwner.profileImg || "/avatar-placeholder.png"} />
					</Link>

				<div className='post__content'>
					<div className='post__content__userInfo'>
						<Link to={`/profile/${postOwner.username}`} className='post__content__userInfo__fullName link'>
							{postOwner.fullname}
						</Link>
						<span className='post__content__userInfo__userName'>
							<Link className="link" to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
							<span>·</span>
							<span>{formattedDate}</span>
						</span>
						{isMyPost && (
							<span className='post__content__userInfo__trashIcon'>
								{!isPending &&(
									<FaTrash onClick={handleDeletePost} className="post__content__userInfo__trashIcon__icon"/>
								)
								}
								{isPending && (
									<LoadingSpinner  size={"sm"}/>
								)}
							</span>
						)}
					</div>
					<div className='post__content__postImage'>
						<span>{post.text}</span>
						{post.img && (
							<img
								src={post.img}
								className='h-80 object-contain rounded-lg border border-gray-700'
								alt=''
							/>
						)}
					</div>
					<div className='post__content__postInfo'>
						<div className='post__content__postInfo__firstPart'>
							<div
								className='post__content__postInfo__firstPart__comments'
								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
							>
								<FaRegComment className='post__content__postInfo__firstPart__comments__icon' />
								<span className='text-sm text-slate-500 group-hover:text-sky-400'>
									{post.comments.length}
								</span>
							</div>
							{/* We're using Modal Component from DaisyUI */}
							<dialog id={`comments_modal${post._id}`} className='post__content__postInfo__firstPart__showComments'>
								<div className='post__content__postInfo__firstPart__showComments__section'>
									<h3 className='post__content__postInfo__firstPart__showComments__section__header'>COMMENTS</h3>
									<div className='post__content__postInfo__firstPart__showComments__section__allComments'>
										{post.comments.length === 0 && (
											<p className='post__content__postInfo__firstPart__showComments__section__allComments__noComments'>
												No comments yet 🤔 Be the first one 😉
											</p>
										)}
										{post.comments.map((comment) => (
											<div key={comment._id} className='post__content__postInfo__firstPart__showComments__section__allComments__comment'>	
												<img
													src={comment.user.profileImg || "/avatar-placeholder.png"} className="post__content__postInfo__firstPart__showComments__section__allComments__comment__avatar"
													/>
											
												<div className='post__content__postInfo__firstPart__showComments__section__allComments__comment__userInfo'>
													<div className='post__content__postInfo__firstPart__showComments__section__allComments__comment__userInfo__first'>
														<span className='font-bold'>{comment.user.fullName}</span>
														<span className='text-gray-700 text-sm'>
															@{comment.user.username}
														</span>
													</div>
													<div className='post__content__postInfo__firstPart__showComments__section__allComments__comment__userInfo__seconed'>{comment.text}</div>
												</div>
											</div>
										))}
									</div>
									<form
										className='post__content__postInfo__firstPart__showComments__section__addComment'
										onSubmit={handlePostComment}
									>
										<textarea
											className=''
											placeholder='Add a comment...'
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										/>
										<button className='post__content__postInfo__firstPart__showComments__section__addComment__btn'>
											{isCommenting ? (
												<span className='loader'></span>
											) : (
												"Post"
											)}
										</button>
									</form>
								</div>
								<form method='dialog' className='post__content__postInfo__firstPart__showComments__btn'>
									<button className='outline-none'>close</button>
								</form>
							</dialog>
							<div className='post__content__postInfo__firstPart__replys'>
								<BiRepost className='post__content__postInfo__firstPart__replys__icon' />
								<span className=''>0</span>
							</div>
							<div className='post__content__postInfo__firstPart__likes' onClick={handleLikePost}>
								{!isLiked && (
									<FaRegHeart className='post__content__postInfo__firstPart__likes__icon' />
								)}
								{isLiked && <FaRegHeart className='post__content__postInfo__firstPart__likes__icon active' />}

								<span
									className={`post__content__postInfo__firstPart__likes ${
										isLiked ? "isLiked" : ""
									}`}
								>
									{post.likes.length}
								</span>
							</div>
						</div>
						<div className='post__content__postInfo__seconedPart'>
							<FaRegBookmark className='post__content__postInfo__seconedPart__icon' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Post;