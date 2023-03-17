import { useContext, useState } from "react"
import context, { ContextProps } from "../context/context"

const Modal = () => {
    const contextData: ContextProps = useContext(context)

    const [userMail, setUserMail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const handleLogin = async (newUser: boolean) => {
        const result = newUser ?
            await contextData.signUpWithMailAndPassword(userMail, userPassword)
            :
            await contextData.signInWithMailAndPassword(userMail, userPassword)
        if (result.success) contextData.setModal(null)
        else setErrorMessage(result.errorMessage)
    }

    const handleLogout = async (arg: boolean) => {
        if (arg) contextData.signOut()
        contextData.setModal(null)
    }

    return (
        <div id="modal" className="container fullHeight fullWidth vertical">
            {contextData.modal === 1 &&
                <div className="container halfHeight fullWidth vertical">
                    <input onChange={(e) => setUserMail(e.target.value)} value={userMail} placeholder="Email address" type="text" className="fullWidth" />
                    <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} placeholder="Password" type="password" className="fullWidth" />
                    <div className="horizontal fullWidth">
                        <p onClick={() => handleLogin(false)} className="button clickable">Sign in</p>
                        <p onClick={() => handleLogin(true)} className="button clickable">Sign up</p>
                    </div>
                    <div id="loginErrorMessage" className="fullWidth">{errorMessage}</div>
                </div>
            }
            {contextData.modal === 2 &&
                <div className="container halfHeight fullWidth vertical">
                    <div className="vertical fullWidth">
                        Are you sure to sign out ?
                    </div>
                    <div className="horizontal fullWidth">
                        <div onClick={() => handleLogout(true)} className="vertical button clickable">Yes</div>
                        <div onClick={() => handleLogout(false)} className="vertical button clickable">No</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal