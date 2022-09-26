import {
    AppBar,
    AppBarSection,
    AppBarSpacer,
  } from "@progress/kendo-react-layout";
import {Ripple} from "@progress/kendo-react-ripple"
import "./TitleBar.scss"

const TitleBar = () => {
    return (
        <Ripple>
             <AppBar positionMode={"fixed"} themeColor={"inherit"}>
                <AppBarSection>
                    <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
                        <span className="k-icon k-i-globe" />
                    </button>
                    </AppBarSection>
                    <AppBarSpacer style={{ width: 4 }} />
                    <AppBarSection>
                    <h1 className="title">Oil Field Manager</h1>
                </AppBarSection>
            </AppBar>
        </Ripple>
       
    )
}

export default TitleBar