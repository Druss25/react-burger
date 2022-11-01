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
      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      // redirect: "follow",
      // referrerPolicy: "no-referrer",
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
