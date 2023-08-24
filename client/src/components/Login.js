import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
//import img from "../images/blog-g039eb6483_1920.jpg"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm()

    const [user, setuser] = useState({
        email: "",
        password: "",
    })

    const fieldChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setuser({ ...user, [name]: value })
    }
    const submituser = async () => {
        //console.log(user)
        try {
            const { email, password } = user

            const res = await fetch("/blogapi/userlogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            //console.log(res)
            const token = await res.json();
            //console.log(token)
            if (res.status === 200) {
                localStorage.setItem("blog",JSON.stringify(token));
                navigate("/", { replace: true });
            } else {
                alert("Invalid credentials");
            }

        } catch (error) {
            alert("Invalid credentials");
            console.log(error)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("blog") !== null) {
            navigate("/")
        }

    }, [])
    return (
        <div>
            <div className='container bg-light'>
                <div className='row justify-content-center '>
                    <div className='col-12 col-md-6'>
                        <div className='text-center mt-5 '>
                            <img src={require(`../images/blog-g039eb6483_1920.jpg`)} alt="" className='rounded' width="50%" /><br />
                        </div>
                        <form onSubmit={handleSubmit(submituser)}>
                            <div className='my-3'>
                                <label htmlFor="email" className='form-label ms-2'>Email:</label>
                                <input type="email" name="email" id="email" autoComplete='false' className='form-control' placeholder='Enter Email'{...register("email", {
                                    required: "*",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "*"
                                    },
                                })} onChange={fieldChange} />
                                {errors.email && (<span style={{ float: 'right', marginTop: "-30px", marginRight: "20px", color: "red", fontWeight: "bold" }}>{errors.email.message}</span>)}
                            </div>
                            <div className='my-3'>
                                <label htmlFor="password" className='form-label ms-2'>Password:</label>
                                <input type="password" name="password" id="password" className='form-control' placeholder='Enter Password'{...register("password", {
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
                                <button type="submit" className='btn btn-primary'>Login</button><br />
                                <NavLink to="/sendlink">Forget password ?</NavLink><br />

                            </div>
                        </form>
                        <div className='text-center'>
                            <NavLink to="/register">Register</NavLink>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login