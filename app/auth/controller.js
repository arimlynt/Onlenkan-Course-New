const Academy = require('../academy/model');
const config = require('../../config')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports =  {
    signup : async (req, res, next)=>{
        try {
            const payload = req.body

            let academy = new Academy(payload)

            await academy.save()

            delete academy._doc.password

            res.status(201).json({
                data : academy
            })

        } catch (error) {
            if(error && error.name === "ValidationError"){
                return res.status(422).json({
                    message: error.message,
                    error: 1,
                    fields: error.errors
                })
            }
            next(error)
        }
    },
    signin : async (req, res, next)=>{
        const { email, password } = req.body

        Academy.findOne({ email: email }).then((academy)=>{
            if(academy){
                const checkPassword = bycrypt.compareSync(password, academy.password)
                if(checkPassword){
                    const token = jwt.sign({
                        academy : {
                            id: academy.id,
                            email: academy.email,
                            name: academy.name                           
                        }
                    }, config.jwtKey)
                    res.status(200).json({
                        data: {token}
                    })
                }else{
                    res.status(403).json({
                        message: 'Password yang anda masukkan salah'
                    })

                }
            }else{
                res.status(403).json({
                    message: 'Email yang anda masukkan belum terdaftar'
                })

            }
        }).catch((error)=>{
            res.status(500).json({
                message: error.message || `Internal server error`
            })

            next()
        })
    } 
}
