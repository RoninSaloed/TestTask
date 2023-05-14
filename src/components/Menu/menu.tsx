import { MenuProps } from "./menu.props"
import './menu.css';
import { Link } from "react-scroll"


export const Menu = ({ }: MenuProps): JSX.Element => {
    return (
        <div className="menu">
            <div className='menuContainer'>
                <nav className="menuLogoBody">
                    <div className="menuLogo"></div>
                </nav>
                <nav className="menuButtonBody">
                    <Link to="card" spy={true} smooth={true} offset={50} duration={500} >
                        <button className="menuAnchor">Users</button>
                    </Link>
                    <Link to="form" spy={true} smooth={true} offset={50} duration={500}>
                        <button className="menuAnchor">Sign up</button>
                    </Link>

                </nav>
            </div>
        </div>
    )
}
export default Menu