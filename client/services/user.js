import fetch from 'isomorphic-unfetch';
import {
  DEFAULT_HEADER, buildResponse, buildPath, buildHeader,
} from './helper';
import { EditPayload } from './Types/User';

export function registerUser(firstName, lastName, phoneNumber, email, password) {
  const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    password,
  };
  return fetch(buildPath('/api/v1/user'), {
    method: 'POST',
    headers: DEFAULT_HEADER,
    body: JSON.stringify(payload),
  }).then(buildResponse);
}

export function loginUser(email, password) {
  const payload = {
    email,
    password,
  };
  return fetch(buildPath('/api/v1/user/auth'), {
    method: 'POST',
    headers: DEFAULT_HEADER,
    body: JSON.stringify(payload),
  }).then(buildResponse);
}

export function getUserData(id) {
  return fetch(buildPath(`/api/v1/user/${id}`), {
    headers: DEFAULT_HEADER,
  }).then(buildResponse);
}

export function editUser(editPayload: EditPayload, accessToken: string) {
  const formData = new FormData();
  if (editPayload.firstName) {
    formData.append('first_name', editPayload.firstName);
  }
  if (editPayload.lastName) {
    formData.append('last_name', editPayload.lastName);
  }
  if (editPayload.phoneNumber) {
    formData.append('phone_number', editPayload.phoneNumber);
  }
  if (editPayload.password) {
    formData.append('password', editPayload.password);
  }
  if (editPayload.email) {
    formData.append('email', editPayload.email);
  }
  if (editPayload.profilePicture) {
    formData.append('profile_picture', editPayload.profilePicture, editPayload.profilePicture.name);
  }
  return fetch(buildPath(`/api/v1/user/${editPayload.userId}`), {
    method: 'PUT',
    body: formData,
    headers: buildHeader(accessToken, true),
  }).then(buildResponse);
}
