import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import { useNavigate } from "react-router-dom"

function Home() {
    const [allblogs, setallblogs] = useState([])
    const navigate = useNavigate();
    const Myblog = async () => {
        if (localStorage.getItem("blog") === null) {
            navigate("/login")
        } else {
            const id = localStorage.getItem("blog").split("")
            id.shift();
            id.pop()
            const t = allblogs.filter((val) => {
                return (val.user_id === id.join(""))
            })
            setallblogs(t);

        }
    }
    const logout = async () => {
        //console.log("Logout")

        try {
            const res = await fetch("/blogapi/logout", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "appliocation/json"
                },
                credentials: "include"
            })
            //console.log(res)
            if (res.status === 200) {
                localStorage.removeItem("blog");
                // window.location.reload();
                navigate("/", { replace: true });
                allblog();
            } else {
                localStorage.removeItem("blog");
                navigate("/", { replace: true });
            }

        } catch (error) {
            localStorage.removeItem("blog");
            console.log(error)
        }



    }
    const allblog = async () => {
        try {
            const res = await fetch("/blogapi/listblog", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setallblogs(data)
            //console.log(data);

        } catch (error) {
            localStorage.removeItem("blog");
            console.log(error)
        }
    }
    const addblog = () => {

        if (localStorage.getItem("blog") === null) {
            navigate("/login")
        } else {
            navigate("/addblog");
        }
    }
    //console.log(allblogs);
    useEffect(() => {
        allblog();
    }, [])
    return (
        <div>
            <div className="navbar">
                <ul>
                    <li onClick={allblog}>All Blog</li>
                    <li onClick={Myblog}>My Blog</li>
                    {!localStorage.getItem("blog") ? <li onClick={() => navigate("/login")}>Login</li>
                        : <li onClick={logout}>Logout</li>}
                </ul>
            </div>
            <div className="blogbody">
                <div className="container-fluid">
                    <div className="row">
                        {
                            allblogs.map((val, index) => {
                                return (
                                    <div className='col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2 text-center my-3' style={{ cursor: "pointer" }} key={index} onClick={() => navigate("/blogdetail", { state: { val } })}>

                                        <Blog value={val} />
                                    </div>
                                )
                            })
                        }

                        <div className='addblog'>
                            <div onClick={addblog}>
                                <h2>+</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
