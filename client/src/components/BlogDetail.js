import React from 'react'
import { useLocation } from 'react-router-dom'

const BlogDetail = () => {
    const location = useLocation();
  return (
    <div>
        {location.state.val.title}
    </div>
  )
}

export default BlogDetail