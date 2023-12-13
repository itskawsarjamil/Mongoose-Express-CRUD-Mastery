export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrder[];
};

/**
 *
userId (number): A unique identifier for the user.

username (string): Denotes the user's unique username, ensuring uniqueness across the system.

password (string): Represents the user's password. The password is securely stored in hashed form, utilizing the bcrypt algorithm for hashing.

fullName (object): An object containing the first and last name of the user.

firstName (string): The first name of the user.

lastName (string): The last name of the user.

age (number): The age of the user.

email (string): The email address of the user.

isActive (boolean): A flag indicating whether the user is active or not.

hobbies (array of strings): An array containing the hobbies of the user.

address (object): An object containing the street, city, and country of the user's address.

street (string): The street of the user's address.

city (string): The city of the user's address.

country (string): The country of the user's address.

orders (array of objects): An array containing the orders of the user.

productName (string): The name of the product in the order.

price (number): The price of the product in the order.

quantity (number): The quantity of the product in the order.
 */
