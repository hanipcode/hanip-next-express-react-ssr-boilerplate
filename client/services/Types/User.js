export type UserReturnType = {
  first_name: string,
  last_name: string,
  email: string,
  accessToken: string,
  phone_number: string,
};

export type EditPayload = {
  userId: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  phoneNumber?: string,
  profilePicture?: File,
};
