import { useEffect, useState } from "react";

export default function Podcast() {
  const [loading, setLoading] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch("/api/get_podcast")
      .then((res) => res.json())
      .then((data) => {
        setCurrentPodcast(data.results);
      });
    setLoading(false);
    console.log(currentPodcast);
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row">
          {loading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
