import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";


function CreatePost() {
  const [text, setText] = useState("");
	const [img, setImg] = useState(null);

	const imgRef = useRef(null);

	const isPending = false;
	const isError = false;

	const data = {
		profileImg: "/avatars/boy1.png",
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Post created successfully");
	};

	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
  return (
  <div className='create-post'>
    <img src={data.profileImg || "/avatar-placeholder.png"} className='create-post__avatar' />

    <form className='create-post__form' onSubmit={handleSubmit}>
        <textarea
          className='create-post__form__textarea'
          placeholder='What is happening?!'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

      {img && (
        <div className='create-post__form__upload'>
          <IoCloseSharp
            className='create-post__form__upload__close-icon'
            onClick={() => {
              setImg(null);
              imgRef.current.value = null;
            }}
          />
          <img src={img} className='create-post__form__upload__image' />
        </div>
      )}

      <div className='create-post__form__data'>
        <div className='create-post__form__data__left'>
          <CiImageOn
            className='create-post__form__data__left__icon'
            onClick={() => imgRef.current.click()}
          />
          <BsEmojiSmileFill className='create-post__form__data__left__icon' />
        </div>
        <input type='file' hidden ref={imgRef} onChange={handleImgChange} />
        <button className='create-post__form__data__btn'>
          {isPending ? "Posting..." : "Post"}
        </button>
      </div>
      {isError && <div className='error'>Something went wrong</div>}
    </form>
  </div>
  )
}

export default CreatePost
