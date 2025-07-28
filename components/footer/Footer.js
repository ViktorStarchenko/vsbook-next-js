'use client'

import Image from "next/image";
import logoImage from '../../public/logo-6.png';
import BooksChatWidget from "../BooksChatWidget/BooksChatWidget";

export default function Footer() {

    return (
        <footer className="footer">
            <div className="wrapper wrapper-1170">
                {/*<BooksChatWidget />*/}
            </div>
            <div className="wrapper wrapper-1170">
                <div className="footer-inner">
                    <div className="row">
                        <div className="column">
                            <a href="/" className="footer-logo">
                                <Image src={logoImage.src} alt="footer logo" fill/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}