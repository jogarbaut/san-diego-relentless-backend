const BoyTeam = require("../models/boyTeam.model")
const User = require("../models/user.model")

// getAllBoysTeams
// createNewBoyTeam
// updateBoyTeam
// deleteBoyTeam
// getBoyTeam

const getAllBoysTeams = async (req, res) => {
  const boysTeams = await BoyTeam.find().sort({ name: 1 })
  if (!boysTeams) return res.sendStatus(204)
  res.json(boysTeams)
}

const createNewBoyTeam = async (req, res) => {
  if (!req?.body?.name || !req?.body?.roster || !req?.body?.username) {
    return res.status(400).json({ message: "Missing fields"})
  }

  const user = await User.findOne({ username: req.body.username }).exec()

  try {
    const result = await BoyTeam.create({
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

const updateBoyTeam = async (req, res) => {
  if(!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required (boyTeam.controller.js)'})
  }

  const boyTeam = await BoyTeam.findOne({ _id: req.body.id }).exec();
  if (!boyTeam) {
    return res.status(204).json({ "message": `No boyTeam matches ID ${req.body.id}.` });
}
if (req.body?.name) boyTeam.name = req.body.name;
if (req.body?.coach) boyTeam.coach = req.body.coach;
if (req.body?.roster) boyTeam.roster = req.body.roster;
const result = await boyTeam.save();
res.json(result);
}

const deleteBoyTeam = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'BoyTeam ID required.' });

  const boyTeam = await BoyTeam.findOne({ _id: req.params.id }).exec();
  if (!boyTeam) {
      return res.status(204).json({ "message": `No boyTeam matches ID ${req.params.id}.` });
  }
  const result = await boyTeam.deleteOne();
  res.json(result);
}

const getBoyTeam = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'BoyTeam ID required.' });

  const boyTeam = await BoyTeam.findOne({ _id: req.params.id }).exec();
  if (!boyTeam) {
      return res.status(204).json({ "message": `No boyTeam matches ID ${req.params.id}.` });
  }
  res.json(boyTeam);
}

module.exports = {
  getAllBoysTeams,
  createNewBoyTeam,
  updateBoyTeam,
  deleteBoyTeam,
  getBoyTeam
}
