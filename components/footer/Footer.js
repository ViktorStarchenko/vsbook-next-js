'use client'

import Image from "next/image";
import logoImage from '../../public/logo-6.png';
import BooksChatWidget from "../BooksChatWidget/BooksChatWidget";
import Section from "../section/Section";
import BooksChatWidgetSmall from "../BooksChatWidgetSmall/BooksChatWidgetSmall";

export default function Footer() {

    return (
        <>
            {/*<Section>*/}
            {/*    <BooksChatWidget />*/}
            {/*</Section>*/}
            <footer className="footer">
                <div className="wrapper wrapper-1170">

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
                <BooksChatWidgetSmall/>
            </footer>
        </>

    )
}