const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  totalStudents: { type: Number, default: 0 },
  totalFaculty: { type: Number, default: 0 },
  hod: {
    name: String,
    hodId: String
  },
  classes: [String],
  subjects: [{
    id: String,
    name: String,
    code: String,
    credits: Number,
    type: { type: String, enum: ['theory', 'lab', 'project'] }
  }],
  avgRisk: { type: Number, default: 0 },
  avgAttendance: { type: Number, default: 0 },
  avgPerformance: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);
