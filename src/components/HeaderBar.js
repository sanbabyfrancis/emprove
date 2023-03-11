import React from "react"

function HeaderBar(props) {
    return (
        <nav className="navbar navbar-expand-lg py-3 navbar-dark bg-dark header-font-prop">
            <div className="container">
                <h1>
                    <a style={{ textDecoration: 'none' }} className="text-white" href="/">EMPROVE</a>
                </h1>
                <ul className="nav-links" style={{ display: "flex", listStyleType: "none" }}>
                    <li><p className="text-white">{props.email} &nbsp;&nbsp;</p></li>
                    <li><a style={{ textDecoration: 'none' }} className="text-white" href="#">| Productivity report &nbsp;&nbsp;</a></li>
                    <li><a style={{ textDecoration: 'none' }} className="text-white" href="/">| Sign out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderBar