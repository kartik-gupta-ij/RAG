import { Box, Text } from "@mantine/core";
import classes from "./UserMessage.module.css";

type userMessageProps = {
  query: string;
  timestamp: Date;
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

export default function UserMessage({ query, timestamp }: userMessageProps) {
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
            d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
          ></path>
          <path
            fill="currentColor"
            d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
          ></path>
        </svg>
      </span>
      <Text size="sm" color="neutral.6">
        {query}
      </Text>
      <Text size="xs" color="neutral.6" ta={"end"} mt={"xs"}>
        {formatAMPM(timestamp)}
      </Text>
    </Box>
  );
}
