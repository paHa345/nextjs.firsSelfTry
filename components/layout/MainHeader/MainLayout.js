import { Fragment } from "react";
import HeaderComponent from "../../HeaderComponents/HeaderComponent";
import FooterCOmponent from "../../FooterComponent/FooterComponent";
function MainLayout(props) {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <main>{props.children}</main>

      <FooterCOmponent></FooterCOmponent>
    </Fragment>
  );
}
export default MainLayout;
