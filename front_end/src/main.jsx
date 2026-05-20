import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./route/AppRoutes.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
