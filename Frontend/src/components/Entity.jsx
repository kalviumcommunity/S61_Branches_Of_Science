import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import EntityForm from "./EntityForm";
import axios from "axios";
import UpdateEntity from "./UpdateEntity";

const Entity = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredData, setFilteredData] = useState("");
  const [CreatedBy, setCreatedBy] = useState([]);

  useEffect(() => {
    fetch("https://s61-branches-of-science-1.onrender.com/api/data")
      .then((res) => res.json())
      .then((something) => {
        setFetchedData(something.data.reverse());
        const selectedCreatedBy = something.data.reduce((curr, item) => {
          if (!curr.includes(item.created_by)) {
            curr.push(item.created_by);
          }
          return curr;
        }, []);
        setCreatedBy(selectedCreatedBy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddEntity = (newData) => {
    setFetchedData((prevData) =>
      prevData ? [...prevData, newData] : [newData]
    );
    window.location.reload();
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://s61-branches-of-science-1.onrender.com/api/remove/${id}`)
      .then(() => {
        setFetchedData(fetchedData.filter((data) => data._id !== id));
      });
  };

  const handleUpdate = (id, newData) => {
    axios
      .put(
        `https://s61-branches-of-science-1.onrender.com/api/update/${id}`,
        newData
      )
      .then(() => {
        setFetchedData(
          fetchedData.map((data) => (data._id === id ? newData : data))
        );
      });
  };

  const filteredcreatedData = filteredData
    ? fetchedData.filter((item) => item["created_by"] == filteredData)
    : fetchedData;

    console.log(filteredcreatedData);
    console.log(CreatedBy);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <EntityForm onAddEntity={handleAddEntity} />
      <UpdateEntity onAddEntity={handleUpdate} />
      <div>
        <label htmlFor="filteredData">Filter by created by:</label>
        <select
          id="filteredData"
          onChange={(e) => setFilteredData(e.target.value)}
        >
          <option value="">All</option>
          {CreatedBy.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {filteredcreatedData &&
        filteredcreatedData.map((data) => (
          <Card
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              backgroundColor: "#ffffff",
              width: "35%",
              height: "75%",
              display: "flex",
              justifyContent: "space-evenly",
              margin: "25px",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
            key={data["ID"]}
          >
            <CardContent>
              <div>Mongo_ID: {data._id}</div>
              <div style={{ fontSize: "40px", padding: "10px" }}>
                {data["ID"]}
              </div>
              <div
                style={{
                  padding: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {data["Title"]}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                Toughness: {data["Toughness"]}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                Required basics:{" "}
                {JSON.parse(`[${JSON.stringify(data["Needed basics"])}]`).map(
                  (el) => el + " "
                )}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                Popularity: {data["Popularity"]}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                Time needed: {data["Time takes"]}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                Overall grade: {data["Overall grade"]}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                Created by: {data["created_by"]}
              </div>
              <div style={{ padding: "10px", fontSize: "20px" }}>
                {data["Description"]}
              </div>
            </CardContent>
            <button onClick={() => handleDelete(data._id)}>delete</button>
          </Card>
        ))}
    </div>
  );
};

export default Entity;
