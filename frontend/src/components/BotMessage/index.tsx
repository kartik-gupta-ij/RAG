import { Box, Button, Center, Loader, Text } from "@mantine/core";
import classes from "./BotMessage.module.css";
import useMountedState from "@/hooks/useMountedState";

type BotMessageProps = {
  timestamp: Date;
  context: string;
  name: string;
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
  name,
  context,
  timestamp,
  loading,
}: BotMessageProps) {
  const [isTruncated, setIsTruncated] = useMountedState(
    context.length > TRUNCATION_LIMIT
  );
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
          <Text size="md" color="neutral.7">
            {name}
          </Text>
          <Text
            size="sm"
            color="neutral.6"
            lineClamp={isTruncated ? 4 : undefined}
          >
            {context}
          </Text>
          {isTruncated && (
            <Button
              variant="transparent"
              p={0}
              onClick={() => setIsTruncated(false)}
            >
              Read More
            </Button>
          )}
          <Text size="xs" color="neutral.6">
            {formatAMPM(timestamp)}
          </Text>
        </>
      )}
    </Box>
  );
}
