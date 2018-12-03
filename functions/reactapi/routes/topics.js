const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const webpush = require('web-push');

const topics = []
const public_vapid_key = 'BIqpd1HLEYC2Q_R6vLLPMAL9BdnWNZuX2yD0dL_EdtObQSSSqiwlsQFEOesYQ8EoEUEqmnD25oVoGo0rm9EE9NA';
const private_vapid_key = 'zW4aOIkx-6RcO-ALhc5XrDJKpzqEKZtlu0bCW6ZLkOc';

webpush.setGCMAPIKey('AAAAfJuYPvY:APA91bHMrNcTJRvVrBhMOuFlHu8MyWbu8MvQUfdbM5petJBNSYmWsBut8Lbt3Gk_cYt3oyRTgLvveYaLzBpgIYrIpCbkXHX9U_C6PWxYJtEkJUj4MmqvAumh797pMwM8PYqGrvvubiXP');
webpush.setVapidDetails(
  'mailto:krishnan.srm@gmail.com',
  public_vapid_key,
  private_vapid_key
);

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.status(201).send(topics);
});

router.post('/add', (req, res, next) => {
  const id = shortid.generate(); 
  console.log(req.body);
  const { title } = req.body;
  const { topic } = req.body;
  const { location } = req.body;
  const topicBody = {id, title, topic, location };
  topics.push(topicBody);
  // const {subscription} = req.body
  const subscription = {
    "endpoint":
          "https://fcm.googleapis.com/fcm/send/epRU6xPNWyc:APA91bEgipl0myj450o7NSLODbaXLMsJh2t4UK6YQLSDwhlPk-2eeKi7pxI06GsEZqWSU0luHMBzv1mP6joQDDjKXr-dVy6jQOipa8lCboC9dZAJ2UqogfhwHT5cbLGs0_YZnUf-aWX7",
         "expirationTime": null,
         "keys":
          { "p256dh":
             "BMo8oWwEmLe0DRMl6Kqm8GAuJA6Ib-7ADrWGn3Q9o7WRqmBZR_S4XFbpTT9Qmho9OlfR-aOKVmHJvIBXYptrB4s",
            "auth": "9mjHuAPI4HxXX3rS-wRdAQ"
          } 
    }
  res.status(201).send({'id': id, message: 'Added new topic successfully!'});
  webpush.sendNotification(subscription, "Your title was added successfully");
});

module.exports = router;
