import {BrowserRouter} from 'react-router-dom';
import AuthProvider from "./Contexts/auth";
import Routes from "./routes";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
