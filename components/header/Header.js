import logoImage from '../../public/logo-6.png';
import Image from "next/image";
import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderDesktopMenu from "./HeaderDesktopMenu";
import HeaderAuthMenu from "./HeaderAuthMenu";

export default function Header() {


    return (
        <>
            <header id="masthead" className="header">
                <div className="wrapper wrapper-1170">
                    <div className="header-inner">
                        <div className="header-left">
                            <a href="/" className="header-logo">
                                <Image src={logoImage.src} alt="header logo" fill/>
                            </a>
                        </div>
                        <div className="header-right">
                            <nav className="header-nav">
                                {/*<ul className="header-nav-list">*/}
                                {/*    <li>*/}
                                {/*        <NavLink url="/" title="Home"/>*/}
                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <NavLink url="/books" title="Books"/>*/}
                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <NavLink url="/books/shepot-za-oknom" title="Шепот за окном"/>*/}
                                {/*    </li>*/}
                                {/*</ul>*/}
                                <HeaderDesktopMenu />
                                <HeaderAuthMenu />
                                <HeaderMobileMenu />

                            </nav>

                        </div>
                    </div>
                </div>
            </header>
            <div className="header-spacing"></div>
        </>
    )
}