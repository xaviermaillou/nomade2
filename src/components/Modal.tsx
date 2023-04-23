import { useContext, useState } from "react"
import context, { ContextProps } from "../context/context"
import requests, { RequestsProps } from "../context/requests"

const Modal = () => {
    const contextData: ContextProps = useContext(context)
    const requestsData: RequestsProps = useContext(requests)

    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const [userMail, setUserMail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const [alertMessage, setAlertMessage] = useState<string>("")

    const handleLogin = async (newUser: boolean) => {
        const result = newUser ?
            await requestsData.signUpWithMailAndPassword(userMail, userPassword)
            :
            await requestsData.signInWithMailAndPassword(userMail, userPassword)
        if (result.success) contextData.setModal(null)
        else setErrorMessage(result.errorMessage)
    }

    const handleLogout = async () => {
        requestsData.signOut()
        contextData.setModal(null)
    }

    const handleAlert = async () => {
        const placeId = contextData.warningPlaceId
        if (placeId) {
            setLoading(true)
            const response = await requestsData.postPlaceWarning(placeId, {message: alertMessage})
            if (response.placeId === placeId) {
                setLoading(false)
                setSuccess(true)
                setTimeout(() => {
                    contextData.setModal(null)
                    setSuccess(false)
                }, 3000)
            } else {
                setErrorMessage("Error while sending the alert, please try again")
            }
        }
    }

    const closeModal = () => {
        contextData.setModal(null)
    }

    return (
        <div id="modal" className="container fullHeight fullWidth vertical">
            <img onClick={closeModal} className="close clickable" src="/img/close.png" alt="close modal" />
            {contextData.modal === 1 &&
                <div className="container halfHeight fullWidth vertical">
                    <input onChange={(e) => setUserMail(e.target.value)} value={userMail} placeholder="Email address" type="text" className="fullWidth" />
                    <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} placeholder="Password" type="password" className="fullWidth" />
                    <div className="horizontal fullWidth">
                        <div onClick={() => handleLogin(false)} className="button clickable">Sign in</div>
                        <div onClick={() => handleLogin(true)} className="button clickable">Sign up</div>
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
                        <div onClick={handleLogout} className="vertical button clickable">Yes</div>
                        <div onClick={closeModal} className="vertical button clickable">No</div>
                    </div>
                </div>
            }
            {contextData.modal === 3 &&
                <div className="container halfHeight fullWidth vertical">
                    <div className="vertical fullWidth">
                        Send a warning
                    </div>
                    <div className="vertical fullWidth fullHeight">
                        <textarea
                            placeholder="Has this place closed? Is there an issue in this place that should be pointed out? Warn us about anything that seems important to you!"
                            className="fullWidth fullHeight"
                            value={alertMessage}
                            onChange={(e) => setAlertMessage(e.target.value)}
                        />
                    </div>
                    <div className="vertical fullWidth">
                        <div onClick={handleAlert} className="vertical button clickable">
                            {success && <img className="fullHeight" src="/img/check.png" alt="success" />}
                            {loading && <img className="fullHeight" src="/img/loading.gif" alt="loading" />}
                            {(!success && !loading) && "Send"}
                        </div>
                        <div id="loginErrorMessage" className="fullWidth">{errorMessage}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal