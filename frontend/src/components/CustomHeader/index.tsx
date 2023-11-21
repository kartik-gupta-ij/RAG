import {
  Container,
  Group,
  Button,
  Modal,
  Title,
  Text,
  Image,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./CustomHeader.module.css";
import { Logo } from "../Logo";
import { IconBrandGithub } from "@tabler/icons-react";

export function CustomHeader() {
  const [opened, handlers] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size={"xl"} className={classes.inner}>
        <Logo size={35} />
        <Group gap={5} wrap="nowrap">
          <Button variant="transparent" color="#54646F" onClick={handlers.open}>
            How does it work?
          </Button>
          <ActionIcon variant="transparent" color="#54646F">
            <IconBrandGithub />
          </ActionIcon>
        </Group>
      </Container>
      <Modal opened={opened} onClose={handlers.close} centered size={"lg"}>
        <Modal.Header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title className={classes.modalHeader}>
            How does{" "}
            <Text component="span" className={classes.highlight} inherit>
              Semantic search
            </Text>{" "}
            work?
          </Title>
          <Text className={classes.subHeading}>
            This demo uses code of qdrant repo to perform a semantic search.
          </Text>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text size="lg" color="dimmed" className={classes.description}>
            The search page will allow users to search for code snippets using
            natural language. The text input will be converted into a vector
            representation using advanced machine learning techniques. This
            vector will then be used to semantically search a code snippet
            database, retrieving similar code based on its meaning and
            functionality.
          </Text>

          <Image src="/workflow.svg" />
          <Text size="lg" color="dimmed" className={classes.description}>
            The search results will display code snippets that are most relevant
            to the user's query, ranked by their similarity to the input text.
            Users can view and compare the retrieved code snippets to find the
            one that best suits their needs. This approach to code search aims
            to improve the efficiency and accuracy of finding relevant code by
            leveraging advanced natural language processing and machine learning
            algorithms.
          </Text>
          <Button
            className={classes.modalBtnInner}
            radius={30}
            size={"md"}
            variant="filled"
            color="Primary.2"
            onClick={handlers.close}
          >
            Get started
          </Button>
        </Modal.Body>
      </Modal>
    </header>
  );
}
