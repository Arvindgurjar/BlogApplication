import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const Addblog = () => {
    const navigate = useNavigate()
    const {register,handleSubmit,formState: { errors }} = useForm()
    const [blogData,setBlogData]  = useState({
        title:"",
        image:null,
        description:""
    })
    const fieldChange = (e)=>{
        let name = e.target.name
        let value = e.target.value

        setBlogData({...blogData,[name]:value})
       // console.log(blogData)
    }
    const imageChange = (e)=>{
            setBlogData({...blogData,image:e.target.files[0]})
    }
    const submitData = async()=>{
       // console.log(blogData)
            const {title,description} = blogData
        try {
            const data = new FormData();
            data.append("title",title);
            data.append("picture",blogData.image)
            data.append("description",description);
            const res = await fetch("blogapi/postblog",{
                method:"POST",
                
                body:data
            })
            if(res.status===201){
                alert("Blog Added Successfully");
                navigate("/",{replace:true})
            }
            
        } catch (error) {
            localStorage.removeItem("blog");
            navigate("/",{replace:true});
            console.log(error )
        }
    }
    return (
        <div className='container bg-light'>
            <div className="row justify-content-center">
                <div className="col-12 col-md-7">
                    <form onSubmit={handleSubmit(submitData)} encType="multipart/form-data" >
                        <div className='my-2'>
                            <label htmlFor="title" className="form-label ms-3" style={{fontWeight:"bold"}}>Title</label>
                            <textarea className='form-control' name="title" id="title" cols="30" rows="6" placeholder='Enter Title of blog' value={blogData.title}  {...register("title",{
                                required:"*",
                                minLength:{
                                    value:20,
                                    message:"*"
                                }
                            })} onChange={fieldChange}></textarea>
                            {errors.title && <span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.title.message}</span>}
                        </div>
                        <div className='my-2'>
                            <label htmlFor="image" className="form-label ms-3"  style={{fontWeight:"bold"}}>Image</label>
                            <input type="file" className='form-control' id='image' name='uploaded_file' accept='image/*' {...register("uploaded_file",{
                                required:"*"
                            })} onChange={imageChange}/>
                            {errors.image && <span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.image.message}</span>}
                        </div>
                        <div className='my-3'>
                            <label htmlFor="description" className="form-label ms-3"  style={{fontWeight:"bold"}}>Description</label>
                            <textarea className='form-control' name="description" id="description" cols="30" rows="10" placeholder='Enter description about blog' value={blogData.description} {...register("description",{
                                required:"*",
                                minLength:{
                                    value:200,
                                    message:"*"
                                }
                            })} onChange={fieldChange}></textarea>
                            {errors.description && <span style={{float:'right',marginTop:"-30px",marginRight:"20px",color:"red",fontWeight:"bold"}}>{errors.description.message}</span>}
                        </div>
                        <div className='m-3 text-center'>
                            <button type='submit' className=" btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addblog