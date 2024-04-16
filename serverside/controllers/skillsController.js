const Skills = require('../models/skills');

exports.createSkills = async (req, res) => {
  const { userId } = req.params;
  try {
    const { skill, experience, strength } = req.body;
    const newSkill = new Skills({
      userId,
      skill,
      experience,
      strength,
    });
    const savedSkill = await newSkill.save();
    res.status(200).json(savedSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.displaySkills = async (req, res) => {
  const { userId } = req.params;
  try {
    const skills = await Skills.find({ userId });
    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// exports.editSkills = async (req, res) => {
//   const { userId, skillId } = req.params;
//   try {
//     const { skill, experience, strength } = req.body;
//     const existingSkill = await Skills.findById(skillId);
//     if (!existingSkill) {
//       return res.status(404).json({ message: 'Skill not found' });
//     }
//     existingSkill.skill = skill;
//     existingSkill.experience = experience;
//     existingSkill.strength = strength;
//     const updatedSkill = await existingSkill.save();
//     res.status(200).json(updatedSkill);
//   } catch (error) {
//     console.error('Error updating skill:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// exports.deleteSkills = async (req, res) => {
//   const { skillId } = req.params;
//   try {
//     await Skills.findByIdAndDelete(skillId);
//     res.status(200).json({ message: 'Skill deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting skill:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };
