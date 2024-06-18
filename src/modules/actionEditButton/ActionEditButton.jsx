import { Button, Tooltip, Modal, Stack, Paper, Select, TextInput } from "@mantine/core";
import { RiEdit2Fill } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { useArchiveStore } from "../../api/archiveStore";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ActionEditButton = ({ itemId, initialData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { updateItem } = useArchiveStore();
  const [value, setValue] = useState(
    initialData?.date ? new Date(initialData.date.seconds * 1000) : null
  );
  const [vtValue, setVtValue] = useState(initialData?.vtValue || "");
  const [vtStatus, setVtStatus] = useState(initialData?.vtStatus || "");
  const [pgmValue, setPgmValue] = useState(initialData?.pgmValue || "");
  const [pgmStatus, setPgmStatus] = useState(initialData?.pgmStatus || "");

  const [infoVtStatus, setinfoVtStatus] = useState(initialData?.infoVtStatus || "");
  const [infoPgmStatus, setInfoPgmStatus] = useState(initialData?.infoPgmStatus || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async () => {
    setIsSubmitting(true);

    const updatedItem = {
      date: value,
      vtValue,
      vtStatus,
      infoVtStatus,
      pgmValue,
      pgmStatus,
      infoPgmStatus
    };

    await updateItem(itemId, updatedItem);
    setIsSubmitting(false);
    
    toast.success("Item editado com sucesso!");
    close();
  };

  return (
    <>
      <Tooltip label="Editar">
        <Button onClick={open}>
          <RiEdit2Fill />
        </Button>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Editar Informação"
        size="auto"
        centered
      >
        <form>
          <Paper>
            <Stack w={700} mx="auto" px={14} align="stretch" gap="lg">
              <DateInput
                id="dateValue"
                valueFormat="DD MMMM YYYY"
                value={value}
                onChange={setValue}
                label="Data"
                placeholder="DD/MM/YYYY"
                clearable
              />
              <Select
                id="videotape"
                label="VT's"
                placeholder="VT"
                data={["BDPB VT's", "GE VT's", "JPB1 VT's", "JPB2 VT's"]}
                value={vtValue}
                onChange={setVtValue}
                clearable
              />
              <Select
                id="videotapeStatus"
                label="Status do VT"
                placeholder="Status"
                data={["OK", "NÃO CAPTURADO", "OUTRO"]}
                value={vtStatus}
                onChange={setVtStatus}
                clearable
              />
              {vtStatus == "OUTRO" && (
                  <TextInput
                    id="infoStatus"
                    label="Descrição do Status"
                    placeholder="Descreva o status do VT"
                    value={infoVtStatus}
                    onChange={(e) => setinfoVtStatus(e.target.value)}
                  />
              )}
              <Select
                id="broadcast"
                label="Programa"
                placeholder="PGM"
                data={["BDPB PGM's", "GE PGM's", "JPB1 PGM's", "JPB2 PGM's"]}
                value={pgmValue}
                onChange={setPgmValue}
                clearable
              />
              <Select
                id="broadcastStatus"
                label="Status do Programa"
                placeholder="Status"
                data={["OK", "NÃO CAPTURADO", "OUTRO"]}
                value={pgmStatus}
                onChange={setPgmStatus}
                clearable
              />
              {pgmStatus == "OUTRO" && (
                  <TextInput
                    id="infoStatus"
                    label="Descrição do Programa"
                    placeholder="Descreva o status do Programa"
                    value={infoPgmStatus}
                    onChange={(e) => setInfoPgmStatus(e.target.value)}
                  />
              )}
              <Button
                variant="filled"
                onClick={handleUpdate}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </Stack>
          </Paper>
        </form>
      </Modal>
    </>
  );
};

ActionEditButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    date: PropTypes.object,
    vtValue: PropTypes.string,
    vtStatus: PropTypes.string,
    pgmValue: PropTypes.string,
    pgmStatus: PropTypes.string,
  }).isRequired,
};

export default ActionEditButton;
