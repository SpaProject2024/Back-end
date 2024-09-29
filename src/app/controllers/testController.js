import TestApi from "../models/testApi.js";

export const createTest = async (req, res) => {
  const { content, status } = req.body;

  if (!content || !status) {
    return res.status(400).json({ message: "Content and status are required" });
  }

  try {
    const newTest = new TestApi({ content, status });
    await newTest.save();
    res.status(201).json(newTest); 
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create test", error: error.message });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await TestApi.find(); 
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving tests", error: error.message });
  }
};


export const getTestById = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await TestApi.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    return res.status(200).json({ message: "Success", data: test });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving test", error: error.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, status } = req.body;
    const updatedTest = await TestApi.findByIdAndUpdate(
      id,
      { content, status },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res
      .status(200)
      .json({ message: "Test updated successfully", data: updatedTest });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating test", error: error.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTest = await TestApi.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting test", error: error.message });
  }
};
