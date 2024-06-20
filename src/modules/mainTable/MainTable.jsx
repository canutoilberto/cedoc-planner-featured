/* eslint-disable no-unused-vars */
import { Table, Loader, Pagination, Tooltip, VisuallyHidden } from "@mantine/core";
import { useArchiveStore } from "../../api/archiveStore";
import { formatDataInfo } from "../../api/archiveUtils";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionDeleteButton from "../actionDeleteButton/ActionDeleteButton";
import ActionEditButton from "../actionEditButton/ActionEditButton";
import GenerateTablePDF from "../generateTablePDF/GenerateTablePDF";

const MainTable = () => {
  const {
    data,
    listenData,
    filter,
    filterDate,
    currentPage,
    itemsPerPage,
    setPage,
    fetchItemsForCurrentMonth,
  } = useArchiveStore();

  const [isLoading, setIsLoading] = useState(true);

  const getArchiveData = useCallback(async () => {
    try {
      await fetchItemsForCurrentMonth();
    } catch (error) {
      console.log(error.message);
    }
  }, [fetchItemsForCurrentMonth]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getArchiveData();
      setIsLoading(false);
    };
    fetchData();
  }, [listenData, getArchiveData]);


  const filteredData = data.filter((item) => {
    const programMatch = filter ? item.pgmValue.includes(filter) : true;
    const dateMatch = filterDate
      ? formatDataInfo(item.date) === formatDataInfo(filterDate)
      : true;
    return programMatch && dateMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  

  const rows =
    paginatedData.length === 0 ? (
      <Table.Tr>
        <Table.Td colSpan={4} style={{ textAlign: "center" }}>
          Nenhum resultado encontrado
        </Table.Td>
      </Table.Tr>
    ) : (
      paginatedData.map((dt) => (
        <Table.Tr key={dt.id}>
          <Table.Td>{formatDataInfo(dt.date)}</Table.Td>
          <Tooltip.Floating label={dt.infoVtStatus === "" ? dt.vtStatus.toLowerCase() : dt.infoVtStatus}>
              <Table.Td>{`${dt.vtValue} - ${dt.vtStatus}`}</Table.Td>
          </Tooltip.Floating>
          <Tooltip.Floating label={dt.infoPgmStatus === "" ? dt.pgmStatus.toLowerCase() : dt.infoPgmStatus}>
            <Table.Td>{`${dt.pgmValue} - ${dt.pgmStatus}`}</Table.Td>
          </Tooltip.Floating>
          
          <Table.Td
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ActionEditButton itemId={dt.id} initialData={dt} />
            <ActionDeleteButton itemId={dt.id} />
          </Table.Td>
        </Table.Tr>
      ))
    );

  return (
    <>
      <Table
        striped
        highlightOnHover
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
            <Table.Th>AÇÕES</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading ? (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "center" }}>
                <Loader size="md" color="gray" />
              </Table.Td>
            </Table.Tr>
          ) : (
            rows
          )}
        </Table.Tbody>
      </Table>
      <Pagination
        total={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={setPage}
        pb="2rem"
        size="md"
        position="center"
        withControls
        withEdges
      />
      <ToastContainer theme="dark" type="success" autoClose={3000} />
      <VisuallyHidden>
        <GenerateTablePDF paginatedData={paginatedData} />
      </VisuallyHidden>
    </>
    
  );
};

export default MainTable;
