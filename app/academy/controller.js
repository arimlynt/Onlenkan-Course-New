const academy = require('./model')
const Course = require('../course/model')

module.exports = {
    landingPage: async(req, res)=>{
        try {
            const course = await Course.find()
                .select('_id title category price discount photo')
               
            res.status(200).json({data: course})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
            
        }
    },
    detailPage: async(req, res)=>{
        try {
            const { id } = req.params
            const course = await Course.findOne({_id : id})
            
            if(!course){
                return res.status(404).json({message: "course tidak di temukan!"})
            }

            res.status(200).json({data: course})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
            
        }
    }
}