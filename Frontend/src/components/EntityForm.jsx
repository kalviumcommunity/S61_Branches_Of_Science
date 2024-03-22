import axios from "axios";
import { useState } from "react";

const EntityForm = ({ onAddEntity }) => {
  const [formData, setFormData] = useState({
        "ID": 0,
        "Title": '',
        "Toughness": 0,
        "Needed basics": [],
        "Popularity": 0,
        "Time takes": '',
        "Overall grade": 0,
        "Description": '',
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
      const response = await axios.post(
        "https://s61-branches-of-science-1.onrender.com/api/add",
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
      });
    } catch (error) {
      console.error("Error adding entity:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            name="ID"
            value={formData["ID"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="Title"
            value={formData["Title"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Toughness:</label>
          <input
            type="number"
            name="Toughness"
            value={formData["Toughness"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Needed Basics:</label>
          <input
            type="text"
            name="Needed basics"
            value={formData["Needed basics"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Popularity:</label>
          <input
            type="number"
            name="Popularity"
            value={formData["Popularity"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time takes:</label>
          <input
            type="text"
            name="Time takes"
            value={formData["Time takes"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Overall grade:</label>
          <input
            type="number"
            name="Overall grade"
            value={formData["Overall grade"]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="Description"
            value={formData["Description"]}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
};

export default EntityForm;