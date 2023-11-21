import { ActionIcon, Box, TextInput } from "@mantine/core";
import classes from "./InputSearch.module.css";
import useMountedState from "@/hooks/useMountedState";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";

type InputSearchProps = {
  handleInputSearch: (query: string) => void;
  loading: boolean;
};

export default function InputSearch({ handleInputSearch,loading }: InputSearchProps) {
  const [query, setQuery] = useMountedState("");

  const onEnter = () => {
    if (query) {
      handleInputSearch(query);
    }
  };

  useHotkeys([
    [
      "/",
      () => {
        const input = document.querySelector("input");
        input?.focus();
      },
    ],
  ]);
  return (
    <Box className={classes.inputBox}>
      <TextInput
        placeholder="Type your message here..."
        value={query}
        required
        w={"100%"}
        onChange={(event: any) => setQuery(event.currentTarget.value)}
        onKeyDown={getHotkeyHandler([["Enter", onEnter]])}
        pr={"xs"}
        size="md"
        radius={"md"}
      />
      <ActionIcon
        variant="transparent"
        onClick={onEnter}
        color="#63727C"
        size={"md"}
        disabled={loading}
      >
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
          ></path>
        </svg>
      </ActionIcon>
    </Box>
  );
}
