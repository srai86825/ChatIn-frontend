import React from "react";
import { Avatar } from "../common";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalContext } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatHeader() {

  const {
    state: { currentChatUser },
    dispatch,
  } = useGlobalContext();

  const handleVoiceCall=()=>{
    // console.log("socket at video call",socket.current);
    dispatch({
      type:reducerCases.SET_VOICE_CALL,
      voiceCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"voice",
        roomId:Date.now(),
      }
    })
  }

  const handleVideoCall=()=>{
    dispatch({
      type:reducerCases.SET_VIDEO_CALL,
      videoCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"video",
        roomId:Date.now(),
      }
    })
  }

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex justify-center items-center gap-6">
        <Avatar type="sm" image={currentChatUser?.image} />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            {currentChatUser?.name || "Unknown User"}
          </span>
          <span className="text-secondary">online</span>
        </div>
      </div>
      <div className="flex gap-6 ">
        <MdCall onClick={handleVoiceCall} className="text-panel-header-icon cursor-pointer text-xl" />
        <IoVideocam onClick={handleVideoCall} className="text-panel-header-icon cursor-pointer" />
        <BiSearchAlt2
          onClick={() =>
            dispatch({ type: reducerCases.MESSAGE_SEARCH_APPLIED })
          }
          className="text-panel-header-icon cursor-pointer"
        />
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer" />
      </div>
    </div>
  );
}

export default ChatHeader;
