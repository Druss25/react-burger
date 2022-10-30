import { baseUrl } from "./constants";

export const requestFetch = async (
  url: string,
  method: string = "GET",
  params?: unknown
) => {
  let options = undefined;
  if (params) {
    options = {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(params),
    };
  }

  try {
    const res = await fetch(`${baseUrl}${url}`, options);
    if (res.ok && res.status === 200) {
      const data = await res?.json();
      return data;
    } else {
      return;
    }
  } catch {
    return;
  }
};
