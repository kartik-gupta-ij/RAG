import { Box } from "@mantine/core";
import { useGetSearchResult } from "@/hooks/useGetSearchResult";
import classes from "./Main.module.css";
import DemoSearch from "../DemoSearch";
import { CustomHeader } from "../CustomHeader";
import InputSearch from "../InputSearch/Index";
import useMountedState from "@/hooks/useMountedState";
import UserMessage from "../UserMessage";
import React, { useEffect } from "react";
import BotMessage from "../BotMessage";

export default function Main() {
  const { data, getSearch, loading, error, resetData } = useGetSearchResult();
  const scrollContainner = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useMountedState<any[]>([
    {
      query: "Hi",
      sender: "user",
      timestamp: new Date(),
    },
    {
      data: "Greetings, I am an AI engine designed for RAG functionality. Trained on the Qdrant website, how may I be of assistance to you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const handleInputSearch = (query: string) => {
    resetData();
    if (query) {
      const userMessage = {
        query: query,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      getSearch(query);
    }
  };

  useEffect(() => {
    if (data) {
      const botMessage = {
        data: data.result.answer,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([...messages, botMessage]);
      resetData();
    }

    if (error) {
      const botMessage = {
        data: error,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([...messages, botMessage]);
      resetData();
    }
  }, [data, loading,error]);

  useEffect(() => {
    if (scrollContainner.current) {
      scrollContainner.current.scroll({
        top: scrollContainner.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [scrollContainner.current?.scrollHeight, messages, loading, data]);

  return (
    <Box className={classes.main}>
      <CustomHeader />
      <Box className={classes.content} ref={scrollContainner}>
        {messages.map((message, index) => {
          if (message.sender === "user") {
            return (
              <UserMessage
                key={index}
                query={message.query ?? ""}
                timestamp={message.timestamp}
              />
            );
          } else {
            return (
              <BotMessage
                key={index}
                data={message.data}
                timestamp={message.timestamp}
              />
            );
          }
        })}

        {loading && (
          <BotMessage
            loading={loading}
            data={"Loading..."}
            timestamp={new Date()}
          />
        )}
        
      </Box>

      <Box className={classes.footer}>
        <DemoSearch handleInputSearch={handleInputSearch} loading={loading} />
        <InputSearch handleInputSearch={handleInputSearch} loading={loading} />
      </Box>
    </Box>
  );
}
