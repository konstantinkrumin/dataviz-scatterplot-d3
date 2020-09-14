import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function timeParse(dataset) {
    dataset.forEach(d => {
      let parsedTime = d.Time.split(":");
      d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    });

    return dataset;
  }

  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    const dataset = await timeParse(json);
    setData(dataset);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
export { useFetch };
