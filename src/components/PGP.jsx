import React, { useState, useRef } from "react"
import { Manager, Reference, Popper } from 'react-popper';

const PGPPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEXeVf2RYJKwYBBAHaRw8BAQdAd0Ugx/eUD0U5UZElJW0+U7PdRfWs5jOoSjN8
X0HNBLW0IVNhbXVlbCA8c2FtdWVsYmVuYWlzQG91dGxvb2suY29tPoiWBBMWCAA+
FiEEZcu+gkXcxfcOMOvkkyLs0YhAfh8FAl3lX9kCGwMFCQlmAYAFCwkIBwIGFQoJ
CAsCBBYCAwECHgECF4AACgkQkyLs0YhAfh8x9wEAwChm9nbKZm6k8LiC1/HNzt4G
i64Sv1KR1ixhif2A3h8BAJD5g7GZ0qlWb017DfjLeHBzav9YFKzvsgLqpNxtzA4A
uDgEXeVf2RIKKwYBBAGXVQEFAQEHQG4MgDm5FcOvyc5XPePXuujpGXgDxf58vHWp
nHZpQ6FSAwEIB4h+BBgWCAAmFiEEZcu+gkXcxfcOMOvkkyLs0YhAfh8FAl3lX9kC
GwwFCQlmAYAACgkQkyLs0YhAfh9JxwEA8z2bW9kNk3zP1+ChTaJodxIXsuu2BXQD
1OwbuRuyri8BAPH1/8LI2B4L6Nbk+FhCTt0YCyeXU83NrzOE2snQNewB
=Sr+7
-----END PGP PUBLIC KEY BLOCK-----`

const PGP = ({ }) => {
    const [hover, setHover] = useState(false)
    const PGPKeyRef = useRef(null)

    const handleClick = () => {
        setHover(true)
        setTimeout(() => setHover(false), 1500)
        PGPKeyRef.current.select()
        document.execCommand("copy")
    }

    return (
        <div>
            <textarea ref={PGPKeyRef} id="sb-pgp-hidden-key" value={PGPPublicKey} />
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <div>
                            <div id="sb-email">samuelbenais@outlook.com</div>
                            <div ref={ref} onClick={handleClick} id="sb-pgp">PGP Key</div>
                        </div>
                    )}
                </Reference>
                <Popper placement="bottom">
                    {({ ref, style, placement, arrowProps }) => hover && (
                        <div ref={ref} style={style} id="sb-pgp-tooltip" data-placement={placement}>
                            PGP key copied to clipboard !
                            <div ref={arrowProps.ref} style={arrowProps.style} />
                        </div>
                    )}
                </Popper>
            </Manager>
        </div >
    )
}

export default PGP