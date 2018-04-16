const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// Database name = 'medmonitordb'
// This file empties the respective collections and inserts the seed data below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/medmonitordb",
  {
    useMongoClient: true
  }
);



const patient_dataSeed = [
    {
      date_created: new Date("2018-04-09T00:00:00.000Z"),
      active: true,
      physician: "5ac7ae215a77e145a4d86147",      //doctor: to be populated with _id from doctors collection
      
      details: {
        patient_number: "Hosp456238",
        first_name:  "Jennifer",
        last_name: "Watson",
        dob: "23/02/1973",
        email: "j.watson@googlemail.com",
        phone: "123-534-4501"
      },
  
        appointment: {
          next_appt: new Date("2018-04-16T12:30:00.000Z"),
          comments: "Look forward to seeying Ya"
      },
  
        episode: [{
            episode_id: "001",
            start_date: new Date("2018-03-24T08:00:00.000Z"),
            physician: "Dr John Heyworth",
    
            medications: [{
                medication: "Sinamet (levodopa)",
                dose: "100mg/100mg",
                form: "tablet",
                route: "oral",
                times: ["0800", "1400", "2000", ]
            }],
  
            record: [
                {
                    date_time: new Date("2018-04-09T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 1, walking:2, balance:0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },                
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking:3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 2, movement: 2, sleepy: 1, offtime: 0, tremor: 1, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
            //
      
                {
                    date_time: new Date("2018-04-09T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 2, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                }, 
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 0, movement: 3, sleepy: 0, offtime: 0, tremor: 1, walking: 2, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 2, sleepy: 1, offtime: 1, tremor: 0, walking:21, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                },

            //    
                {
                    date_time: new Date("2018-04-10T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 3, sleepy: 2, offtime: 1, tremor: 2, walking: 3, balance: 2},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 4, sleepy: 1, offtime: 1, tremor: 3, walking: 2, balance: 0},
                    side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-10T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement:30, sleepy: 1, offtime: 1, tremor: 2, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 2, headaches: 0, drymouth: 0, }, notes: "",
                },

            //
                {
                    date_time: new Date("2018-04-11T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 0, offtime: 1, tremor: 1, walking: 0, balance:0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin:1, wearoff: 2, movement: 3, sleepy: 0, offtime: 1, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 2, sleepy: 1, offtime: 1, tremor: 3, walking: 0, balance: 0},
                    side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                }
            ] // end of record array

        },
        
        // new episode

        {
            episode_id: "001",
            start_date: new Date("2018-03-28T06:00:00.000Z"),
            physician: "Dr John Heyworth",

            medications: [{
                medication: "Sinemet (carbidopa/levodopa)",
                dose: "10mg/100mg",
                form: "tablet",
                route: "oral",
                times: ["0600", "1000", "1400", "1800", "2000"]
            }],

            record: [
                {
                    date_time: new Date("2018-04-09T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 1, walking:2, balance:0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },                
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking:3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 2, movement: 2, sleepy: 1, offtime: 0, tremor: 1, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
            //
      
                {
                    date_time: new Date("2018-04-09T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 2, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                }, 
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 0, movement: 3, sleepy: 0, offtime: 0, tremor: 1, walking: 2, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 2, sleepy: 1, offtime: 1, tremor: 0, walking:21, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                },

            //    
                {
                    date_time: new Date("2018-04-10T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 3, sleepy: 2, offtime: 1, tremor: 2, walking: 3, balance: 2},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 4, sleepy: 1, offtime: 1, tremor: 3, walking: 2, balance: 0},
                    side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-10T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement:30, sleepy: 1, offtime: 1, tremor: 2, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 2, headaches: 0, drymouth: 0, }, notes: "",
                },

            //
                {
                    date_time: new Date("2018-04-11T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 0, offtime: 1, tremor: 1, walking: 0, balance:0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin:1, wearoff: 2, movement: 3, sleepy: 0, offtime: 1, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 2, sleepy: 1, offtime: 1, tremor: 3, walking: 0, balance: 0},
                    side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },

            ] // end of record array

        }, 

        // new episode  

        {
            episode_id: "001",
            start_date: new Date("2018-04-01T06:00:00.000Z"),
            physician: "Dr John Heyworth",

            medications: [{
                medication: "Sinemet (carbidopa/levodopa)",
                dose: "10mg/100mg",
                form: "tablet",
                route: "oral",
                times: ["0800", "1200", "1600"]
            }],

            record: [
                {
                    date_time: new Date("2018-04-09T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 1, walking:2, balance:0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },                
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking:3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 2, movement: 2, sleepy: 1, offtime: 0, tremor: 1, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
            //
      
                {
                    date_time: new Date("2018-04-09T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 2, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                }, 
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 0, movement: 3, sleepy: 0, offtime: 0, tremor: 1, walking: 2, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 2, sleepy: 1, offtime: 1, tremor: 0, walking:21, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                },

            //    
                {
                    date_time: new Date("2018-04-10T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 3, sleepy: 2, offtime: 1, tremor: 2, walking: 3, balance: 2},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 0, movement: 4, sleepy: 1, offtime: 1, tremor: 3, walking: 2, balance: 0},
                    side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-10T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement:30, sleepy: 1, offtime: 1, tremor: 2, walking: 3, balance: 0},
                    side_effects: {sickness: 0, dizziness: 2, headaches: 0, drymouth: 0, }, notes: "",
                },

            //
                {
                    date_time: new Date("2018-04-11T08:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 0, offtime: 1, tremor: 1, walking: 0, balance:0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin:1, wearoff: 2, movement: 3, sleepy: 0, offtime: 1, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T20:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 2, sleepy: 1, offtime: 1, tremor: 3, walking: 0, balance: 0},
                    side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                }

            ] // end of record array

        },

        //new episode

        {
                episode_id: "001",
                start_date: new Date("2018-04-05T08:00:00.000Z"),
                physician: "Dr John Heyworth",
        
                medications: [{
                    medication: "Sinamet (levodopa)",
                    dose: "100mg/100mg",
                    form: "tablet",
                    route: "oral",
                    times: ["0800", "1400", "2000", ]
                }],
      
                record: [
                    {
                        date_time: new Date("2018-04-05T08:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 1, walking:2, balance:0},
                        side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                    },                
                    {
                        date_time: new Date("2018-04-05T14:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 0, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking:3, balance: 0},
                        side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                    },
                    {
                        date_time: new Date("2018-04-05T20:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 0, wearoff: 2, movement: 2, sleepy: 1, offtime: 0, tremor: 1, walking: 2, balance: 0},
                        side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                    },
                //
          
                    {
                        date_time: new Date("2018-04-06T08:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 2, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 1, walking: 3, balance: 0},
                        side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                    }, 
                    {
                        date_time: new Date("2018-04-06T14:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 0, wearoff: 0, movement: 3, sleepy: 0, offtime: 2, tremor: 1, walking: 2, balance: 1},
                        side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                    },
                    {
                        date_time: new Date("2018-04-06T20:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 0, movement: 2, sleepy: 1, offtime: 1, tremor: 0, walking: 1, balance: 0},
                        side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                    },
    
                //    
                    {
                        date_time: new Date("2018-04-07T08:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 0, movement: 3, sleepy: 2, offtime: 1, tremor: 2, walking: 3, balance: 2},
                        side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                    },
                    {
                        date_time: new Date("2018-04-07T14:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 1, movement: 4, sleepy: 1, offtime: 1, tremor: 1, walking: 2, balance: 0},
                        side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                    },
                    {
                        date_time: new Date("2018-04-07T20:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 2, walking: 2, balance: 1},
                        side_effects: {sickness: 0, dizziness: 2, headaches: 0, drymouth: 0, }, notes: "",
                    },

                //
                    {
                        date_time: new Date("2018-04-08T08:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 1, movement: 4, sleepy: 1, offtime: 1, tremor: 1, walking: 0, balance:0},
                        side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                    },
                    {
                        date_time: new Date("2018-04-08T14:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin:1, wearoff: 1, movement: 3, sleepy: 1, offtime: 1, tremor: 1, walking: 1, balance: 1},
                        side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                    },
                    {
                        date_time: new Date("2018-04-08T20:00:00.000Z"),
                        meds_taken: true,
                        emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                        symptoms: {kickin: 1, wearoff: 1, movement: 2, sleepy: 1, offtime: 1, tremor: 2, walking: 1, balance: 1},
                        side_effects: {sickness: 1, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                    }

                ] // end of record array

        },

        //new episode

        {
            episode_id: "001",
            start_date: new Date("2018-04-09T06:00:00.000Z"),
            physician: "Dr John Heyworth",

            medications: [{
                medication: "Sinamet (levodopa)",
                dose: "100mg/10mg",
                form: "tablet",
                route: "oral",
                times: ["0700", "1100", "1400", "1900", "2200"]
            }],

            record: [
                {
                    date_time: new Date("2018-04-09T07:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 1, sleepy: 1, offtime: 1, tremor: 2, walking: 0, balance:0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },  
                {
                    date_time: new Date("2018-04-09T11:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 1, sleepy: 1, offtime: 1, tremor: 2, walking: 0, balance:0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },                
                {
                    date_time: new Date("2018-04-09T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 1, movement: 1, sleepy: 1, offtime: 1, tremor: 2, walking: 1, balance: 0},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T19:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 0, movement: 3, sleepy:1, offtime: 1, tremor: 1, walking: 2, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-09T22:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 1, movement: 0, sleepy: 1, offtime: 0, tremor: 3, walking: 1, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },

            //
                {
                    date_time: new Date("2018-04-10T07:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 3, sleepy: 0, offtime: 1, tremor: 2, walking: 2, balance: 1},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 1, drymouth: 0, }, notes: "",
                }, 
                {
                    date_time: new Date("2018-04-10T11:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 1, sleepy: 0, offtime: 1, tremor: 1, walking: 1, balance: 1},
                    side_effects: {sickness: 0, dizziness: 0, headaches: 1, drymouth: 0, }, notes: "",
                },           
                {
                    date_time: new Date("2018-04-10T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 0, wearoff: 2, movement: 1, sleepy: 0, offtime: 0, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-10T19:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 2, sleepy: 1, offtime: 1, tremor: 1, walking: 1, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                },                {
                    date_time: new Date("2018-04-10T22:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 1, sleepy: 1, offtime: 1, tremor: 1, walking: 1, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 1, drymouth: 0, }, notes: "",
                },

            //    
                {
                    date_time: new Date("2018-04-11T07:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 1, sleepy: 2, offtime: 1, tremor: 2, walking: 1, balance: 2},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T11:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 1, sleepy: 1, offtime: 1, tremor: 1, walking: 0, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 0, sleepy: 1, offtime: 1, tremor: 2, walking: 0, balance: 0},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T19:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 1, sleepy: 0, offtime: 0, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-11T22:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 1, sleepy: 0, offtime: 0, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },

            //
                {
                    date_time: new Date("2018-04-12T07:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 1, movement: 0, sleepy: 0, offtime: 1, tremor: 2, walking: 1, balance:0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T11:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin:1, wearoff: 2, movement: 1, sleepy: 0, offtime: 1, tremor: 2, walking: 1, balance: 1},
                    side_effects: {sickness: 1, dizziness: 0, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T14:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 0, sleepy: 1, offtime: 1, tremor: 1, walking: 2, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T17:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 3, movement: 0, sleepy: 1, offtime: 1, tremor: 3, walking: 2, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 1, }, notes: "",
                },
                {
                    date_time: new Date("2018-04-12T22:00:00.000Z"),
                    meds_taken: true,
                    emergencies: {falls: false, freezing: false, choking: false, hallucination: false,},
                    symptoms: {kickin: 1, wearoff: 2, movement: 3, sleepy: 0, offtime: 2, tremor: 3, walking: 1, balance: 0},
                    side_effects: {sickness: 0, dizziness: 1, headaches: 0, drymouth: 0, }, notes: "",
                },

            ] // end of record array

        }] // end last episode
    
    }]; // end of patient 



  db.Patient_data
  .remove({})
  .then(() => db.Patient_data.collection.insertMany(patient_dataSeed))
     .then(data => {
      console.log(data.insertedIds.length + " patient_data records inserted!");

  })  
  .catch(err => {
    console.error(err);
    process.exit(1);
  });