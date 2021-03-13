import React, { PureComponent } from "react";
import styles from "./navBar.module.scss";
import logoBlue from "./../../../Assets/Images/logo/logo-blue.svg";
import logoBlueLeaf from "./../../../Assets/Images/logo/logo-blue-leaf.svg";
import { HashLink as Link } from "react-router-hash-link";

export default class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { logoClass: "", logoBackground: "", logoImg: logoBlue };
    }

    componentDidMount = () => {
        window.addEventListener("scroll", this.getWindowHeight);
    };

    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.getWindowHeight);
    };

    getWindowHeight = () => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
        let shrinkOn1 = 200;
        let shrinkOn2 = 400;

        // THIS IS SO SKETCHY SOMEONE PLS HELP FIX
        if (window.location.href.slice(-4, -1) === "tea") {
            shrinkOn1 = 50;
            shrinkOn2 = 70;
        }

        if (distanceY > shrinkOn1) {
            this.setState({ logoClass: styles["logoShrink"] });
        }

        if (distanceY > shrinkOn2) {
            this.setState({
                logoBackground: styles["logoBackground"],
                logoImg: logoBlueLeaf,
            });
        }

        if (distanceY === 0) {
            this.setState({ logoClass: styles["logoGrow"], logoImg: logoBlue });
        }

        if (distanceY < shrinkOn1) {
            this.setState({ logoBackground: "" });
        }
    };

    closeNav() {
        if (this.refs.checkboxRef.checked) {
            this.refs.checkboxRef.checked = !this.refs.checkboxRef.checked;
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    render() {
        let { logoClass, logoImg, logoBackground } = this.state;
        let zindex = { zIndex: 100 };

        return (
            <header className={styles.header} style={zindex}>
                <Link
                    smooth
                    to={"/"}
                    onClick={() => {
                        this.closeNav();
                        this.scrollToTop();
                    }}
                >
                    <div className={`${styles.logo} ${logoClass} ${logoBackground}`}>
                        <img src={logoImg} alt="Logo" className={styles.logoImg} />
                    </div>
                </Link>

                <nav className={styles.nav}>
                    <input
                        type="checkbox"
                        ref="checkboxRef"
                        id="check"
                        className={styles.checkbox}
                        hidden
                    />
                    <div className={styles.hamburgerMenu}>
                        <label for="check" className={styles.menu}>
                            <div className={`${styles.menuLine} ${styles.menuLine1}`} />
                            <div className={`${styles.menuLine} ${styles.menuLine2}`} />
                            <div className={`${styles.menuLine} ${styles.menuLine3}`} />
                        </label>
                    </div>

                    <div className={styles.slideoutNav}>
                        <ul className={styles.navList}>
                            <Link smooth to={"/#about"}>
                                <li
                                    className={styles.navListItem}
                                    tab="0"
                                    onClick={() => this.closeNav()}
                                >
                                    About
                                </li>
                            </Link>
                            <Link to={"/team"}>
                                <li
                                    className={styles.navListItem}
                                    onClick={() => this.closeNav()}
                                >
                                    Our Team
                                </li>
                            </Link>
                            <Link smooth to={"/#events"}>
                                <li
                                    className={styles.navListItem}
                                    onClick={() => this.closeNav()}
                                >
                                    Events
                                </li>
                            </Link>
                            <Link smooth to={"/#joinus"}>
                                <li
                                    className={styles.navListItem}
                                    onClick={() => this.closeNav()}
                                >
                                    Join Us
                                </li>
                            </Link>
                            <Link smooth to={"/#sponsors"}>
                                <li
                                    className={styles.navListItem}
                                    onClick={() => this.closeNav()}
                                >
                                    Sponsors
                                </li>
                            </Link>
                            <Link smooth to={"/#contactus"}>
                                <li
                                    className={styles.navListItem}
                                    onClick={() => this.closeNav()}
                                >
                                    Contact Us
                                </li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
