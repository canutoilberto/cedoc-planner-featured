import { Container, Title, Text } from "@mantine/core";
import classes from "./mainLayout.module.css";
import MainTable from "../mainTable/MainTable";
import ButtonsWrapper from "../buttonsWrapper/ButtonsWrapper";

const MainLayout = () => {
  const date = new Date();
  const monthEl = date
    .toLocaleString("pt-br", {
      month: "long",
    })
    .toUpperCase();

  const yearEl = date.getFullYear();

  return (
    <>
      <Container className={classes.container} h="100vh" w={820}>
        <header className={classes.header}>
          <Title order={2}>CONTROLE DE ARQUIVOS</Title>
          <Text>{`${monthEl} ${yearEl}`}</Text>
        </header>
        <ButtonsWrapper />
        <MainTable />
      </Container>
    </>
  );
};

export default MainLayout;
