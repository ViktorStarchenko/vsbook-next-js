export default function Test(props) {

    console.log("filtersArray", props.filtersArray)
    console.log("filtersArray - toArray", Array.from(props.filtersArray))
    const queryString = new URLSearchParams(props.filtersArray).toString();
    console.log("queryString ", queryString);
    // console.log("pagetest", props.pagetest)
    // console.log("sort", props.sort)
    // console.log("query", props.query)
    return (
        <div>Test</div>
    )
}