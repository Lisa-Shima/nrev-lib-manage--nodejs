const Member = require('../models/Member')
const bcrypt = require('bcrypt')

exports.getAllMembers = async(req, res, next) => {
    try{
        const members = await Member.findAll({
            attributes: { exclude: ['password']}
        })
        res.json(members)
    }
    catch(e){
        next(e)
    }
}

exports.getMemberById = async(req, res, next) => {
    try{
        const member = await Member.findByPk(req.params.id, {
            attributes: { exclude: ['password']}
        })
        if(!member) return res.status(404).json({message: 'Member not Found'})
            res.json(member)
    }
    catch(e){
        next(e)
    }
}

exports.createMember = async(req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const member = await Member.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const { password: _, ...memberData } = member.toJSON()
        res.status(201).json(memberData)
    }
    catch(e){
        next(e)
    }
}

exports.updateMember = async(req, res, next) => {
    try{
        const updates = { ...req.body }
        if(updates.password){
            updates.password = await bcrypt.hash(updates.password, 10)
        }
        const [updated] = await Member.update(updates, {
            where: {id: req.params.id}
        })
        if(!updated) return res.status(404).json({message: 'Member not Found'})
            const member = await Member.findByPk(req.params.id, {
                attributes: {exclude: ['password']  
            }})
            res.json(member)
    }
    catch(e){
        next(e)
    }
}

exports.deleteMember = async(req, res, next) => {
    try{
        const deleted = await Member.destroy({ where: { id: req.params.id}})
        if(!deleted) return res.status(404).json({message: 'Member not Found'})
            res.status(204).send()
    }
    catch(e){
        next(e)
    }
}