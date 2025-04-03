import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";
import HeaderAuthMenu from "./HeaderAuthMenu";
import SearchBar from "../SearchBar/SearchBar";

export default function HeaderDesktopMenu() {

    return (
        <div className="desktop-menu">
            <SearchBar />
            <MultiLevelMenu />
            {/*<HeaderAuthMenu />*/}
        </div>
    )
}