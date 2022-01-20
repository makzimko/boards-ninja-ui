import {useRecoilValue} from "recoil";

import Welcome from "../../components/Welcome/Welcome";
import SummaryWidget from "../../components/SummaryWidget/SummaryWidget";
import {userInfoState} from "../../atoms/auth";

const MainPageContainer = () => {
    const userInfo = useRecoilValue(userInfoState);

    return <>
        { !userInfo && <Welcome /> }
        { !!userInfo && <SummaryWidget />}
    </>
};

export default MainPageContainer;