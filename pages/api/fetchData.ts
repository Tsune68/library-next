export const fetchData = async (url: string, method: string, data?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.json();

  return {
    ok: response.ok,
    data: responseData,
  };
};
