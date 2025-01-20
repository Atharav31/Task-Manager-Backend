export const createTask = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
