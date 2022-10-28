export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = {
      info: await res.json(),
      status: res.status,
    };

    throw error;
  }

  return res.json();
};
