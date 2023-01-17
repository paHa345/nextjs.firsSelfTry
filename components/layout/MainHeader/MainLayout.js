import { Fragment, useEffect } from "react";
import HeaderComponent from "../../HeaderComponents/HeaderComponent";
import FooterCOmponent from "../../FooterComponent/FooterComponent";
import { useSession } from "next-auth/react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../../store/appStateSlice";

function MainLayout(props) {
  const fetchStatus = useSelector(
    (state) => state.appState.fetchDataNotification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        appStateActions.setFetchNotificationStatus({
          status: false,
          text: "",
        })
      );
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [fetchStatus, dispatch]);

  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <main>{props.children}</main>

      <FooterCOmponent></FooterCOmponent>
    </Fragment>
  );
}
export default MainLayout;
