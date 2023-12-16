const router = require("express").Router();
const { 
  Check1, 
  Check2, 
  Check3, 
  Show, 
  Add,
  Mail  
} = require("../controller/attcontrol"); 
 
router.post("/check1", Check1); //for updating checkin status day1
router.post("/check2", Check2); //for updating checkin status day2
router.post("/check3", Check3); //for updating checkin status day3
router.get("/show", Show); // for showing all attendees along with status
router.post("/add", Add); // for adding on-spot registration attendees to the collection
router.get("/mail", Mail); // for getting mails of all attendees
 
module.exports = router;