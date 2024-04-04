const UpcomingEvent = require('../models/UpcomingEvent');


exports.getUpcomingEvents = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const checktoken = process.env.REACT_APP_UPCOMING_EVENTS_TOKEN_DATA;

    if (token !== checktoken) {
      return res.status(401).json({ message: 'Unauthorized for upcomming events'});
    } else {
    const upcomingEvents = await UpcomingEvent.find();
    res.json(upcomingEvents);
    }
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addUpcomingEvent = async (req, res) => {
  try {
    const { eventName, eventDescription, eventUpDate, startTime, endTime } = req.body;
    const newEvent = new UpcomingEvent({ eventName, eventDescription, eventUpDate, startTime, endTime });
    await newEvent.save();
    res.status(201).json({ message: 'Upcoming event added successfully!' });
  } catch (error) {
    console.error('Error adding upcoming event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
