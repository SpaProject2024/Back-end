import mongoose from 'mongoose';

const workScheduleSchema = new mongoose.Schema({
  date_of_week: { type: Date, required: true },
  doctorID: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  status: { type: Boolean, default: true },
  workID: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});
//hi
const WorkSchedule = mongoose.model('WorkSchedule', workScheduleSchema);
export default WorkSchedule;
