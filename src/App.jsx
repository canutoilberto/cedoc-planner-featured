import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/pt-br";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import MainLayout from "./modules/mainLayout/MainLayout";

export default function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <DatesProvider settings={{ locale: "pt-br" }}>
          <MainLayout />
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
