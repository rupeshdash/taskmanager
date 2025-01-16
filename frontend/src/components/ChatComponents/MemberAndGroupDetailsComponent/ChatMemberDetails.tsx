import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
interface PropType {
  setShowMemberDetails: Function;
}
const ChatMemberDetails = ({ setShowMemberDetails }: PropType) => {
  return (
    <motion.section
      className="w-[20%] bg-white h-full right-0 z-10"
      initial={{ x: "100%" }} // Start from the right
      animate={{ x: 0 }} // Move to the center
      exit={{ x: "100%" }} // Exit to the right
      transition={{ duration: 0.5, ease: "easeInOut" }} // Transition settings
    >
      {/* Section content goes here */}
      <button
        onClick={() => {
          setShowMemberDetails(false);
        }}
        className="absolute mt-2  right-2"
      >
        <XIcon />
      </button>
    </motion.section>
  );
};

export default ChatMemberDetails;
