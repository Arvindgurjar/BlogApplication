import React from 'react'

const Blog = (props) => {
    return (
        <>
            <div style={{border:"2px solid black",borderRadius:"2%",boxShadow:"10px",padding:"10px"}}>
            <div className="title my-2">
                {props.value.title}
            </div>
            <div className="image my-2" style={{objectFit:"cover"}}>
                <img src={require(`../images/${props.value.picture}`)} alt="" width="100%" height="200px" />
            </div>
            <div className="desc">
                {props.value.description}
            </div>
            </div>
        </>
    )
}

export default Blog