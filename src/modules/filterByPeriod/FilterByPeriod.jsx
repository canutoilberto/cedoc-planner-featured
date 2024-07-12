import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Menu, Button, Group } from "@mantine/core";
import { RiCalendarFill } from "react-icons/ri";
import { useArchiveStore } from "../../api/archiveStore";

const FilterByPeriod = () => {
  const [value, setValue] = useState([null, null]);
  const { setStartDate, setEndDate, fetchItemsByPeriod, fetchItems } =
    useArchiveStore();

  const applyPeriodFilter = () => {
    const [start, end] = value;
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      fetchItemsByPeriod(start, end);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      applyPeriodFilter();
    }
  };

  const clearFilter = () => {
    setValue([null, null]);
    setStartDate(null);
    setEndDate(null);
    fetchItems();
  };

  return (
    <Menu shadow="md" width={300} offset={7}>
      <Menu.Target>
        <Button variant="default" size="md">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Filtrar por data
            <RiCalendarFill size={20} />
          </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <div style={{ padding: "1rem" }}>
          <DatePicker
            allowSingleDateInRange
            type="range"
            value={value}
            onChange={setValue}
            onKeyDown={handleKeyDown}
          />
          <Group position="right" mt="md">
            <Button variant="light" size="xs" onClick={applyPeriodFilter}>
              Aplicar
            </Button>
            <Button variant="light" size="xs" onClick={clearFilter}>
              Limpar filtro
            </Button>
          </Group>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default FilterByPeriod;
