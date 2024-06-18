import { Button, Tooltip, Text } from "@mantine/core";
import { RiDeleteBinFill } from "react-icons/ri";
import { modals } from "@mantine/modals";
import { useArchiveStore } from "../../api/archiveStore";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ActionDeleteButton = ({ itemId }) => {
  const { deleteItem } = useArchiveStore();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Excluir informação",
      centered: true,
      children: <Text size="sm">Tem certeza que deseja excluir?</Text>,
      labels: { confirm: "Excluir", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancelado"),
      onConfirm: () => handleDelete(),
    });

  const handleDelete = async () => {
    try {
      await deleteItem(itemId);
      toast.success("Item excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  };

  return (
    <Tooltip label="Excluir">
      <Button color="red" onClick={openDeleteModal}>
        <RiDeleteBinFill />
      </Button>
    </Tooltip>
  );
};

ActionDeleteButton.propTypes = {
  itemId: PropTypes.string.isRequired, // Validando que itemId é uma string obrigatória
};

export default ActionDeleteButton;
