import { useContext } from "react";

import Welcome from "../../components/Welcome/Welcome";
import AuthContext from "../../providers/Auth/context";
import SummaryWidget from "../../components/SummaryWidget/SummaryWidget";

const MainPageContainer = () => {
    const [{ userInfo }] = useContext(AuthContext);
    return <>
        { !userInfo && <Welcome /> }
        { !!userInfo && <SummaryWidget />}
    </>
};

export default MainPageContainer;