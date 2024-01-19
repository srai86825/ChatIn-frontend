import { useGlobalContext } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef } from "react";
import { MessageStatus } from "../common";
import countEmojis from "@/utils/countEmojis";
import { ImageMessage, VoiceMessage } from ".";

function ChatContainer() {
  const {
    state: { messages, currentChatUser, userInfo, unreadMessages },
    dispatch,
  } = useGlobalContext();

  useEffect(() => {
    const scrollBottom = () => {
      const container = document.getElementById("chat-container");
      container.classList.add("scroll-smooth");
      container.scrollTop =
        document.getElementById("messages-container").offsetHeight;
      container.classList.remove("scroll-smooth");
    };
    scrollBottom();
    // setTimeout(scrollBottom,600)
  }, [currentChatUser, messages]);

  return (
    <div
      id="chat-container"
      className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar"
    >
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 left-0">
        <div className="flex w-full">
          <div
            id="messages-container"
            className="flex flex-col justify-end w-full gap-1 overflow-y-auto"
          >
            {messages?.map((msg, i) => {
              const totalEmojis = countEmojis(msg.message);

              return (
                <div
                  style={{ transition: "background-color 2s ease-in-out" }}
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === currentChatUser.id
                      ? "justify-start"
                      : "justify-end"
                  } bg-opacity-90 w-auto`}
                  id={msg.id}
                >
                  {msg.type === "text" && (
                    <div
                      className={`text-white px-2 cursor-text py-[5px] ${
                        msg.message.length <= 6 &&
                        totalEmojis * 2 == msg.message.length
                          ? "text-4xl"
                          : "text-sm"
                      } rounded-md flex gap-2 items-end max-w-[65%] ${
                        msg.id === currentChatUser.id
                          ? "bg-incoming-background"
                          : "bg-outgoing-background"
                      }`}
                    >
                      <span className="break-all">{msg.message}</span>
                      <div className="flex gap-1 items-end">
                        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                          {calculateTime(msg.createdAt)}
                        </span>
                        <span>
                          {msg.senderId === userInfo.id && (
                            <MessageStatus messageStatus={msg.messageStatus} />
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  {msg.type === "image" && <ImageMessage msg={msg} />}
                  {msg.type === "audio" && <VoiceMessage msg={msg} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
