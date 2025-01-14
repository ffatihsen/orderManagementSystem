const User = require('../models').User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUserLogic = async (name, email, password) => {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPass});
    return newUser;
};

const getUserByIdLogic = async (id) => {
    return await User.findOne({
        where: { user_id: id },
        attributes: ['name','email'],
    });
};

const updateUserLogic = async (id,idParams,userRole, name) => {

    if(id != idParams && userRole != "admin" ){ // admin kullanıcıdan bir başkası, kendisi yerine bir başkasını güncellemeye yetkisi olamaz.
        return null; 
    }
    const user = await User.findOne({ where: { user_id: id } } );
    if (!user) {
        return null;
    }
    user.name = name;
    await user.save();
    return user;
};

const deleteUserLogic = async (id,idParams,userRole) => {


    if(id != idParams && userRole != "admin" ){ // admin kullanıcıdan bir başkası, kendisi yerine bir başkasını silmeye yetkisi olamaz.
        return null; 
    }


    const user = await User.findOne({ where: { user_id: id } } );
    if (!user) {
        return false;
    }
    await user.destroy();
    return true;
};

const loginUserLogic = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('User not found');
    }

    return jwt.sign(
        { userId: user.user_id, name: user.name, userRole:user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
};



module.exports = {
    createUserLogic,
    getUserByIdLogic,
    updateUserLogic,
    deleteUserLogic,
    loginUserLogic,
};
