import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./route/AppRoutes.jsx";
import {AurhProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AurhProvider>
            <App/>
        </AurhProvider>
    </StrictMode>,
)
