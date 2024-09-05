type User = {
  email: string;
  password: string;
};

// Define the users array with type annotations
const users: User[] = [
  {
    email: "atapas@email.com",
    password: "password",
  },
  {
    email: "alex@email.com",
    password: "password",
  },
  {
    email: "bob@email.com",
    password: "password",
  },
];

// Function to find a user by email
export const getUserByEmail = (email: string): User | undefined => {
  const found = users.find((user) => user.email === email);
  return found;
};