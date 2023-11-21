import { Box, Button, Text } from "@mantine/core";
import classes from "./DemoSearch.module.css";
import { IconSend } from "@tabler/icons-react";

type DemoSearchProps = {
  handleInputSearch: (query: string) => void;
  loading: boolean;
};

export default function DemoSearch({
  handleInputSearch,
  loading,
}: DemoSearchProps) {
  return (
    <Box className={classes.wrapper}>
      <Text className={classes.demoText}>Try this:</Text>
      <Button
        variant="default"
        radius={"md"}
        leftSection={<IconSend size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() =>
          handleInputSearch("How to build a neural search service with Qdrant?")
        }
        disabled={loading}
      >
        How to build a neural search service with Qdrant?
      </Button>
      <Button
        variant="default"
        radius={"md"}
        leftSection={<IconSend size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() =>
          handleInputSearch("Who wrote the blog of GSoC Web UI? and when?")
        }
        disabled={loading}
      >
        Who wrote the blog of GSoC Web UI? and when?
      </Button>
      <Button
        variant="default"
        radius={"md"}
        leftSection={<IconSend size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() =>
          handleInputSearch("How Binary quantization works in Qdrant?")
        }
        disabled={loading}
      >
        How Binary quantization works in Qdrant?
      </Button>
      <Button
        variant="default"
        radius={"md"}
        leftSection={<IconSend size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() => handleInputSearch("Why do Qdrant collects telemetry?")}
        disabled={loading}
      >
        Why do Qdrant collects telemetry?
      </Button>
      <Button
        variant="default"
        radius={"md"}
        leftSection={<IconSend size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() =>
          handleInputSearch(
            "My search results contain vectors with null values. Why?"
          )
        }
        disabled={loading}
      >
        My search results contain vectors with null values. Why?
      </Button>
      <Button
        variant="default"
        radius={"md"}
        leftSection={<IconSend size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() =>
          handleInputSearch(
            "Does Qdrant support a full-text search or a hybrid search?"
          )
        }
        disabled={loading}
      >
        Does Qdrant support a full-text search or a hybrid search?
      </Button>
    </Box>
  );
}
