import { Menu, Button } from "@mantine/core";
import { useArchiveStore } from "../../api/archiveStore";

const SortedButton = () => {
  const { setSortOrder, sortOrder, fetchItems } = useArchiveStore();

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    fetchItems();
  };

  return (
    <Menu shadow="md" offset={7}>
      <Menu.Target>
        <Button variant="default" size="md" onClick={toggleSortOrder}>
          Ordenar: {sortOrder === "asc" ? "Desc" : "Asc"}
        </Button>
      </Menu.Target>
    </Menu>
  );
};

export default SortedButton;
