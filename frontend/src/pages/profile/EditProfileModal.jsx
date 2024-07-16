import { useState } from "react";

const EditProfileModal = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<button
				className='editButton'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='editContainer'>
				<div className='editContainer__updateData'>
					<h3 className='editContainer__updateData__header'>Update Profile</h3>
					<form
						className='editContainer__updateData__form'
						onSubmit={(e) => {
							e.preventDefault();
							alert("Profile updated successfully");
						}}
					>
						<div className='editContainer__updateData__form__inputContainer'>
							<input
								type='text'
								placeholder='Full Name'
								value={formData.fullName}
								name='fullName'
								onChange={handleInputChange}
							/>
							<input
								type='text'
								placeholder='Username'
								value={formData.username}
								name='username'
								onChange={handleInputChange}
							/>
						</div>
						<div className='editContainer__updateData__form__inputContainer'>
							<input
								type='email'
								placeholder='Email'
								value={formData.email}
								name='email'
								onChange={handleInputChange}
							/>
							<textarea
								placeholder='Bio'
								value={formData.bio}
								className="editContainer__updateData__form__inputContainer__textarea"
								name='bio'
								onChange={handleInputChange}
							/>
						</div>
						<div className='editContainer__updateData__form__inputContainer'>
							<input
								type='password'
								placeholder='Current Password'
								value={formData.currentPassword}
								name='currentPassword'
								onChange={handleInputChange}
							/>
							<input
								type='password'
								placeholder='New Password'
								value={formData.newPassword}
								name='newPassword'
								onChange={handleInputChange}
							/>
						</div>
						<input
							type='text'
							placeholder='Link'
							value={formData.link}
							name='link'
							onChange={handleInputChange}
						/>
						<button className='editContainer__updateData__form__btn'>Update</button>
					</form>
				</div>
				<form method='dialog' className='editContainer__closeBtn'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;