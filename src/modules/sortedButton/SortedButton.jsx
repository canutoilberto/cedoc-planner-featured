import { Menu, Button, Tooltip } from "@mantine/core";
import { RiSortNumberAsc, RiSortNumberDesc } from "react-icons/ri";
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
        <Tooltip label="Ordenar">
          <Button variant="default" size="md" onClick={toggleSortOrder}>
            {sortOrder === "asc" ? (
              <RiSortNumberDesc size={24} />
            ) : (
              <RiSortNumberAsc size={24} />
            )}
          </Button>
        </Tooltip>
      </Menu.Target>
    </Menu>
  );
};

export default SortedButton;
