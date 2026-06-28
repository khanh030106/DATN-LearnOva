import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./route/AppRoutes.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import AxiosInterceptorSetup from "./component/AxiosInterceptorSetup.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <AxiosInterceptorSetup>
                <App/>
            </AxiosInterceptorSetup>
        </AuthProvider>
    </StrictMode>,
)
