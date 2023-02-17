const GirlTeam = require("../models/girlTeam.model")
const User = require("../models/user.model")

// getAllGirlsTeams
// createNewGirlTeam
// updateGirlTeam
// deleteGirlTeam
// getGirlTeam

const getAllGirlsTeams = async (req, res) => {
  const girlsTeams = await GirlTeam.find().sort({ name: 1 })
  if (!girlsTeams) return res.sendStatus(204)
  res.json(girlsTeams)
}

const createNewGirlTeam = async (req, res) => {
  if (!req?.body?.name || !req?.body?.roster || !req?.body?.username) {
    return res.status(400).json({ message: "Missing fields"})
  }

  const user = await User.findOne({ username: req.body.username }).exec()

  try {
    const result = await GirlTeam.create({
      user: user._id,
      name: req.body.name,
      coach: req.body.coach,
      roster: req.body.roster,
    })
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

const updateGirlTeam = async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required (girlTeam.controller.js)'})
  }

  const girlTeam = await GirlTeam.findOne({ _id: req.body.id }).exec();
  if (!girlTeam) {
      return res.status(204).json({ "message": `No girlTeam matches ID ${req.body.id}.` });
  }
  if (req.body?.name) girlTeam.name = req.body.name;
  if (req.body?.coach) girlTeam.coach = req.body.coach;
  if (req.body?.roster) girlTeam.roster = req.body.roster;
  const result = await girlTeam.save();
  res.json(result);
}

const deleteGirlTeam = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'GirlTeam ID required.' });

  const girlTeam = await GirlTeam.findOne({ _id: req.params.id }).exec();
  if (!girlTeam) {
      return res.status(204).json({ "message": `No girlTeam matches ID ${req.params.id}.` });
  }
  const result = await girlTeam.deleteOne();
  res.json(result);
}

const getGirlTeam = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'GirlTeam ID required.' });

  const girlTeam = await GirlTeam.findOne({ _id: req.params.id }).exec();
  if (!girlTeam) {
      return res.status(204).json({ "message": `No girlTeam matches ID ${req.params.id}.` });
  }
  res.json(girlTeam);
}

module.exports = {
  getAllGirlsTeams,
  createNewGirlTeam,
  updateGirlTeam,
  deleteGirlTeam,
  getGirlTeam
}
