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
    <Box
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #DC244C 15%, #E2E1DC 15%)",
      }}
    >
      <Box className={classes.main}>
      
        <MainElement />
      </Box>
    </Box>
  );
}
