import { useContext, useState } from "react"
import context, { ContextProps } from "../context/context"

const Modal = () => {
    const contextData: ContextProps = useContext(context)

    const [userMail, setUserMail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const handleSubmit = async (newUser: boolean) => {
        const result = newUser ?
            await contextData.signUpWithMailAndPassword(userMail, userPassword)
            :
            await contextData.signInWithMailAndPassword(userMail, userPassword)
        if (result.success) contextData.setModal(null)
        else setErrorMessage(result.errorMessage)
    }

    return (
        <div id="modal" className="container fullHeight fullWidth vertical">
            {contextData.modal === 1 &&
                <div className="container halfHeight fullWidth vertical">
                    <div className="halfHeight fullWidth vertical">
                        <input onChange={(e) => setUserMail(e.target.value)} value={userMail} placeholder="Email address" type="text" className="fullWidth" />
                        <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} placeholder="Password" type="password" className="fullWidth" />
                        <div className="vertical fullWidth">
                            <div className="horizontal fullWidth">
                                <div onClick={() => handleSubmit(false)} className="halfWidth">Sign in</div>
                                <div onClick={() => handleSubmit(true)} className="halfWidth">Sign up</div>
                            </div>
                            <div className="fullWidth">{errorMessage}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal