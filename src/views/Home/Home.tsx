import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import ViewContainer from "../../components/ViewContainer/ViewContainer";
import './Home.css';

const Home = (): JSX.Element => {
  return (
    <>
      <Header />
      <ViewContainer >
        <Outlet />
      </ViewContainer>
    </>
  );
};

export default Home;