import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom'

function ForgetPass() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const params = useParams();
    
    const [user, setuser] = useState({
        password1: "",
        password: "",
    })

    const fieldChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setuser({ ...user, [name]: value })
    }
    const submituser = async() => {
        const password = user.password
        //console.log(params.id)
        if(user.password===user.password1)
        {
            const res = await fetch(`/blogapi/forgetpass/${params.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password
                })
            })
            //console.log(res)
            if(res.status===201){
                alert("Password Updated Successfully");
                navigate("/login",{replace:true})
            }else{
                alert("Inavlid Credentials")
            }
            
        }else{
            alert("password Not Matched")
        }
    }
    return (
        <div>
            <div className='container bg-light'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-12 col-md-6'>
                        
                        <form onSubmit={handleSubmit(submituser)}>
                            <div className='my-3'>
                                <label htmlFor="password1" className='form-label ms-2'>New Password:</label>
                                <input type="password" name="password1" id="password1" className='form-control' placeholder='Enter Password'{...register("password1", {
                                    required: "*",
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: "*"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "*"
                                    }
                                })} onChange={fieldChange} />
                                {errors.password1 && (<span style={{ float: 'right', marginTop: "-30px", marginRight: "20px", color: "red", fontWeight: "bold" }}>{errors.password1.message}</span>)}
                            </div>
                            <div className='my-3'>
                                <label htmlFor="password" className='form-label ms-2'>Re-Enter New Password:</label>
                                <input type="password" name="password" id="password" className='form-control' placeholder='Re-Enter Password'{...register("password", {
                                    required: "*",
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: "*"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "*"
                                    }
                                })} onChange={fieldChange} />
                                {errors.password && (<span style={{ float: 'right', marginTop: "-30px", marginRight: "20px", color: "red", fontWeight: "bold" }}>{errors.password.message}</span>)}
                            </div>

                            <div className='text-center mb-4'>
                                <button type="submit" className='btn btn-primary'>Change Password</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPass