import { Text, Title } from "@mantine/core";

const MainTitle = () => {
    const date = new Date();
    const monthEl = date
        .toLocaleString("pt-br", {
        month: "long",
    }).toUpperCase();
    const yearEl = date.getFullYear();

    return(
        <>
           <Title order={2}>CONTROLE DE ARQUIVOS</Title>
           <Text>{`${monthEl} ${yearEl}`}</Text> 
        </>
    );
}

export default MainTitle;