import React from "react"

const SocialButton = ({ link, id }) => {
    return (
        <a class="sb-social-network" href={link} target="_blank">
            <div class="sb-social-network-container"><img id={id} src={`/static/images/${id}.svg`} /></div>
        </a>
    )
}
export default SocialButton