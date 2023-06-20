import { connect, useSelector } from "react-redux";
import { NavLink, useNavigate, withRouter } from "react-router-dom";


export function AppHeader(props) {
    // console.log('props from header', props);
    const navigate = useNavigate()

    const loggedInUser = useSelector((storeState) => {
        // console.log(storeState);
        return storeState.userModule.loggedInUser
    })

    function onBack() {
        navigate(-1)
    }


    const { name, balance } = loggedInUser
    return (
        <header className="app-header">
            <section className="container">
                <h1 className="logo">Robots</h1>
                <section className="back">
                    <p>Name: {name}</p>
                    <p>balance: {balance}</p>
                    <button onClick={onBack} >Back</button>
                </section>
                <nav>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    )
}

// export const AppHeader = withRouter(_AppHeader)