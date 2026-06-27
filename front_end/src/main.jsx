import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./route/AppRoutes.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
<<<<<<< HEAD
import './i18n.js';
=======
import AxiosInterceptorSetup from "./component/AxiosInterceptorSetup.jsx";
>>>>>>> bd4da8e4a688e756aa71d192aabd5e917697fabb

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <AxiosInterceptorSetup>
                <App/>
            </AxiosInterceptorSetup>
        </AuthProvider>
    </StrictMode>,
)
