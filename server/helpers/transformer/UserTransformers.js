import _ from 'lodash';
import { buildHost } from '../common';

const USER_INCLUDED_FIELD = [
  '_id',
  'email',
  'first_name',
  'last_name',
  'phone_number',
  'user_location_coordinate',
  'user_location_name',
  'profile_picture',
];

export default (userJSON) => {
  const filteredData = _.pick(userJSON, USER_INCLUDED_FIELD);
  return {
    ...filteredData,
    profile_picture: `${userJSON.profile_picture || 'public/images/default.png'}`,
  };
};
