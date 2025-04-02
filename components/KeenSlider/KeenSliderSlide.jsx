import classes from './KeenSlider.module.css'

export default function KeenSliderSlide({classes, children}) {

    return (
        <div className={`keen-slider__slide ${classes ? classes : ''}`}>
            {children}
        </div>
    )
}