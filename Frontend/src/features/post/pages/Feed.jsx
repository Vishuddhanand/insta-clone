import React from 'react'
import "../style/feed.scss"

const Feed = () => {
    return (
        <main className="feed-page">
            <div className="feed">
                <div className="posts">
                    <div className="post">

                        <div className="user">
                            <div className="img-wrapper">

                                <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                            <p>username</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <div className="bottom">
                            <div className="caption">sample caption</div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Feed
