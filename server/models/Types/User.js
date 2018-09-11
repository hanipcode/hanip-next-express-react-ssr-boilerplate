export type UserModelType = {
  _id: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  profile_picture: string,
  user_location_coordinate?: string,
  user_location_name?: string,
};

export type UserModelPayload = {
  _id: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  profile_picture: string,
  user_location_coordinate?: string,
  user_location_name?: string,
};
