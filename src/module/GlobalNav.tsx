import { Link } from "react-router-dom"


const GlobalNav = () => {
    const navLinks = [
        {
            id: 1,
            to: "/",
            value: "Catálogo"

        },
        {
            id: 2,
            to: "/add",
            value: "Cadastro"

        },
    ];
    return (
        <>
            {navLinks.map((link) => {
                return (
                    <Link className="nav-link" key={link.id} to={link.to}>{link.value}</Link>
                )
            })}
        </>
    );
}

export default GlobalNav