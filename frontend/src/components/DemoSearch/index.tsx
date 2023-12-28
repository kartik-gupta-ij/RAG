import { Box, Button, Text } from "@mantine/core";
import classes from "./DemoSearch.module.css";
import { IconSend } from "@tabler/icons-react";

type DemoSearchProps = {
  handleInputSearch: (query: string) => void;
  loading: boolean;
};

const demoQueries = [
  "I have a server timeout error ",
  "I am a student from India and looking for AI projects to contribute, I like qdrant but I am having problem with timeout error.",
  "What is qdrant?",
  "How to install qdrant?",
  "How to deploy qdrant?",
  "How to use qdrant?",
  "How Binary quantization works in Qdrant?",
  "Why do Qdrant collects telemetry?",
  "Who wrote the blog of GSoC Web UI? and when?",
  "How to build a neural search service with Qdrant?",
  "My search results contain vectors with null values. Why?",
  "Does Qdrant support a full-text search or a hybrid search?",
];

export default function DemoSearch({
  handleInputSearch,
  loading,
}: DemoSearchProps) {
  return (
    <Box className={classes.wrapper}>
      <Text className={classes.demoText}>Try this:</Text>
      {demoQueries.map((query, index) => (
        <Button
          variant="default"
          radius={"md"}
          leftSection={<IconSend size={"1.3rem"} />}
          className={classes.demoBtn}
          onClick={() => handleInputSearch(query)}
          disabled={loading}
          key={index}
        >
          {query}
        </Button>
      ))}
    </Box>
  );
}
