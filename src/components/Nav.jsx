import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Styles from "./Nav.module.css"

export default function Nav({ onSearch }) {
    return (
        <nav className={Styles.nav}>
            <div className={Styles.links}>
                <Link to="/">
                    <span className={Styles.brand}>
                        <img
                            id="logo-henry"
                            src=""
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
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