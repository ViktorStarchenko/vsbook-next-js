import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";
import HeaderAuthMenu from "./HeaderAuthMenu";

export default function HeaderDesktopMenu() {

    return (
        <div className="desktop-menu">
            <MultiLevelMenu />
            <HeaderAuthMenu />
        </div>
    )
}