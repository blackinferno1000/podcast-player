import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState("");
  const [currentPodcast, setCurrentPodcast] = useState({});

  const getGenres = () => {
    let checked = [];
    let genres = "";
    document.querySelectorAll("input[type='checkbox']").forEach((box) => {
      if (box.checked) checked.push(box);
    });
    checked.forEach((genre) => {
      genres += `${genre.value},`;
    });
    genres.slice(0, -1);
    setGenres(genres);
    console.log(genres);
  };

  useEffect(() => {}, []);
  return (
    <main>
      <div className="container">
        <div className="row align-items-center justify-content-center p-2">
          <div className="col-10">
            <form action="/api/search" method="GET">
              <div className="row justify-content-center p-2">
                <div className="form-floating mb-3 col-10">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Search for a podcast..."
                  ></input>
                  <label htmlFor="floatingInput">Search for a podcast...</label>
                </div>
                <button
                  type="submit"
                  onMouseEnter={getGenres}
                  className="btn btn-primary col-2 mb-3"
                >
                  Search
                </button>
              </div>
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
                      Genres
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show p-2"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body row">
                      <Checkbox value="144" name="Personal Finance" />
                      <Checkbox value="151" name="Locally Focused" />
                      <Checkbox value="88" name="Health & Fitness" />
                      <Checkbox value="77" name="Sports" />
                      <Checkbox value="68" name="TV & Film" />
                      <Checkbox value="133" name="Comedy" />
                      <Checkbox value="111" name="Education" />
                      <Checkbox value="168" name="Fiction" />
                      <Checkbox value="100" name="Arts" />
                      <Checkbox value="117" name="Government" />
                      <Checkbox value="125" name="History" />
                      <Checkbox value="82" name="Leisure" />
                      <Checkbox value="122" name="Society & Culture" />
                      <Checkbox value="99" name="News" />
                      <Checkbox value="132" name="Kids & Family" />
                      <Checkbox value="69" name="Religion & Spirituality" />
                      <Checkbox value="93" name="Business" />
                      <Checkbox value="107" name="Science" />
                      <Checkbox value="127" name="Technology" />
                      <Checkbox value="135" name="True Crime" />
                      <Checkbox value="134" name="Music" />
                    </div>
                  </div>
                </div>
              </div>
              {loading &&
                ((
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) || (
                  <div className="row cards">
                    <div class="card" style="width: 18rem;">
                      <img src="..." class="card-img-top" alt="..."></img>
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" class="btn btn-primary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function Checkbox(props) {
  return (
    <div className="col-4 form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={props.value}
        id={props.name}
      ></input>
      <label className="form-check-label" htmlFor={props.name}>
        {props.name}
      </label>
    </div>
  );
}
