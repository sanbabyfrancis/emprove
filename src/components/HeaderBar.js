import React from "react"

function HeaderBar(props) {
    return (
        <nav className="navbar navbar-expand-lg py-3 navbar-dark bg-dark header-font-prop">
            <div className="container">
                <h1>
                    <a style={{textDecoration: 'none'}} className="text-white" href="/">EMPROVE</a>
                </h1>
                <p className="text-white" style={{textAlign: "right"}}>{props.email}</p>
            </div>
        </nav>
    )
}

export default HeaderBar