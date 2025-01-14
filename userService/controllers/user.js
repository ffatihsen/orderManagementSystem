const userLogic = require('../logic/userLogic');


const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userLogic.createUserLogic(name,email,password);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};



const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userLogic.getUserByIdLogic(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


const updateUser = async (req, res, next) => {
    try {
        const id = req.user?.userId;
        const userRole = req.user?.userRole;
        const idParams = req.params.id
        const { name } = req.body;

        const updatedUser = await userLogic.updateUserLogic(id, idParams,userRole, name);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        next(error);
    }
};




const deleteUser = async (req, res, next) => {
    try {
        const id = req.user?.userId;
        const userRole = req.user?.userRole;
        const idParams = req.params.id;
        

        const isDeleted = await userLogic.deleteUserLogic(id,idParams,userRole);

        if (!isDeleted) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        next(error);
    }
};



const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await userLogic.loginUserLogic(email, password);
        res.status(200).json({ token });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
};


const verifyToken = async (req, res) => {
    try {
        const { userId, name, userRole } = req.user;
        res.status(200).json({ userId, name, userRole });
    } catch (error) {
        res.status(500).json({ message: 'Unexpected error' });
    }
};





module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    verifyToken,
};
