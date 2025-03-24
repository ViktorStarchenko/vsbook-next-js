export default function Section(
    {
        children,
        paddingTopDesktop = null,
        paddingBottomDesktop = null
    }) {

    return (
        <section className="section" style={{paddingTop: paddingTopDesktop, paddingBottom: paddingBottomDesktop}}>
            <div className="wrapper wrapper-1170">
                {children}
            </div>
        </section>
    )
}