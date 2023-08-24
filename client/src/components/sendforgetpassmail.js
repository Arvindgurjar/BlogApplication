import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import img from "../images/istockphoto-1252684502-612x612.jpg"
import { useNavigate } from 'react-router-dom'
function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const [email, setemail] = useState()

    const fieldChange = (e) => {
      let value = e.target.value

        setemail(value);
    }
    const submituser = async() => {
        
        try {
            const res = await fetch("/blogapi/sendlink",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({
                    email
                })   
            })
           if(res.status===200){
            alert("Link Send Successfully");
            navigate("/login",{replace:true});
           }else{
            alert("Invalid Credentials")
           }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='container bg-light'>
                <div className='row justify-content-center '>
                    <div className='col-12 col-md-6'>
                        
                        <form onSubmit={handleSubmit(submituser)}>
                           
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
                            

                            <div className='text-center mb-4'>
                                <button type="submit" className='btn btn-primary'>Send Link</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register