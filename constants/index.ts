export const headerLinks = [
  {
    label: "Home",
    route: "/",
    isAuth: false,
  },
  {
    label: "My Tickets",
    route: "/tickets",
    isAuth: true,
  },
  {
    label: "Create Event",
    route: "/events/create",
    isAuth: true,
  },
  {
    label: "About",
    route: "/about",
    isAuth: false,
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};
