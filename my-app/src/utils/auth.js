export const isLoggedIn = () => {
  return document.cookie.includes("jwt"); // or use localStorage if not using cookies
};
