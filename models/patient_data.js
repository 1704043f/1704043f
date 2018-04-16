const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Patient_dataSchema = new Schema({

        date_created: {type: Date, default: Date.now},
        active: { type: Boolean, default: true },

        physician: {
            type: Schema.Types.ObjectId,
            ref: "Doctor"
        },

        details: {
            patient_number: {type: String, required: true },
            first_name: { type: String, required: true }, 
            last_name: { type: String, required: true },
            dob:  {type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true }
        },            
        
        appointment: {
            next_appt: Date,
            comments: String,
         },

        episode: [{
            episode_id: { type: String, required: true},
            start_date: { type: Date, required: true},
            doctor: String,

            medications: [{
                medication: {type: String, required: true},
                dose: String,
                form: String,
                route: String,
                times: [],
            }],

            record: [{
                date_time: Date,
                meds_taken: Boolean,
                // can add more detailed record of medications taken and notes here if required 
                
                emergencies: {
                    falls: Boolean,
                    freezing: Boolean,
                    choking: Boolean,
                    hallucination: Boolean,
                },

                symptoms: {
                    kickin: Number,
                    wearoff: Number,
                    movement: Number,
                    sleepy: Number,
                    offtime: Number,
                    tremor: Number,
                    walking: Number,
                    balance: Number,
                },

               

                side_effects: {
                    sickness: Number,
                    dizziness: Number,
                    headaches: Number,
                    drymouth: Number,
                },

                notes: String,

            }],

        }]              

    },

    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} }

);

var Patient_data = mongoose.model("Patient_data", Patient_dataSchema);

module.exports = Patient_data;      