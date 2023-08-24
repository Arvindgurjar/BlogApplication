import React, { useEffect, useState } from 'react'
//import OtpInput from 'react-otp-input';
import "../App.css"
import { useLocation, useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs"
const Otpvarification = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [otp, setotp] = useState(new Array(6).fill(""));
    const [time, settime] = useState(150)
    const [submit, setsubmit] = useState(false)
    const [resent, setresent] = useState(false)
    //console.log(location.state)

    const handleChange = (ele, index) => {
        //console.log(ele+" "+index)
        if (isNaN(ele.target.value) || ele.target.value === " ")
            return false

        setotp([...otp.map((val, i) => {
            if (i === index) {
                return ele.target.value;
            }
            return val
        })])
        while (ele.target != null) {
            if (ele.target.value === "") {
                ele.target.focus();
                break;
            }
            if (ele.target.nextSibling && ele.target.nextSibling.value === "") {
                ele.target.nextSibling.focus();
                break;
            }
            ele.target = ele.target.nextSibling
        }

        //console.log(otp.join(""))
    }
   
    const submitdata = async () => {
        //console.log(otp.join("").toString()+" "+location.state.otp)
       //console.log(await bcrypt.compare(otp.join("").toString(),location.state.otp));
        if (await bcrypt.compare(otp.join("").toString(),location.state.otp)) {
            const { fname, lname, mobile, email, password } = location.state.user

            try {
                const res = await fetch("blogapi/userregister", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fname, lname, mobile, email, password
                    })

                })
                // console.log(res+" "+res.status)
                if (res.status === 201) {
                    alert("Register Successfull");
                    localStorage.removeItem("OTP");
                    navigate("/login",{replace:true})
                }

            } catch (error) {
                console.log(error)
            }


        } else {
            alert("Invalid Otp");
        }
    }
    const resendotp = async () => {

        const { email, mobile } = location.state.user
        try {
            const res = await fetch("/blogapi/sendotp", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email, mobile
                })
            })
            const data = await res.json()
            // console.log(data)
            
            settime(150)
            setresent(false);   
            location.state.otp = data;
            //console.log(location.state)         

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //console.log(time)
        if(time!==0){
        var timer = setInterval(() => {
            settime(time - 1);
        }, 1000)}
        if (time === 0) {
            clearInterval(timer)
            setresent(true)
        }
        if (otp.join("").length === 6) {
            setsubmit(true)
        } else {
            setsubmit(false)
        }
        return () => clearInterval(timer)

    })

    useEffect(() => {
        if (localStorage.getItem("OTP") === null) {
            navigate("/register",{replace:true})
        }
    },[])


    return (
        <div className='container1'>
            <div style={{ textAlign: "center" }}>
                <h1>OTP verification</h1>
                <p>Entet the code form the mail we sent to {location.state.user.email}</p><br />
                <p>{Math.floor(time / 60) <= 9 ? "0" + Math.floor(time / 60) : Math.floor(time / 60)}:{time % 60 <= 9 ? "0" + time % 60 : time % 60}</p>
                {otp.map((val, index) => {
                    return (
                        <input type="text" key={index} value={val} onChange={(e) => handleChange(e, index)} maxLength="1" onFocus={e => e.target.select()} autoFocus={index === 0 ? true : false} />
                    )
                })}
                <p style={{ marginTop: "10px" }}>Don't receive the otp?<button className='btn-primary' style={{ width: "60px", height: "18px", fontSize: "8px", border: "none", }} disabled={!resent} onClick={resendotp}>RESEND</button></p>
                <button className='btn btn-success mt-3' disabled={!submit} onClick={submitdata}>submit</button><br /><br />
                <button className='btn btn-primary' onClick={() => navigate(-1)}>Back</button>
            </div>

        </div>
    )
}

export default Otpvarification