import React, { useEffect, useState } from "react";
import { ChatListHeader, ContactsList, List, SearchBar } from ".";
import { useGlobalContext } from "@/context/StateContext";

function ChatList() {
  const {
    state: { contactsPage },
  } = useGlobalContext();
  const [pageType, setPageType] = useState("default-page");

  useEffect(() => {
    if (!contactsPage) {
      setPageType("default-page");
    } else {
      setPageType("all-contacts");
    }
    // console.log(contactsPage,pageType);
  }, [contactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
      <ChatListHeader />
      {pageType === "default-page" && (
        <>
          <SearchBar isContactPage />
          <List />
        </>
      )}
      {pageType === "all-contacts" && (
        <>
          <ContactsList />
        </>
      )}
    </div>
  );
}

export default ChatList;
