import { Cv } from '../models/backendModel.js'
import path from "path";
import {Buffer} from 'buffer'

const getColumn = async (req, res) => {
    try {
        const result = []
        const data = Cv.rawAttributes
        const width = 800 / Object.keys(data).length
        for (let key in Cv.rawAttributes) {
            if (key.includes('At')) break;
            result.push({
                field: key,
                headerName: key[0].toUpperCase() + key.substring(1),
                width: width,
                type: {
                    name: data[key].type.key,
                    value: data[key]['values']
                }
            });
        }
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
}
const getAll = async (req, res) => {
    try {
        const item = await Cv.findAll()
        res.json(item)
    } catch (error) {
        res.json({ message: error.message })
    }
}
const getById = async (req, res) => {
    try {
        const item = await Cv.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(item)
    } catch (error) {
        res.json({ message: error.message })
    }
}
const create = async (req, res) => {
    if (req.files === null) return res.status(400).json({ message: "No File Uploaded" });
    var input = req.body;
    let file = req.files.file;
    const ext = path.extname(file.name);
    const fileSize = file.data.length;
    const fileName = file.md5 + ext;
    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.pdf'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid Files" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });
    file.mv(`./public/files/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ message: err.message });
        try {
            await Cv.create({ ...input, imgCv: fileName, });
            res.status(200).json({ message: "Cv Created Successfuly" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
}
const update = async (req, res) => {
    if (req.files === null) return res.status(400).json({ message: "No File Uploaded" });
    var input = req.body;
    let file = req.files.file;
    const ext = path.extname(file.name);
    const fileSize = file.data.length;
    const fileName = file.md5 + ext;
    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.pdf'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid Files" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });
    file.mv(`./public/files/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ message: err.message });
        try {
            await Cv.update({ ...input, img: fileName, }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ message: "CV Updated Successfuly" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
}
const deleted = async (req, res) => {
    let id = Buffer.from(req.params.id, 'base64').toString('ascii').split(',');
    try {
        await Cv.destroy({
            where: {
                id: id
            }
        })
        res.json({
            'message': 'Delete Success'
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
export { getAll, create, getById, update, deleted, getColumn }