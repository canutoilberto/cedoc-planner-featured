/* eslint-disable react/prop-types */
import { Container, Table } from "@mantine/core";
import classes from "./generateTablePDF.module.css";
import MainTitle from "../mainTitle/MainTitle";
import { formatDataInfo } from "../../api/archiveUtils";

const GenerateTablePDF = ({ paginatedData }) => {
  const rows = paginatedData.map((dt) => (
    <Table.Tr key={dt.id}>
      <Table.Td>{formatDataInfo(dt.date)}</Table.Td>
      <Table.Td>{`${dt.vtValue} - ${dt.vtStatus}`}</Table.Td>
      <Table.Td>{`${dt.pgmValue} - ${dt.pgmStatus}`}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Container className={classes.container} h="100vh" w={820} id="conteudo">
        <header className={classes.header}>
          <MainTitle />
        </header>

        <Table
          className={classes.divTable}
          withTableBorder
          withColumnBorders
          horizontalSpacing="lg"
          verticalSpacing="md"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>DATA</Table.Th>
              <Table.Th>VT&apos;s</Table.Th>
              <Table.Th>PGM&apos;s</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
    </>
  );
};

export default GenerateTablePDF;
