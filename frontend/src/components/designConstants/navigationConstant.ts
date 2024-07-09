import {
  chatsIcon,
  settingIcon,
  taskIcon,
  teamNavIcon,
} from "../../assets/Images";

export const NAVIGATION_OBJ = [
  {
    id: "teams",
    title: "Teams",
    icon: teamNavIcon,
    isVisible: true,
    isActive: false,
    isDisable: false,
    path: "/teams",
  },
  {
    id: "tasks",
    title: "Tasks",
    icon: taskIcon,
    isVisible: true,
    isActive: false,
    isDisable: false,
    path: "/tasks",
  },
  {
    id: "setting",
    title: "Setting",
    icon: settingIcon,
    isVisible: true,
    isActive: false,
    isDisable: true,
    path: "/setting",
  },
  {
    id: "chats",
    title: "Chats",
    icon: chatsIcon,
    isVisible: true,
    isActive: false,
    isDisable: true,
    path: "/chats",
  },
];
