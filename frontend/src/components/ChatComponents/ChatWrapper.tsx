import { useState } from "react";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";
import ChatMemberSection from "./ChatMembersComponents/ChatMemberSection";
import ChatSection from "./ChatSection";
import { AnimatePresence } from "framer-motion";
import ChatMemberDetails from "./MemberAndGroupDetailsComponent/ChatMemberDetails";
import Particles from "../magicui/particles";

const ChatWrapper = () => {
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const [activeUserToChat, setActiveUserToChat] = useState<{
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  }>({ _id: "", email: "", name: "", avatar: "", lastMessage: "" });
     const [color, setColor] = useState("#5051F9");

  return (
    // <div className="page-wrapper">
    //   <Navigation />
    //   <div className="inner-wrapper pt-12">
    //     {" "}
    //     <Header />
    //     {/* parent */}
    //     <section className="flex w-full h-full">
    //       {/* chat members section */}
    //       <ChatMemberSection
    //         activeUserToChat={activeUserToChat}
    //         setActiveUserToChat={setActiveUserToChat}
    //       />

    //       {/* chat section */}
    //       { activeUserToChat?._id ? <ChatSection
    //         activeUserToChat={activeUserToChat}
    //         setShowMemberDetails={setShowMemberDetails}
    //       /> : <></>}

    //       {/* member/group details section */}
    //       <AnimatePresence>
    //         {showMemberDetails && (
    //           <ChatMemberDetails setShowMemberDetails={setShowMemberDetails} />
    //         )}
    //       </AnimatePresence>
    //     </section>
    //   </div>
    // </div>
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper pt-0">
        {" "}
        <Header />
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Coming Soon...
          </span>
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={color}
            refresh
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
