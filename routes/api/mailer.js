const router = require("express").Router();
const mailer = require("../../mailer/index.js");
 
router.route("/contact")
        .post((req, res) => {
            const { email = '', name = '', message = '' } = req.body
            console.log("email : ", email);
            console.log("name : ", name);
            console.log("message : " , message);
            mailer.send({ email, name, text: message }).then(() => {
            console.log(`Sent the message "${message}" from <${name}> ${email}.`);
                res.status(200).send("message sent successfully!");
            }).catch((error) => {
            console.log(`Failed to send the message "${message}" from <${name}> ${email} with the error ${error && error.message}`);
                res.status(422).send("failed sending message");
            })
});

router.route("/sendToPatient")
        .post((req, res) =>{
            const{email = '', name = '', message = '', subject =''} = req.body
            console.log("sending email to patient... ")
            console.log(req.body.email);
            console.log(req.body.name);
            console.log(req.body.message);
            console.log(req.body.subject);
            mailer.sendToPatient({email, name, text:message, subject}).then( () => {
                res.status(200).send("message sent successfully!");
            }).catch( (err) => {
                res.status(422).send(err);
            })
        })

router.route("/sendToDoctor")
        .post((req, res) =>{
            const{email = '', name = '', message = '', subject =''} = req.body
            mailer.sendToDoctor({email, name, text:message, subject}).then( () => {
                res.status(200).send("message sent successfully!");
            }).catch( (err) => {
                res.status(422).send("failed sending message");
            })
        })


module.exports = router;
