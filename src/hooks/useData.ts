import { useState, useEffect } from "react";
import axios from "axios";

function useData(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
}

export default useData;
