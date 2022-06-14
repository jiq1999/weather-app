import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Styles from "./Nav.module.css"
import logo from "../images/weather-app.png"

export default function Nav({ onSearch }) {
    return (
        <nav className={Styles.nav}>
            <div className={Styles.links}>
                <Link className={Styles.link} to="/">
                    <span className={Styles.brand}>
                        <img
                            id="logo"
                            src={logo}
                            width="40px"
                            height="40px"
                            alt=""
                        />
                        WEATHER APP
                    </span>
                </Link>
            </div>
            <SearchBar onSearch={onSearch} />
        </nav>
    )
}