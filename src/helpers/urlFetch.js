// Use GET verb to fetch data from DB by url request
export const get = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

// Use POST verb to store data into DB by url request
export const post = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};
