import React from "react"

const SocialButton = ({ link, id }) => {
    return (
        <a className="sb-social-network" href={link} target="_blank">
            <div className="sb-social-network-container"><img id={id} src={`/static/images/${id === 'root-me' ? `${id}.jpg` : `${id}.svg`}`} /></div>
        </a>
    )
}
export default SocialButton