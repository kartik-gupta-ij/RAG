import {
  Button,
  Container,
  TextInput,
  Box,
  Image,
  Title,
  Text,
  Loader,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import useMountedState from "@/hooks/useMountedState";
import { useGetSearchResult } from "@/hooks/useGetSearchResult";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import classes from "./Main.module.css";
import DemoSearch from "../DemoSearch";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Main() {
  const [query, setQuery] = useMountedState("");
  const { data, getSearch, loading, error, resetData } = useGetSearchResult();
  const [searchParams, setSearchParams] = useSearchParams();

  useHotkeys([
    [
      "/",
      () => {
        const input = document.querySelector("input");
        input?.focus();
      },
    ],
  ]);
  const handleSubmit = () => {
    resetData();
    if (query) {
      getSearch(query);
      setSearchParams({ query });
    }
  };

  const handleDemoSearch = (query: string) => {
    resetData();
    if (query) {
      setSearchParams({ query: query });
      setQuery(query);
      getSearch(query);
    }
  };

  useEffect(() => {
    if (searchParams.get("query") && searchParams.get("query") !== query) {
      handleDemoSearch(searchParams.get("query") ?? "");
    }
  }, [searchParams.get("query")]);

  useEffect(() => {
    if (query === "") {
      resetData();
      window.history.replaceState({}, "", "/");
    }
  }, [query]);

  return (
    <Container size="lg">
      <DemoSearch handleDemoSearch={handleDemoSearch} />

      <TextInput
        radius={4}
        size="md"
        leftSection={<IconSearch color="#102252" />}
        placeholder="Enter a query"
        rightSection={
          <Button
            radius={4}
            w={"100%"}
            size={"md"}
            variant="filled"
            color="Primary.2"
            onClick={handleSubmit}
          >
            Search
          </Button>
        }
        rightSectionWidth={"6rem"}
        value={query}
        pt={"1rem"}
        required
        onChange={(event: any) => setQuery(event.currentTarget.value)}
        onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
        classNames={{ input: classes.input }}
        style={{
          position: "sticky",
          top: 56,
          zIndex: 100,
          backgroundColor: "#fff",
        }}
        ref={(input) => input && input.focus()}
      />
      {data && (
        <Box pt={"1rem"}>
          <Text>Answer: {data.result.answer}</Text>
          {data.result.contexts.map((context) => {
            return (
              <Box>
                <Text>File: {context.metadata.path}</Text>
                <Text>document: {context.metadata.document}</Text>
                <Text>Score: {context.score}</Text>
              </Box>
            );
          })}
        </Box>
      )}
      {!data && !loading && !error && (
        <>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/landing.gif"
              alt="Qdrant Landing"
              maw={400}
              h={400}
              fit="contain"
            />
            <Title order={3} className={classes.heading}>
              Qdrant{" "}
              <span className={classes.headingHighlight}>Code Search</span>{" "}
              Unleashing Semantic Power
            </Title>
            <Text className={classes.subHeading}>
              Qdrant Code Explorer: Empowering Semantic Searching in Qdrant
              Repository with Advanced Code Analysis
            </Text>
          </Box>
        </>
      )}
      {loading && (
        <Box className={classes.loader}>
          <Loader type="bars" />
        </Box>
      )}
      {error && (
        <Box>
          <Image src="/error.gif" alt="Error" h={400} fit="contain" />

          <Text className={classes.subHeading}>
            Something went wrong, {error}
          </Text>
        </Box>
      )}
    </Container>
  );
}
