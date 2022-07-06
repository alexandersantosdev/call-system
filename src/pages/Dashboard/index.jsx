import {useContext} from "react";
import {AuthContext} from "../../Contexts/auth";

export default function Dashboard() {

    const {signOut} = useContext(AuthContext);

    return (
        <>
            <h1>
                Dashboard
            </h1>
            <button onClick={signOut}>Logout</button>
        </>
    );
}