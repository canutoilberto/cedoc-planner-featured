import { Menu, Button } from "@mantine/core";
import { RiFilterFill } from "react-icons/ri";
import { useArchiveStore } from "../../api/archiveStore";

const FilterMenu = () => {
  const { setFilter } = useArchiveStore();

  return (
    <Menu shadow="md" width={220} offset={7}>
      <Menu.Target>
        <Button variant="default" size="md">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Filtrar por progama
            <RiFilterFill size={20} />
          </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label style={{ textAlign: "center", paddingBottom: "0.5rem" }}>
          Programas
        </Menu.Label>
        <Menu.Item
          style={{ textAlign: "center" }}
          onClick={() => setFilter("BDPB PGM's")}
        >
          BDPB
        </Menu.Item>
        <Menu.Item
          style={{ textAlign: "center" }}
          onClick={() => setFilter("JPB1 PGM's")}
        >
          JPB1
        </Menu.Item>
        <Menu.Item
          style={{ textAlign: "center" }}
          onClick={() => setFilter("GE PGM's")}
        >
          GE
        </Menu.Item>
        <Menu.Item
          style={{ textAlign: "center" }}
          onClick={() => setFilter("JPB2 PGM's")}
        >
          JPB2
        </Menu.Item>
        <Menu.Item
          style={{ textAlign: "center", color: "red" }}
          onClick={() => setFilter("")}
        >
          Limpar filtro
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default FilterMenu;
