import React, { useState,useEffect } from 'react'
import { useForm } from "react-hook-form"
import img from "../images/istockphoto-1252684502-612x612.jpg"
import { useNavigate,NavLink } from 'react-router-dom'
function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const [user, setuser] = useState({
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        password: ""
    })

    const fieldChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setuser({ ...user, [name]: value })
    }
    const submituser = async() => {
        const {email ,mobile } = user
        try {
            const res = await fetch("/blogapi/sendotp",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({
                    email ,mobile
                })   
            })
            const data = await res.json()
            //console.log(data)
            localStorage.setItem("OTP","otp");
            navigate("/verification",{state:{
                otp:data.s,user:user
            }})
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("blog") !== null) {
            navigate("/")
        }

    },[])
    return (
        <div>
            <div className='container bg-light'>
                <div className='row justify-content-center '>
                    <div className='col-12 col-md-6'>
                        <div className='text-center mt-5 '>
                            <img src={img} alt="" className='rounded' width="50%" /><br />
                        </div>
                        <form onSubmit={handleSubmit(submituser)}>
                            <div className='my-3'>
                                <label htmlFor="fname" className='form-label ms-2'>First Name:</label>
                                <input type="text" name="fname" id="fname" className='form-control' placeholder='Enter First Name' {...register("fname",{
                                    required:"*",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "*"
                                      },
                                })}onChange={fieldChange}/>
                                {errors.fname && (<span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.fname.message}</span>)}
                            </div>
                            <div className='my-3'>
                                <label htmlFor="lname" className='form-label ms-2'>Last Name:</label>
                                <input type="text" name="lname" id="lname" className='form-control' placeholder='Enter Last Name'{...register("lname",{
                                    required:"*",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "*"
                                      },
                                })} onChange={fieldChange}/>
                                {errors.lname && (<span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.lname.message}</span>)}
                                
                            </div>
                            <div className='my-3'>
                                <label htmlFor="mobile" className='form-label ms-2'>Mobile Number:</label>
                                <input type="text" name="mobile" id="mobile" className='form-control' placeholder='Enter Mobile Number'{...register("mobile",{
                                    required:"*",
                                    pattern: {
                                        value: /^(0|[1-9][0-9]*)$/,
                                        message: "*"
                                      },
                                      minLength:{
                                        value:10,
                                        message:"*"
                                      },
                                      maxLength:{
                                        value:10,
                                        message:"*"
                                      }
                                })} onChange={fieldChange}/>
                                {errors.mobile && (<span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.mobile.message}</span>)}
                            </div>
                            <div className='my-3'>
                                <label htmlFor="email" className='form-label ms-2'>Email:</label>
                                <input type="email" name="email" id="email" className='form-control' placeholder='Enter Email'{...register("email",{
                                    required:"*",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "*"
                                      },
                                })} onChange={fieldChange}/>
                                {errors.email && (<span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.email.message}</span>)}
                            </div>
                            <div className='my-3'>
                                <label htmlFor="password" className='form-label ms-2'>Password:</label>
                                <input type="password" name="password" id="password" className='form-control' placeholder='Enter Password'{...register("password",{
                                    required:"*",
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: "*"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "*"
                                    }
                                })} onChange={fieldChange}/>
                                {errors.password && (<span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.password.message}</span>)}
                            </div>

                            <div className='text-center mb-4'>
                                <button type="submit" className='btn btn-primary'>Register</button>
                            </div>
                        </form>
                        <div className='text-center'>
                            <NavLink to="/login">Alreay Registered</NavLink>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register