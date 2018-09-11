export const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
  Accept: 'applicattion/json',
};

export function buildResponse(response: Response) {
  return response.json();
}

export function buildPath(path) {
  if (process.env.NODE_ENV !== 'production') {
    return path;
  }
  return path;
}

export function buildHeader(accessToken: string, useFormDataInstead: boolean) {
  if (useFormDataInstead) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return {
    ...DEFAULT_HEADER,
    Authorization: `Bearer ${accessToken}`,
  };
}
