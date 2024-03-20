import { CardContent } from "@mui/material";
import data from "../../data.json";
import Card from "@mui/material/Card";

const Entity = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#ffffff",
          width: "35%",
          height: "75%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <CardContent>
          <div style={{ fontSize: "40px", padding:'10px' }}>{data.id}</div>
          <div style={{padding: '10px', fontSize: '20px', fontWeight: 'bold'}}>{data.title}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Toughness: {data.toughness}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Required basics: {data.neededBasics}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Popularity: {data.popularity}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Time needed: {data.timeTaken}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>Overall grade: {data.overallGrade}</div>
          <div style={{padding: '10px', fontSize: '20px'}}>{data.description}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Entity;
