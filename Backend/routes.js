const express = require("express");
const router = express.Router();
const Branch = require("./Model/model");
const EntitySchema = require("./Model/EntitiySchema");

router.post("/add", async (req, res) => {
  const dataArray = req.body;
  const { error } = EntitySchema.validate(dataArray);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const insertedBranch = await Branch.create(dataArray);

    res
      .status(201)
      .json({ message: "Branch data posted successfully", data: insertedBranch });
  } catch (error) {
    console.error("Error posting data:", error);
    res.status(500).json({ error: "Unable to post data" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await Branch.find();
    res.json({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const branchId = req.params.id;

  try {
    const deletedBranch = await Branch.deleteMany({ _id: branchId });

    if (!deletedBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    res.json({ message: "Branch deleted successfully", data: deletedBranch });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ error: "Unable to delete branch" });
  }
});

router.put("/update/:id", async (req, res) => {
  const branchId = req.params.id;
  const updatedBranchData = req.body;
  const { error } = EntitySchema.validate(updatedBranchData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const updatedBranch = await Branch.findByIdAndUpdate(
      branchId,
      updatedBranchData,
      { new: true }
    );

    if (!updatedBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json({ message: "Branch updated successfully", data: updatedBranch });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ error: "Unable to update branch" });
  }
});

module.exports = router;
