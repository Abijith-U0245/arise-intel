const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  facultyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: String,
  departmentCode: String,
  designation: { type: String, enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Professor & HOD'] },
  specialization: String,
  joinDate: String,
  assignedClasses: [String],
  assignedSubjects: [String],
  isHOD: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', facultySchema);
