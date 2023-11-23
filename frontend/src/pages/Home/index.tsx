import { FC, lazy } from "react";
import SuspensePage from "./SuspensePage";
import { Box } from "@mantine/core";
import classes from "./Home.module.css";

const Main = lazy(() => import("@/components/MainSection"));
const MainElement: FC = () => {
  return (
    <SuspensePage>
      <Main />
    </SuspensePage>
  );
};

export default function Home() {
  return (
    <Box className={classes.main}>
      <MainElement />
    </Box>
  );
}
