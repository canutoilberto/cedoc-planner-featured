import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Stack, Paper, Select, Tooltip } from "@mantine/core";
import { AiFillFileAdd } from "react-icons/ai";
import { DateInput } from "@mantine/dates";
import { useArchiveStore } from "../../api/archiveStore";
import { toast } from "react-toastify";

const FormModalButton = () => {
  const [dateValue, setDateValue] = useState(null);
  const [videotape, setVideotape] = useState("");
  const [videotapeStatus, setVideotapeStatus] = useState("");
  const [broadcast, setBroadcast] = useState("");
  const [broadcastStatus, setBroadcastStatus] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const addItem = useArchiveStore((state) => state.addItem);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dateValue ||
      !videotape ||
      !videotapeStatus ||
      !broadcast ||
      !broadcastStatus
    ) {
      toast.warn("Por favor, preencha todos os campos do formulário...");
      return;
    }

    setIsSubmiting(true);
    const newItem = {
      date: dateValue,
      vtValue: videotape,
      vtStatus: videotapeStatus,
      pgmValue: broadcast,
      pgmStatus: broadcastStatus,
    };
    await addItem(newItem);
    toast("Dados inseridos com sucesso!");
    setIsSubmiting(false);
    close();
    // Resetar os valores dos campos do formulário
    setDateValue(null);
    setVideotape("");
    setVideotapeStatus("");
    setBroadcast("");
    setBroadcastStatus("");
  };

  return (
    <>
      <div>
        <Modal
          opened={opened}
          onClose={close}
          title="Controle de arquivos"
          size="auto"
          centered
        >
          <form onSubmit={handleSubmit}>
            <Paper>
              <Stack w={700} mx="auto" px={14} align="strech" gap="lg">
                <DateInput
                  id="dateValue"
                  valueFormat="DD MMMM YY"
                  value={dateValue}
                  onChange={setDateValue}
                  label="Data"
                  placeholder="DD/MM/YYYY"
                  clearable
                />

                <Select
                  id="videotape"
                  label="VT's"
                  placeholder="VT"
                  data={["BDPB VT's", "GE VT's", "JPB1 VT's", "JPB2 VT's"]}
                  value={videotape}
                  onChange={setVideotape}
                  clearable
                />
                <Select
                  id="videotapeStatus"
                  label="Status do VT"
                  placeholder="Status"
                  data={["OK", "NÃO CAPTURADO", "OUTRO"]}
                  value={videotapeStatus}
                  onChange={setVideotapeStatus}
                  clearable
                />
                <Select
                  id="broadcast"
                  label="Programa"
                  placeholder="PGM"
                  data={["BDPB PGM's", "GE PGM's", "JPB1 PGM's", "JPB2 PGM's"]}
                  value={broadcast}
                  onChange={setBroadcast}
                  clearable
                />
                <Select
                  id="broadcastStatus"
                  label="Status do Programa"
                  placeholder="Status"
                  data={["OK", "NÃO CAPTURADO", "OUTRO"]}
                  value={broadcastStatus}
                  onChange={setBroadcastStatus}
                  clearable
                />

                <Button type="submit" variant="filled" disabled={isSubmiting}>
                  {isSubmiting ? "Enviando..." : "Enviar"}
                </Button>
              </Stack>
            </Paper>
          </form>
        </Modal>

        <Tooltip label="Inserir">
          <Button variant="filled" size="md" onClick={open}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              Inserir
              <AiFillFileAdd size={20} />
            </div>
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default FormModalButton;
