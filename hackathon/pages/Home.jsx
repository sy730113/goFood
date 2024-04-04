
import { useEffect, useState } from "react";
import Header from "../src/components/header";
import Card from "../src/components/card";
import Footer from "../src/components/footer";
import { Carousel } from "react-bootstrap";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = foodItem.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.CategoryName.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    // Reset search results when search input is empty
    if (search.trim() === "") {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <>
      <Header />

      <div
        className="input-group"
        style={{
          position: "absolute",
          top: "350px",
          left: "25%",
          width: "50%",
          zIndex: "999",
        }}
      >
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            border: "1px solid black",
            width: "20%",
            marginRight: "10px",
            background: "white",
            color:"black"
          }}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          data-mdb-ripple-init
          onClick={handleSearch}
          style={{
            borderRadius: "6px",
          }}
        >
          Search
        </button>
      </div>

      <Carousel>
        <Carousel.Item style={{ objectFit: "contain" }}>
          <img
            className="d-block w-100"
            src="dogCat.jpg"
            height={400}
            width={800}
            alt="First slide"
            style={{ filter: "brightness(50%)" }}
          />
        </Carousel.Item>
        <Carousel.Item style={{ objectFit: "contain" }}>
          <img
            className="d-block w-100"
            src="aeroplane.jpg"
            height={400}
            width={800}
            alt="Second slide"
            style={{ filter: "brightness(50%)" }}
          />
        </Carousel.Item>
        <Carousel.Item style={{ objectFit: "contain" }}>
          <img
            className="d-block w-100"
            src="ladyImage.jpg"
            height={400}
            width={800}
            alt="Third slide"
            style={{ filter: "brightness(50%)" }}
          />
        </Carousel.Item>
      </Carousel>

      <div className="container">
        {searchResults.length > 0 ? (
          <div className="row mb-3">
            {searchResults.map((item) => (
              <div key={item._id} className="col-12 col-md-6 col-lg-3">
                <Card
                  foodItem={item}
                  options={item.options[0]}
              
                />
              </div>
            ))}
          </div>
        ) : (
          foodCat !== null &&
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3"> {data.CategoryName}</div>
              <hr />
              {foodItem !== null
                ? foodItem
                    .filter(
                      (item) => item.CategoryName === data.CategoryName
                    )
                    .map((filterItem) => (
                      <div
                        key={filterItem._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodItem={filterItem}
                          options={filterItem.options[0]}
                         
                        />
                      </div>
                    ))
                : null}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}