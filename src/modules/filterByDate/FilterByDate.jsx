import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useArchiveStore } from "../../api/archiveStore";

const FilterByDate = () => {
  const [date, setDate] = useState(null);
  const { setFilterDate } = useArchiveStore();

  const applyDateFilter = (selectedDate) => {
    setDate(selectedDate);
    setFilterDate(selectedDate);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      applyDateFilter(date);
    }
  };

  const handleClear = () => {
    setDate(null);
    setFilterDate(null);
  };

  return (
    <div>
      <DateInput
        value={date}
        onChange={applyDateFilter}
        onKeyDown={handleKeyDown}
        valueFormat="DD MMMM YY"
        placeholder="Filtrar por data"
        clearable
        onClear={handleClear}
        size="md"
      />
    </div>
  );
};

export default FilterByDate;
