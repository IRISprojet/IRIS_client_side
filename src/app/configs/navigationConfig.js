import i18next from "i18next";

import authRoles from "../auth/authRoles";

const navigationConfig = [
  {
    id: "dashboards",
    title: "Home",
    subtitle: "Unique dashboard designs",
    type: "item",
    icon: "heroicons-outline:home",
    url: "/apps/help-center",
  },
  // {
  //   id: "dashboards.project",
  //   title: "Clubs",
  //   type: "item",
  //   icon: "heroicons-outline:globe-alt",
  //   url: "/dashboards/project",
  // },
  {
    id: "apps.academy",
    title: "internship",
    type: "item",
    icon: "heroicons-outline:academic-cap",
    url: "/apps/academy",
  },
  // {
  //   id: "apps.calendar",
  //   title: "Calendar",
  //   subtitle: "3 upcoming events",
  //   type: "item",
  //   icon: "heroicons-outline:calendar",
  //   url: "/apps/calendar",
  // },
  {
  id: "apps.forum",
  title: "Event",
  type: "item",
  icon: "heroicons-outline:chat",
  url: "/apps/forum",
},
  {
    id: "apps.chat",
    title: "Chat",
    type: "item",
    icon: "heroicons-outline:chat-alt",
    url: "/apps/chat",
  },
  {
    id: "apps.forum",
    title: "Forum",
    type: "item",
    icon: "heroicons-outline:user-group",
    url: "/apps/profile",
  },
  {
    id: "apps.notes",
    title: "Notes",
    type: "item",
    icon: "heroicons-outline:pencil-alt",
    url: "/apps/notes",
  },
  
];

export default navigationConfig;
