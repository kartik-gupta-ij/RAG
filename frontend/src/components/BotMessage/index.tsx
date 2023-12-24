import {
  Box,
  Button,
  Center,
  Loader,
  Modal,
  Text,
  ThemeIcon,
} from "@mantine/core";
import classes from "./BotMessage.module.css";
import useMountedState from "@/hooks/useMountedState";
import { searchResponse } from "@/hooks/useGetSearchResult";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowDown,
  IconArrowUp,
  IconExternalLink,
} from "@tabler/icons-react";

type BotMessageProps = {
  timestamp: Date;
  answer: string;
  steps: searchResponse["result"]["steps"];
  loading?: boolean;
};

function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : (minutes as any);
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const TRUNCATION_LIMIT = 1000;

export default function BotMessage({
  answer,
  steps,
  timestamp,
  loading,
}: BotMessageProps) {
  const [opened, { open, close }] = useDisclosure();
  return (
    <Box className={classes.wrapper}>
      <span className={classes.tail}>
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 8 13"
        >
          <path
            opacity="0.13"
            fill="#0000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            fill="currentColor"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </span>

      {loading ? (
        <Center>
          <Loader type="bars" size={"sm"} />
        </Center>
      ) : (
        <>
          <TruncationText>{answer}</TruncationText>

          <Text size="xs" color="neutral.6" mt={"xs"} ta={"end"}>
            {formatAMPM(timestamp)}
          </Text>
          {steps.length > 0 && (
            <Button
              variant="transparent"
              onClick={open}
              fullWidth
              className={classes.viewSteps}
              leftSection={<IconExternalLink />}
            >
              View Steps
            </Button>
          )}
        </>
      )}
      <Modal opened={opened} onClose={close} size={"xl"} centered>
        <Box>
          <Box className={classes.modalHeader}>
            <Text fw={500} size="lg" color="Primary" ta={"center"}>
              Steps which were required to get this answer !
            </Text>
          </Box>
          <Box className={classes.modalContent}>
            {steps.map((step, index) => {
              return (
                <Box className={classes.step} key={index}>
                  <Text size="md" color="neutral.7">
                    {step.name}
                  </Text>
                  <TruncationText>{step.context}</TruncationText>
                  {step.contextArray && <ContextArray step={step} />}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

const TruncationText = ({ children }: { children: string }) => {
  const [isTruncated, setIsTruncated] = useMountedState(
    children.length > TRUNCATION_LIMIT
  );

  return (
    <Box>
      <Text size="sm" color="neutral.6" lineClamp={isTruncated ? 4 : undefined}>
        {children}
      </Text>
      {isTruncated && children.length > TRUNCATION_LIMIT && (
        <Button
          variant="transparent"
          p={0}
          onClick={() => setIsTruncated(false)}
          rightSection={<IconArrowDown />}
        >
          Read More
        </Button>
      )}
      {!isTruncated && children.length > TRUNCATION_LIMIT && (
        <Button
          variant="transparent"
          onClick={() => setIsTruncated(true)}
          rightSection={<IconArrowUp />}
          p={0}
        >
          Read Less
        </Button>
      )}
    </Box>
  );
};

const ContextArray = ({
  step,
}: {
  step: searchResponse["result"]["steps"][0];
}) => {
  if (step.contextArray) {
    return (
      <Box>
        <Text pt={"md"} fw={500} size="sm" color="neutral.7">
          Context Array
        </Text>
        <Box className={classes.contextArray}>
          {step.contextArray.map((context, index: number) => {
            return (
              <Box className={classes.step} key={index}>
                <Button
                  component="a"
                  variant="transparent"
                  href={`https://github.com/qdrant/landing_page/blob/master/${context.metadata.path}`}
                  target="_blank"
                  rightSection={
                    <ThemeIcon
                      variant="transparent"
                      size={30}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <IconExternalLink style={{ width: 18, height: 18 }} />
                    </ThemeIcon>
                  }
                  className={classes.filename}
                >
                  {context.metadata.path}
                </Button>
                <TruncationText>{context.metadata.document}</TruncationText>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
  return null;
};
