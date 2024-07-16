const PostSkeleton = () => {
	return (
    <div class="skeleton-post">
      <div className="skeleton-post__container">
       <div class="skeleton-post__container__avatar"></div>
			 <div>
       	<div class="skeleton-post__container__line"></div>
       	<div class="skeleton-post__container__line"></div>
			 </div>
      </div>
      <div class="skeleton-post__btn"></div>
    </div>

	);
};
export default PostSkeleton;