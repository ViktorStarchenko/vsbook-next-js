export default function Section(
    {
        children,
        paddingTopDesktop = null,
        paddingBottomDesktop = null,
        contentWrapper = 'wrapper-1170'
    }) {

    return (
        <section className="section" style={{paddingTop: paddingTopDesktop, paddingBottom: paddingBottomDesktop}}>
            <div className={`wrapper ${contentWrapper}`}>
                {children}
            </div>
        </section>
    )
}