import { Box, Button, Text } from "@mantine/core";
import classes from "./DemoSearch.module.css";
import { IconPointerSearch } from "@tabler/icons-react";

type DemoSearchProps = {
  handleDemoSearch: (query: string) => void;
};

export default function DemoSearch({ handleDemoSearch }: DemoSearchProps) {
  return (
    <Box className={classes.wrapper}>
      <Text className={classes.demoText}>Try this:</Text>
      <Button
        variant="outline"
        leftSection={<IconPointerSearch size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() =>
          handleDemoSearch("How to build a neural search service with Qdrant?")
        }
      >
        How to build a neural search service with Qdrant?
      </Button>
      <Button
        variant="outline"
        leftSection={<IconPointerSearch size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() => handleDemoSearch("Who wrote GSoC Web UI blog?")}
      >
        Who wrote GSoC Web UI blog?
      </Button>
      <Button
        variant="outline"
        leftSection={<IconPointerSearch size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() => handleDemoSearch("What is neural search?")}
      >
        What is neural search?
      </Button>
    </Box>
  );
}
