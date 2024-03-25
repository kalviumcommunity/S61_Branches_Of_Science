import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import EntityForm from "./EntityForm";
import axios from "axios";
import UpdateEntity from "./UpdateEntity";

const Entity = () => {
  const [fetchedData, setFetchedData] = useState(null)

  
  useEffect(() => {
    fetch("https://s61-branches-of-science-1.onrender.com/api/data").then((res) => res.json()).then((something) => setFetchedData(something.data.reverse()));
  },[])

  const handleAddEntity = (newData) => {
    setFetchedData((prevData) => (prevData ? [...prevData, newData] : [newData]));
    window.location.reload();
  };

  const handleDelete = (id) => {
    axios.delete(`https://s61-branches-of-science-1.onrender.com/api/remove/${id}`).then(() => {setFetchedData(fetchedData.filter((data) => data._id!== id))})
  }

  const handleUpdate = (id, newData) => {
    axios.put(`https://s61-branches-of-science-1.onrender.com/api/update/${id}`, newData).then(() => {setFetchedData(fetchedData.map((data) => data._id === id? newData : data))})
  }

  console.log(fetchedData)

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
      {
        fetchedData && fetchedData.map((data) => (
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
          <div style={{ fontSize: "40px", padding:'10px' }}>{data["ID"]}</div>
          <div style={{padding: '10px', fontSize: '20px', fontWeight: 'bold'}}>{data["Title"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Toughness: {data["Toughness"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Required basics: {JSON.parse(`[${JSON.stringify(data["Needed basics"])}]`).map((el) => (el + " "))}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Popularity: {data["Popularity"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Time needed: {data["Time takes"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Overall grade: {data["Overall grade"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>{data["Description"]}</div>
        </CardContent>
        <button onClick={() => handleDelete(data._id)}>delete</button>
      </Card>
        ))
      }
    </div>
  );
};

export default Entity;
