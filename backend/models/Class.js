const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classId: { type: String, required: true, unique: true },
  department: String,
  departmentCode: String,
  studentCount: { type: Number, default: 0 },
  faculty: [String],
  facultyIds: [String],
  batchYear: Number,
  semester: Number,
  avgRisk: { type: Number, default: 0 },
  avgAttendance: { type: Number, default: 0 },
  avgPerformance: { type: Number, default: 0 },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
