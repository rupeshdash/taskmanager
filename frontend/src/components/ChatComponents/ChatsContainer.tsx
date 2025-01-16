import { useEffect } from "react";
import RecieverChat from "./RecieverChat";
import SenderChat from "./SenderChat";
import { getMessages } from "@/Redux/ChatDetails/ChatDetailsActions";
import { useAppDispatch } from "@/Redux/store";
import { useSelector } from "react-redux";

type Props = {};
const chatData = [
  {
    _id: 1,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Hey, how are you?",
    timestamp: "2024-09-26T10:00:00Z",
  },
  {
    _id: 2,
    sender: {
      name: "Bob",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "I'm good! Thanks for asking.",
    timestamp: "2024-09-26T10:01:00Z",
  },
  {
    _id: 3,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Have you completed the project?",
    timestamp: "2024-09-26T10:02:00Z",
  },
  {
    _id: 4,
    sender: {
      name: "Bob",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Not yet, I’m working on it.",
    timestamp: "2024-09-26T10:03:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 4,
    sender: {
      name: "Bob",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Not yet, I’m working on it.",
    timestamp: "2024-09-26T10:03:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
  {
    _id: 5,
    sender: {
      name: "Alice",
      profileImage:
        "https://res.cloudinary.com/task-manager-0/image/upload/v1727164454/ayiuesrjbipxj1cxqbdm.jpg",
    },
    message: "Let me know if you need any help!",
    timestamp: "2024-09-26T10:04:00Z",
  },
];
interface PropType {
  activeUserToChat: {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    lastMessage: string;
  };
}

const ChatsContainer = ({ activeUserToChat }: PropType) => {
  const dispatch = useAppDispatch();
  const chatData = useSelector((state: any) => state.chatData);

  useEffect(() => {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      sender: localStorage.getItem("userId"),
      recipient: activeUserToChat?._id,
    };

    dispatch(getMessages(requestBody, { headers: requestHeader }));
  }, [dispatch]);

  console.log(chatData?.messages);

  return (
    // <section className="flex flex-col justify-end h-[85%] p-5 overflow-y-auto">
    //   {chatData.map((chat) =>
    //     chat.sender.name === "Alice" ? (
    //   <SenderChat
    //     key={chat._id}
    //     sender={chat.sender}
    //     message={chat.message}
    //     timestamp={chat.timestamp}
    //   />
    //     ) : (
    //   <RecieverChat
    //     key={chat._id}
    //     sender={chat.sender}
    //     message={chat.message}
    //     timestamp={chat.timestamp}
    //   />
    //     )
    //   )}
    // </section>
    <div className="flex flex-col justify-end h-[85vh] p-4">
      <div className="overflow-y-auto flex-grow p-4 space-y-4">
        {chatData?.messages.map((chat: any) =>
          chat.sender._id === localStorage.getItem("userId") ? (
            <SenderChat
              key={chat._id}
              sender={chat.sender}
              message={chat.messageContent}
              timestamp={chat.createdAt}
            />
          ) : (
            <RecieverChat
              key={chat._id}
              sender={chat.sender}
              message={chat.message}
              timestamp={chat.timestamp}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChatsContainer;
