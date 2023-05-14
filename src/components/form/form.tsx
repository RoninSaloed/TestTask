import { FormProps } from "./form.props"
import './form.css';
import React, { useEffect, useState } from "react";
import { formData } from "../../Model/formData";
import axios, { Axios } from "axios";
import { Position } from "../../Model/position";
import { TokenResponse } from "../../Model/tokenResponse";

export const Form = ({ }: FormProps): JSX.Element => {
    const [successRequest, setSuccessRequest] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, postData: formData) => {
        event.preventDefault();
        const tokenResponse = await axios.get<TokenResponse>(
            "https://frontend-test-assignment-api.abz.agency/api/v1/token"
        );

        if (!tokenResponse.data.success) {
            console.error("Failed to get token");
            return;
        }
        const { token } = tokenResponse.data
        localStorage.setItem("token", token)

        try {
            const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
            const bodyPostData = new FormData();
            bodyPostData.append('email', postData.email);
            bodyPostData.append('name', postData.name);
            bodyPostData.append('phone', postData.phone);
            bodyPostData.append('position_id', String(postData.position_id));

            if (postData.photo) {
                bodyPostData.append('photo', postData.photo, postData.photo.name);
            }

            console.log(bodyPostData)
            const response = await axios.post(url, bodyPostData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Token": token,
                }
            })
            console.log(response)
        } catch (error) {
            console.error(error);
        }

    };
    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(response => {
                setPositions(response.data.positions);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const [positions, setPositions] = useState<Position[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<number | undefined>(undefined);
    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPosition(parseInt(event.target.value));
    }

    const [postData, setPostData] = useState<formData>({
        email: "",
        name: "",
        phone: "",
        photo: null,
        position_id: undefined
    })
    useEffect(() => {
        setPostData({ ...postData, position_id: selectedPosition })

    }, [selectedPosition])




    const [errorFormName, setErrorFormName] = useState<boolean>(false)
    const [errorFormEmail, setErrorFormEmail] = useState<boolean>(false)
    const [errorFormPhone, setErrorFormPhone] = useState<boolean>(false)
    const [errorFormFile, setErrorFormFile] = useState<boolean>(false)


    const [errorName, setErrorName] = useState<string>("")
    const [errorEmail, setErrorEmail] = useState<string>("")
    const [errorPhone, setErrorPhone] = useState<string>("")
    const [errorFile, setErrorFile] = useState<string>("")


    const [labelNameActive, setLabelNameActive] = useState(false);
    const [labelEmailActive, setLabelEmailActive] = useState(false);
    const [labelPhoneActive, setLabelPhoneActive] = useState(false);
    const handleInputChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPostData({ ...postData, [name]: value });
        setLabelNameActive(event.target.value !== '');
        if (value.length < 2) {
            setErrorName("The name cannot be shorter than two characters")
            setErrorFormName(true)
        }
        else if (value.length > 60) {
            setErrorName("The name cannot be longer than 60 characters")
            setErrorFormName(true)
        }
        else {
            setErrorFormName(false)
        }

    };
    const handleInputChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPostData({ ...postData, [name]: value });
        setLabelEmailActive(event.target.value !== '');
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        re.test(String(value).toLowerCase()) ? setErrorEmail("") : setErrorEmail("The email format is not valid")
        if (errorEmail == "") {
            setErrorFormEmail(false)
        } else {
            setErrorFormEmail(true)

        }
    };
    const handleInputChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPostData({ ...postData, [name]: value });
        setLabelPhoneActive(event.target.value !== '');
        const re = /^\+380\d{3}\d{2}\d{2}\d{2}$/
        console.log(value)
        re.test(String(value).toLowerCase()) ? setErrorPhone("") : setErrorPhone("The phone format is not valid")
        if (errorPhone == "") {
            setErrorFormPhone(false)
        } else {
            setErrorFormPhone(true)
        }
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file) {
                if (!file.type.includes('image/jpeg')) {
                    setErrorFile('The selected file is not a JPEG image');
                    setErrorFormFile(true)
                }

                else if (file.size > 5 * 1024 * 1024) {
                    setErrorFile('The file size exceeds 5 MB');
                    setErrorFormFile(true)
                }
                else if (!file) {
                    setErrorFile("You have not selected a file")
                    setErrorFormFile(true)
                }
                else {
                    setErrorFormFile(false)
                }
                setPostData({ ...postData, photo: file });
            }
        }
    }
    useState(() => {
        if (localStorage.token) {
            setSuccessRequest(true)
        }
    })
    return (
        <div className='container' id="form">
            <div className="formTitle">Working with POST request</div>
            <form className="formSubmit" onSubmit={(event) => handleSubmit(event, postData)}>

                {successRequest == true ? <div className="success">
                    <div className="successTitle">User successfully registered</div>
                    <div className="successImage"></div>
                </div> : <div className="fromBody" >
                    <div className={errorFormName == false ? "formItem" : "formItem error"}>
                        <label className={labelNameActive ? "labelActive" : ""}>
                            <span>Your name</span>
                            <input className={errorFormName == false ? "formInput" : "formInputError errorInput"}
                                type="text" name="name" onChange={handleInputChangeName} >
                            </input>
                            {errorFormName == true ? <div className="formNameError">{errorName}</div> : <div></div>}
                        </label>
                    </div>
                    <div className={errorFormEmail == false ? "formItem" : "formItem error"}>
                        <label className={labelEmailActive ? "labelActive" : ""}>
                            <span>Email</span>
                            <input className={errorFormEmail == false ? "formInput" : "formInputError errorInput"} type="email" name="email" onChange={handleInputChangeEmail}
                            ></input>
                            {errorFormEmail == true ? <div className="formNameError">{errorEmail}</div> : <div></div>}

                        </label>
                    </div>
                    <div className={errorFormPhone == false ? "formItem" : "formItem error"}>
                        <label className={labelPhoneActive ? "labelActive" : ""}>
                            <span>Phone</span>
                            <input className={errorFormPhone == false ? "formInputLast" : "formInputError errorInputLast"}
                                type="string" name="phone" onChange={handleInputChangePhone} >
                            </input>
                            {errorFormPhone == true ? <div className="formPhoneError">{errorPhone}</div> : <div></div>}
                        </label>
                    </div>
                    <div className="formPhone">+38 (XXX) XXX - XX - XX</div>
                    <div>
                        <div className="formSubtitle">Select your position</div>
                        {positions.map((position: {
                            id: number,
                            name: string
                        }) => (
                            <div className="formRadio" key={position.id}>
                                <input
                                    required
                                    className="radio"
                                    type="radio"
                                    id={`position-${position.id}`}
                                    value={position.id}
                                    name="position"
                                    checked={selectedPosition === position.id}
                                    onChange={handlePositionChange}
                                />
                                <label className="radioLabel" htmlFor={`position-${position.id}`}>{position.name}</label>
                            </div>
                        ))}
                        <div className="fileBody">
                            <input className="formFile" onChange={handlePhotoChange} id="file" type="file" name="photo" accept=".image/*,.jpeg,.jpg" />
                            <label className="fileLabel" htmlFor="file">Upload</label>
                            <label htmlFor="file" className="fileInput">{!postData.photo ? "Upload your photo" : postData.photo.name}</label>
                            {errorFormFile == true ? <div className="formFileError">{errorFile}</div> : <div></div>}
                        </div>
                    </div>
                    <div className="buttonBody">
                        <button className="formButton" type="submit">Log in</button>
                    </div>
                </div>}
            </form>


        </div>
    )
}
export default Form