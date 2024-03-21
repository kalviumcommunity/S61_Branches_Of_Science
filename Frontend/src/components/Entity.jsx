import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

const Entity = () => {
  const [fetchedData, setFetchedData] = useState(null)

  
  useEffect(() => {
    fetch("https://s61-branches-of-science-1.onrender.com/api/data").then((res) => res.json()).then((something) => setFetchedData(something.data));
  },[])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
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
          <div style={{ fontSize: "40px", padding:'10px' }}>{data["ID"]}</div>
          <div style={{padding: '10px', fontSize: '20px', fontWeight: 'bold'}}>{data["Title"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Toughness: {data["Toughness"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Required basics: {data["Needed Basics"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Popularity: {data["Popularity"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Time needed: {data["Time takes"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Overall grade: {data["Overall grade"]}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>{data["Description"]}</div>
        </CardContent>
      </Card>
        ))
      }
    </div>
  );
};

export default Entity;
