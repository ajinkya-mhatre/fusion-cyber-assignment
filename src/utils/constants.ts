export const MENU_ITEMS: {
  name: string;
  link: string;
}[] = [
  {
    name: "Home",
    link: "/home",
  },
  {
    name: "Discover",
    link: "/discover",
  },
  {
    name: "Activities",
    link: "/activities",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
