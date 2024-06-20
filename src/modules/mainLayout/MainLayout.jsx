import { Container } from "@mantine/core";
import classes from "./mainLayout.module.css";
import MainTable from "../mainTable/MainTable";
import ButtonsWrapper from "../buttonsWrapper/ButtonsWrapper";
import MainTitle from "../mainTitle/MainTitle";

const MainLayout = () => {
  

  return (
    <>
      <Container className={classes.container} h="100vh" w={820}>
        <header className={classes.header}>
          <MainTitle/>
        </header>
        <ButtonsWrapper />
        <MainTable />
      </Container>
    </>
  );
};

export default MainLayout;
