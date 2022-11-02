import {dbConnect} from 'utils/mongoose';
import Task from 'models/Task';

dbConnect();
export default async function handler(req, res) {
  const {method, body} = req;
  switch (req.method) {
    case 'GET':
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(500).json({err: err.message});
      }

    case 'POST':
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        return res.status(200).json(savedTask);
      } catch (err) {
        return res.status(500).json({error: err.message});
      }

    default:
      return res.status(400).json({msg: 'this method is not supported'});
  }
}
