import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [nextOffset, setNextOffset] = useState(0);
  const [currentPodcast, setCurrentPodcast] = useState({});

  const getGenres = () => {
    let checked = [];
    let genreList = "";
    document.querySelectorAll("input[type='checkbox']").forEach((box) => {
      if (box.checked) checked.push(box);
    });
    checked.forEach((genre) => {
      genreList += `${genre.value},`;
    });
    genreList.slice(0, -1);
    setGenres(genreList);
    // console.log(genres);
  };
  const handleSearch = () => {
    setSearch(document.querySelector("input[type='text']").value);
    // console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`/api/search?search=${search}&genres=${genres}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
        setNextOffset(data["next_offset"]);
      });
    setLoading(false);
    // console.log(results);
  };

  const setPodcast = (props) => {
    setCurrentPodcast(props.id);
  };

  return (
    <main>
      <div className="container">
        <div className="row align-items-center justify-content-center p-2">
          <div className="col-10">
            <form
              onSubmit={handleSubmit}
              action="http://localhost:5000/api/search"
              method="GET"
              className="mb-2"
            >
              <div className="row justify-content-center p-2">
                <div className="form-floating mb-3 col-10">
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Search for a podcast..."
                    onChange={handleSearch}
                  ></input>
                  <label htmlFor="search">Search for a podcast...</label>
                </div>
                <button
                  type="submit"
                  onMouseEnter={getGenres}
                  // onClick={handleSubmit}
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
            </form>
            <section className="row">
              {!loading &&
                results.map((result) => (
                  <ResultCard
                    thumbnail={result.thumbnail}
                    key={result.id}
                    id={result.id}
                    title={result.title_original}
                    description={result.description_original}
                    function={setPodcast.bind(result.id)}
                  />
                ))}
              {!loading && (
                <div>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={(e) => {
                            if (offset != 0) {
                              setOffset(offset - 1);
                            }
                            handleSubmit(e);
                          }}
                          href="#"
                        >
                          Previous
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={(e) => {
                            setOffset(offset + nextOffset);
                            console.log(offset);
                            handleSubmit(e);
                          }}
                          href="#"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
              {loading && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </section>
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

function ResultCard(props) {
  const [id, setId] = useState(props.id);
  return (
    <div className="col cards p-2">
      <div className="card resultCard" style={{ width: "18rem" }}>
        <img src={props.thumbnail} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <textarea
            style={{ height: "15rem" }}
            className="card-text"
            value={props.description}
            readOnly
          />
          <Link
            to={props.id}
            onClick={props.function}
            className="btn btn-primary"
          >
            Go to podcast
          </Link>
        </div>
      </div>
    </div>
  );
}
