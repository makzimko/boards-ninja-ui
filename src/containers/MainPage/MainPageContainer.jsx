import { useContext } from "react";

import Welcome from "../../components/Welcome/Welcome";
import AuthContext from "../../providers/Auth/context";

const MainPageContainer = () => {
    const [{ userInfo }] = useContext(AuthContext);
    return <>
        { !userInfo && <Welcome /> }
        { !!userInfo && <div>main page should be here</div>}
    </>
};

export default MainPageContainer;