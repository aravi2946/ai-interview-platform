import { useEffect } from "react"
import { useRef } from "react"


const GoogleLoginButton = ({onSuccess}) => {
    const btnRef = useRef(null)

    useEffect(() => {
        const initializeGoogle = () => {
            if (!window.google) return;
            
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: onSuccess
            })
            window.google.accounts.id.renderButton(btnRef.current, {
                type: "standard",
                shape: "rectangular",
                theme: "outline",
                text: "continue_with",
                size: "large",
                logo_alignment: 'left'
            });
        };

        if (window.google)
            initializeGoogle();
        else
            window.onload = initializeGoogle
    },[onSuccess])
    return <div ref={btnRef} />
}

export default GoogleLoginButton