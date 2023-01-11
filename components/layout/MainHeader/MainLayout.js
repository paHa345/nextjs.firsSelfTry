import { Fragment, useEffect } from "react";
import HeaderComponent from "../../HeaderComponents/HeaderComponent";
import FooterCOmponent from "../../FooterComponent/FooterComponent";
import { useSession } from "next-auth/react";
import { map } from "lodash";

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
