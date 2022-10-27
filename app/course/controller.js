const Course = require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config');


module.exports={
    index: async(req, res)=>{
        try {
            const course = await Course.find()
            res.status(200).json({data: course})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
        }
    },
    actionCreate: async (req, res) => {
        try {
               
            const { 
                title,
                slug, 
                category,
                slogan,
                description,
                keypoint,
                designedfor,
                tools,
                price,
                discount, 
                partVideo   
            } = req.body

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;

                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async () => {

                    try {
                        const course = await Course.create({ 
                            title, 
                            category,
                            slogan,
                            description,
                            keypoint,
                            designedfor,
                            tools,
                            price,
                            discount,
                            photo: filename, 
                            partVideo                           
                        })
                        res.status(200).json({data: course})
                        
                    } catch (error) {
                        res.status(500).json({message: error.message || `Internal server error!`})
                    }         

                })
            } else {
                const course = await Course.create({ 
                    title, 
                    category,
                    slogan,
                    description,
                    keypoint,
                    designedfor,
                    tools,
                    price,
                    discount,
                    partVideo                  
                })

                res.status(200).json({data: course})

            }

        } catch (error) {
            res.status(500).json({message: error.message || `Internal server error!`})
        }
    },
    
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                title, 
                category,
                slogan,
                description,
                keypoint,
                designedfor,
                tools,
                price,
                discount, 
                partVideo    
            } = req.body

            

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async () => {

                    try {
                        const course = await Course.findOne({ _id: id })
    
                        let currentImage = `${config.rootPath}/public/uploads/${course.photo}`;
                        if (fs.existsSync) {
                            fs.unlinkSync(currentImage)
                        }
    
                        await Course.findOneAndUpdate({
                            _id: id,
                        }, {
                            title, 
                            category,
                            slogan,
                            description,
                            keypoint,
                            designedfor,
                            tools,
                            price,
                            discount, 
                            photo: filename,
                            partVideo    
                        }, {runValidators: true})
    
                        res.status(200).json({message: "data berhasil di ubah"})
                        
                    } catch (error) {
                        res.status(500).json({message: error.message || `Internal server error!`})
                    }
                    

                })
            } else {
                const course = await Course.findOneAndUpdate({
                    _id: id,
                }, {
                    title, 
                    category,
                    slogan,
                    description,
                    keypoint,
                    designedfor,
                    tools,
                    price,
                    discount, 
                    partVideo    
                }, {runValidators: true})

                res.status(200).json({message: "data berhasil di ubah"})

            }
            
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params

            const course = await Course.findOneAndDelete({_id: id})

            let currentImage = `${config.rootPath}/public/uploads/${course.photo}`;
            if (fs.existsSync) {
                fs.unlinkSync(currentImage)
            }

            if (course) {
                res.status(200).json({message: "berhasil hapus data"})
            } else {
                res.status(404).json({message: "data tidak ditemukan"})
            }

        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
        }
    }
}