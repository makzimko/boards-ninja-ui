import Header from "../Header/Header";

const DefaultLayout = ({ children }) => {
    return <div>
        <Header />
        {children}
    </div>
};

export default DefaultLayout;