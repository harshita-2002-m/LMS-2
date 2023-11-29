import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://danville.pythonanywhere.com/api";
// const baseUrl = "http://127.0.0.1:8000/api";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryData, setcategoryData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        setcategoryData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //const categories = [{ id: 1, name: "" }];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // Display a pop-up message when the search term is empty or only contains whitespace
      alert("Item not valid");
      return;
    }

    // Check if the entered text matches any of the category names
    if (
      !categoryData.some(
        (category) =>
          category.categoryName.toLowerCase() === searchTerm.toLowerCase()
      )
    ) {
      // Display a pop-up message when the category is not found
      alert("Category is not found");
      return;
    }

    const filtered = categoryData.filter((category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCategories(filtered);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 d-flex flex-wrap">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "850px" }}
            />
          </div>

          <div className="search-button">
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-15">
          <div className="d-flex flex-wrap">
            {filteredCategories.length === 0
              ? categoryData.map((category) => (
                  <div
                    key={category.id}
                    className="card courseDashboardCard m-2"
                  >
                    <a href={`/Student/courses/${category.id}`}>
                      <img
                        src={`https://source.unsplash.com/1800x1800/?course&${category.id}`}
                        className="card-img-top"
                        alt="#"
                      />
                    </a>

                    <div className="card-body">
                      <h5 className="card-title">
                        <a
                          href={`/Student/courses/${category.id}`}
                          className="buttn btn-primary btn-color"
                        >
                          {category.categoryName}
                        </a>
                      </h5>
                    </div>
                  </div>
                ))
              : filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="card courseDashboardCard m-2"
                  >
                    <a href={`/Student/courses/${category.id}`}>
                      <img
                        src={`https://source.unsplash.com/1800x1800/?course&${category.id}`}
                        className="card-img-top"
                        alt="#"
                      />
                    </a>

                    <div className="card-body">
                      <h5 className="card-title">
                        <a
                          href={`/Student/courses/${category.id}`}
                          className="buttn btn-primary btn-color"
                        >
                          {category.categoryName}
                        </a>
                      </h5>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
