const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    student: {
      name: { type: String, required: true },
      institute: { type: String, required: true },
      course: { type: String, required: true },
      major: { type: String, required: true },
      rollNumber: { type: String, required: true },
    },
    project_name: { type: String, required: true },
    project_idea: { type: String, required: true },
    tech_stack: [{ type: String, required: true }],
    status: { type: String },
    mentor: { type: String }

  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;