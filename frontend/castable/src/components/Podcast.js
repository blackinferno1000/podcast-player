import { useEffect, useState } from "react";

export default function Podcast() {
  const [loading, setLoading] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState({});
  const [currentSource, setCurrentSource] = useState("");
  useEffect(() => {
    setLoading(true);
    fetch(`/api/get_podcast?podcast=${window.location.pathname.substring(1)}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentPodcast(data);
        console.log(data);
      });
    setLoading(false);
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
          {currentPodcast.episodes && (
            <div className="col p-2">
              <img src={currentPodcast.thumbnail} alt={currentPodcast.title} />
              <h1 className="display-5">{currentPodcast.title}</h1>
              <p className="h3">{currentPodcast.description}</p>
              <p className="h5">
                Number of episodes: {currentPodcast.total_episodes}
              </p>
              <p className="h5">Publisher: {currentPodcast.publisher}</p>

              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Episodes
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show p-2"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body row">
                      {currentPodcast.episodes.map((episode) => (
                        <Episode
                          thumbnail={episode.thumbnail}
                          title={episode.title}
                          key={episode.id}
                          function={setCurrentSource}
                          audio={episode.audio}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Episode(props) {
  return (
    <div
      className="col p-2"
      // onClick={() => {
      //   props.function(props.audio);
      //   console.log("clicked");
      // }}
    >
      <img src={props.thumbnail} className="" alt={props.title} />
      <p>{props.title}</p>
      <audio controls>
        <source src={props.audio} type="audio/mpeg" />
      </audio>
    </div>
  );
}
