import { useState } from "react";
import "./AddUserModal.css";

const AddUserModal = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const initialForm = {
        username:"",
        email:"",
        phone:"",
        avatar:null,
        birthday:"",
        gender:""
    };
    const [formData,setFormData] = useState(initialForm);
    const handleChange = (e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        });

    };
    const handlePhoneChange = (e)=>{
        const value = e.target.value.replace(/\D/g,"");
        setFormData({
            ...formData,
            phone:value
        });

    };
    const handleAvatarChange=(e)=>{

        setFormData({
            ...formData,
            avatar:e.target.files[0]
        });

    };
    const validateForm = ()=>{
        const emailRegex =
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!emailRegex.test(formData.email)){
            alert("Email must be a valid Gmail address");
            return false;
        }
        const phoneRegex =
        /^0[0-9]{9}$/;

        if(!phoneRegex.test(formData.phone)){

            alert(
              "Phone number must start with 0 and contain exactly 10 digits"
            );
            return false;
        }
        return true;
    };
    const handleSubmit=(e)=>{

        e.preventDefault();

        if(
            !formData.username ||
            !formData.email ||
            !formData.phone ||
            !formData.birthday ||
            !formData.gender
        ){

            alert("Please fill all required fields");

            return;

        }

        if(!validateForm()){
            return;
        }
        onSubmit(formData);
        setFormData(initialForm);

    };
    const handleClose = ()=>{
        setFormData(initialForm);
        onClose();
    };
    if(!isOpen)
        return null;

    return (
        <div className="modalOverlay">
            <div className="addUserModal">
                <h2>
                    Add New User
                </h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username *
                    </label>
                    <input
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label>
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label>
                        Phone *
                    </label>

                    <input
                        type="text"
                        name="phone"
                        placeholder="0987654321"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                    />
                    <label>
                        Avatar
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                    <label>
                        Date of birth *
                    </label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                    />
                    <label>
                        Gender *
                    </label>
                    <div className="genderGroup">
                        <label>

                            <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={
                                    formData.gender==="MALE"
                                }
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>

                            <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={
                                    formData.gender==="FEMALE"
                                }
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                    <div className="modalActions">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="cancelBtn"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="saveBtn"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddUserModal;