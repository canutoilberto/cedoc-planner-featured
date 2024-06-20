import { Button, Menu, Tooltip, rem } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import generatePDF from "react-to-pdf";


const ActionInfoButton = () => {
  const contentPDF = () => document.getElementById('conteudo')
  
  return (
    <Menu 
      position="bottom-start" 
      offset={11}
    >
      <Menu.Target>
        <Tooltip label="Info">
          <Button variant="default" size="md">
            <BsThreeDots />
          </Button>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item 
          leftSection={<FaRegFilePdf style={{width: rem(20), height: rem(20)}}/>} 
          onClick={()=> generatePDF(contentPDF, {filename: 'controle_de_arquivos.pdf'})}
        >
          Gerar PDF
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionInfoButton;
