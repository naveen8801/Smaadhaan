const RequestModel = require('./../model/request');
const OrgRegistertModel = require('./../model/register');
const sms = require('fast-two-sms');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { suppressDeprecationWarnings } = require('moment');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const maxage = 3 * 24 * 60 * 60;
const createwebToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxage,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await OrgRegistertModel.login(username, password);
    const token = createwebToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxage * 1000 });
    res.status(200).send({ id: user._id });
  } catch (err) {
    console.log(err);
    if (err.message === 'Incorrect Username') {
      res.status(400).send('501');
    }
    if (err.message === 'Incorrect Password') {
      res.status(400).send('502');
    }
    res.status(400).send('Other Error');
  }
};

exports.register = async (req, res) => {
  let { org_name, username, password, location } = req.body;
  const list = [];
  try {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const orgsignin = await OrgRegistertModel.create({
      org_name,
      username,
      password,
      location,
      list,
    });
    const token = createwebToken(orgsignin._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxage * 1000 });
    res.status(200).send({ id: orgsignin._id });
  } catch (err) {
    console.log(err);
    if (err.code == 11000) {
      res.status(401).send('500');
    }
    res.status(400).send('Registration Unsuccessful !');
  }
};

exports.profile = async (req, res) => {
  try {
    const { orgid } = req;
    console.log('REACHED ', orgid);
    const org = await OrgRegistertModel.findById(orgid);
    res.status(200).json(org);
  } catch (err) {
    console.log(err.message);
    res.status(400).send('ERROR');
  }
};

exports.postrequest = async (req, res) => {
  const { name, problem, long, lat, phone_number } = req.body;
  const date = moment(Date.now()).format('MM/DD/YYYY');
  const accepted = false;
  try {
    const req = await RequestModel.create({
      name,
      problem,
      long,
      lat,
      phone_number,
      date,
      accepted,
    });
    res.status('200').json(req);
  } catch (err) {
    console.log(err);
    res.status(400).send('ERROR OCCURED !!');
  }
};

exports.incomingsms = (req, res) => {
  const m = req.body;
  console.log(m);
  const twiml = new MessagingResponse();
  twiml.message(
    `Thanks for using Smaadhaan, your request has been recieved successfullly`
  );
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};

exports.outgoingsms = async (req, res) => {
  const { phone_number } = req.body;
  const { orgid } = req;
  console.log('ID', orgid);
  try {
    const org = await OrgRegistertModel.findById(orgid);

    var options = {
      authorization: process.env.API_KEY_SMS,
      message: `Your request have been successully accepted by organisation "${org.org_name}". Organisation will reach to you soon. Thanks for using Smaadhaan :-)`,
      numbers: [phone_number],
    };
    const message = await sms.sendMessage(options);
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(400).send('ERROR !');
  }
};

exports.getRequests = async (req, res) => {
  try {
    const allrequests = await RequestModel.find();
    res.status(200).json(allrequests);
  } catch (err) {
    console.log(err);
    res.send(400).send('ERROR');
  }
};

exports.acceptRequest = async (req, res) => {
  const { userid } = req.body;
  const { orgid } = req;
  try {
    let user = await RequestModel.findById(userid);
    if (!user) {
      res.status(400).send('INVALID USER ID');
    }
    const org = await OrgRegistertModel.findById(orgid);
    let list = org.accepted_requests;
    await RequestModel.findByIdAndUpdate(
      userid,
      { accepted: true },
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          user = docs;
          list.push(user);
        }
      }
    );
    console.log(list);

    await OrgRegistertModel.findByIdAndUpdate(
      orgid,
      { ...org, accpeted_requests: list },
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          user = docs;
          console.log(docs);
        }
      }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send('ERROR OCCURED !');
  }
};

exports.allData = async (req, res) => {
  try {
    const user = await RequestModel.find();
    const org = await OrgRegistertModel.find();
    let org_locations = [];
    let user_location = [];
    let date_request = [];
    let problems = [];
    org.map((item) => {
      org_locations.push(item.location);
    });
    user.map((item) => {
      user_location.push({ long: item.long, lat: item.lat });
      date_request.push(item.date);
      problems.push(item.problem);
    });
    let result = {};
    for (let i = 0; i < date_request.length; i++) {
      if (!result[date_request[i]]) result[date_request[i]] = 0;
      ++result[date_request[i]];
    }
    let problem_details = {};
    for (let i = 0; i < problems.length; i++) {
      if (!problem_details[problems[i]]) problem_details[problems[i]] = 0;
      ++problem_details[problems[i]];
    }
    const mainObject = {
      user_count: user.length,
      org_count: org.length,
      userLocations: user_location,
      orgLocations: org_locations,
      dateRequest: result,
      problemDetails: problem_details,
    };
    res.status(200).json(mainObject);
  } catch (err) {
    console.log(err);
    res.status(400).send('ERROR');
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).send('done');
};
