import React, { useState } from 'react'
import RingLoader from "react-spinners/RingLoader"

const Loader = () => {

    let [loading, setLoading] = useState(true);
    return (
        <div clasName="loading" style={{ marginTop: "150px" }}>
            <div className="sweet-loading text-center ">
                <RingLoader color="#000" loading={loading} css='' size={80} />
            </div>
        </div>
    )
}

export default Loader
