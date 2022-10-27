const Footer = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const footer = await Footer.find()
            res.status(200).json({data: footer})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
        }
    },
    actionCreate: async (req, res) => {
        try {
               
            const { sosmed, kontak } = req.body

            const footer = await Footer.create({ 
                sosmed,
                kontak                       
            })
                
            
            res.status(200).json({data: footer})

        } catch (error) {
            res.status(500).json({message: error.message || `Internal server error!`})
        }
    },
    
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { sosmed, kontak} = req.body
            const footer = await Footer.findOneAndUpdate({_id: id}, {
                sosmed,
                kontak
            }, {runValidators: true});


            if (footer) {
            res.status(200).json({
                message: "data berhasil di ubah"
            })
            } else {
                res.status(200).json({message: "data tidak ditemukan"})
            }
            
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params

            const footer = await Footer.findOneAndDelete({_id: id})

            if (footer) {
                res.status(200).json({message: "berhasil hapus data"})
            } else {
                res.status(404).json({message: "data tidak ditemukan"})
            }

        } catch (error) {
            res.status(500).json({message: error.message || 'Internal server error!'})
        }
    }
}