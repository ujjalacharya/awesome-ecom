const Admin = require("../models/Admin");
const BusinessInfo = require("../models/BusinessInfo")
const AdminBank = require("../models/AdminBank")
const AdminWarehouse = require("../models/AdminWarehouse")
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

exports.getAllAdmins = async (req, res) => {
    const page = req.query.page || 1;
    const admins = await Admin.find({})
        .select("-password -salt").skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    if (!admins) {
        return res.status(404).json({ error: 'No Admins are Available' })
    }
    res.json(admins)
}

exports.approveAdminBusiness = async (req, res) => {
    let businessInfo = await BusinessInfo.findById(req.params.b_id)
    if (!businessInfo) {
        return res.status(404).json({ error: "No business information available" })
    }
    businessInfo.isVerified = Date.now()
    await businessInfo.save()
    res.json(businessInfo)
}

exports.approveAdminBank = async (req, res) => {
    let bankInfo = await AdminBank.findById(req.params.bank_id)
    if (!bankInfo) {
        return res.status(404).json({ error: "No bank information available" })
    }
    bankInfo.isVerified = Date.now()
    await bankInfo.save()
    res.json(bankInfo)
}

exports.approveAdminWarehouse = async (req, res) => {
    let warehouse = await AdminWarehouse.findById(req.params.w_id)
    if (!warehouse) {
        return res.status(404).json({ error: "No warehouse information available" })
    }
    warehouse.isVerified = Date.now()
    await warehouse.save()
    res.json(warehouse)
}

exports.approveAdminAccount = async (req, res) => {
    let adminAccount = await Admin.findById(req.params.a_id)
        .populate('businessInfo', 'isVerified')
        .populate('adminBank', 'isVerified')
        .populate('adminWareHouse', 'isVerified')
    if (!adminAccount) {
        return res.status(404).json({ error: "Account has not been created." })
    }
    if (adminAccount.isBlocked) {
        return res.status(404).json({ error: "Admin is blocked." })
    }
    if (adminAccount.emailVerifyLink) {
        return res.status(404).json({ error: "Admin's email has not been verified." })
    }
    if (adminAccount.businessInfo.isVerified) {
        return res.status(404).json({ error: "Admin's business information has not been verified." })
    }
    if (adminAccount.adminBank.isVerified) {
        return res.status(404).json({ error: "Admin's bank information has not been verified." })
    }
    if (adminAccount.adminWareHouse.isVerified) {
        return res.status(404).json({ error: "Admin's warehouse information has not been verified." })
    }
    adminAccount.isVerified = Date.now()
    await adminAccount.save()
    res.json(adminAccount)
}