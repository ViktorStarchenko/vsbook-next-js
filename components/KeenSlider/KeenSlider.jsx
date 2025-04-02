'use client'

import { useEffect } from 'react';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export default function KeenSlider(
    {
        title,
        loop = true,
        perView = 4,
        perView1024 = 3,
        perView767 = 2,
        perView600 = 1,
        spacing = 40,
        spacing1024 = 20,
        spacing767 = 10,
        spacing600 = 0,
        mode = 'snap',
        vertical = false,
        origin = 'auto',
        children
    }) {
    const [sliderRef, instanceRef] = useKeenSlider(
{
            loop: loop,
            slides: { origin: origin, perView: perView, spacing: spacing },
            mode: mode,
            vertical: vertical,
            slideChanged() {

            },
            breakpoints: {
                '(max-width: 1024px)': {
                    slides: { perView: perView1024, spacing: spacing1024 }
                },
                '(max-width: 767px)': {
                    slides: { perView: perView767, spacing: spacing767 }
                },
                '(max-width: 600px)': {
                    slides: { perView: perView600, spacing: spacing600 }
                },
            }
        },
        [

        ]
    )

    useEffect(() => {
        console.log("children was changed")
        if (instanceRef.current) {
            instanceRef.current.update();
        }
    }, [children]);

    return (
        <div key={children.length} className={`keen-slider-block ${vertical ? 'vertical' : ''}`}>
            {title && <h2 className="h2">{title}</h2>}
            <div className="keen-slider-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {children}
                </div>
                <button
                    onClick={() => instanceRef.current?.prev()}
                    className="keen-arrow-button prev"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                        <path d="m17.621 48.246 31.207-42.75c0.44922-0.61328 1.0859-0.49219 1.8672-0.49219h31.488c0.98438 0 1.5508 1.1133 0.96875 1.9062l-31.461 43.094 31.457 43.094c0.57812 0.79297 0.015624 1.9062-0.96875 1.9062h-32.383c-0.76562 0-1.0469-0.59766-1.5156-1.2422l-31.426-43.051c-0.64453-0.87891 0.15234-1.625 0.76562-2.4648z" fillRule="evenodd"/>
                    </svg>
                </button>
                <button
                    onClick={() => instanceRef.current?.next()}
                    className="keen-arrow-button next"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                        <path d="m83.145 50.711-31.426 43.051c-0.46875 0.64453-0.75 1.2422-1.5156 1.2422h-32.383c-0.98437 0-1.5508-1.1133-0.96875-1.9062l31.457-43.094-31.461-43.09c-0.57812-0.79297-0.015625-1.9062 0.96875-1.9062h31.488c0.78125 0 1.418-0.12109 1.8672 0.49219l31.207 42.75c0.61328 0.83594 1.4102 1.582 0.76562 2.4609z" fillRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    )

}