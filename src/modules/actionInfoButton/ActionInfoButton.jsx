import { Button, Tooltip } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";

const ActionInfoButton = () => {
  return (
    <Tooltip label="Info">
      <Button variant="default" size="md">
        <BsThreeDots />
      </Button>
    </Tooltip>
  );
};

export default ActionInfoButton;
