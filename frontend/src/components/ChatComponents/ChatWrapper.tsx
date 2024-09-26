import { useState } from "react";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import ChatMemberSection from "./ChatMembersComponents/ChatMemberSection";
import ChatSection from "./ChatSection";
import { AnimatePresence } from "framer-motion";
import ChatMemberDetails from "./MemberAndGroupDetailsComponent/ChatMemberDetails";

const ChatWrapper = () => {
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper pt-12">
        {" "}
        <Header />
        {/* parent */}
        <section className="flex w-full h-full">
          {/* chat members section */}
          <ChatMemberSection />

          {/* chat section */}
          <ChatSection setShowMemberDetails={setShowMemberDetails} />

          {/* member/group details section */}
          <AnimatePresence>
            {showMemberDetails && (
              <ChatMemberDetails setShowMemberDetails={setShowMemberDetails} />
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default ChatWrapper;
