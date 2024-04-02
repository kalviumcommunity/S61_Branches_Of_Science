import axios from "axios";
import { useState } from "react";

const UpdateEntity = ({ onAddEntity }) => {
  const [formData, setFormData] = useState({
        "ID": 0,
        "Title": '',
        "Toughness": 0,
        "Needed basics": [],
        "Popularity": 0,
        "Time takes": '',
        "Overall grade": 0,
        "Description": '',
        "Mongo_ID": '',
        "created_by": '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == "Needed basics"){
        setFormData((prevData) => ({
         ...prevData,
          [name]: value.split(","),
        }));
    }else{
        setFormData((prevData) => ({
         ...prevData,
          [name]: value,
        }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://s61-branches-of-science-1.onrender.com/api/update/${formData["Mongo_ID"]}`,
        formData
      );
      const newEntity = response.data.data;
      onAddEntity(newEntity);
      setFormData({
        "ID": 0,
        "Title": '',
        "Toughness": 0,
        "Needed basics": [],
        "Popularity": 0,
        "Time takes": '',
        "Overall grade": 0,
        "Description": '',
        "Mongo_ID": '',
        "created_by": '',
      });
    } catch (error) {
      console.error("Error adding entity:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Mongo_ID:</label>
          <input
          type="text"
          name="Mongo_ID"
          value={formData["Mongo_ID"]}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label>ID:</label>
          <input
            type="number"
            name="ID"
            value={formData["ID"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="Title"
            value={formData["Title"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Toughness:</label>
          <input
            type="number"
            name="Toughness"
            value={formData["Toughness"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Needed Basics:</label>
          <input
            type="text"
            name="Needed basics"
            value={formData["Needed basics"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Popularity:</label>
          <input
            type="number"
            name="Popularity"
            value={formData["Popularity"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time takes:</label>
          <input
            type="text"
            name="Time takes"
            value={formData["Time takes"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Overall grade:</label>
          <input
            type="number"
            name="Overall grade"
            value={formData["Overall grade"]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="Description"
            value={formData["Description"]}
            onChange={handleChange}
          />
        </div>
        <div>
        <label>Created by:</label>
        <input
        type="text"
        name="created_by"
        value={formData["created_by"]}
        onChange={handleChange}
        required
        />
        </div>

        <button type="submit">Update Entity</button>
      </form>
    </div>
  );
};

export default UpdateEntity;