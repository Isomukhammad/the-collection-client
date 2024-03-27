export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: {
      MAIN: "/profile",
      EDIT: "/profile/edit",
    },
    ADMIN: "/admin",
  },
  COLLECTIONS: {
    MAIN: "/collections",
    COLLECTION: "/collections/:id",
    USERCOLLECTIONS: "/collections/user/:id",
    ADDCOLLECTION: "/collections/add",
  },
  ITEMS: {
    ITEM: "/items/:id",
    ITEMS: "/collections/:id/items",
    ADDITEM: "/collections/:id/add",
  },
};
