import { USER_URL } from "./constants";

export const fetchUsers = async () => {
  const response = await fetch(USER_URL);
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  return await response.json();
};
