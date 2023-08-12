import { Outlet } from "react-router-dom";
import { Header } from "./shared";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-5">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
