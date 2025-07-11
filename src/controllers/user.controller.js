import User from '../models/user.model.js'
import StatusCodes from 'http-status-codes'

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(StatusCodes.OK).json({
      success: true,
      data: users
    })
    
  } catch(error) {
    next(error)
  }
}

export const getUser = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if(!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: user
    })

  } catch(err) {
    next(err)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    
    res.status(StatusCodes.CREATED).json({
      success:true,
      message: "User created successfully",
      data: user
    })

  } catch (error) {
    next(error);
  }
}
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    )

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User updated successfully",
      data: user,
      err: {}
    })
  } catch (error) {
    next(error);
  }
  
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: "NotFound"
      });
    }
    res.status(statusCode.OK).json({
      success: true,
      message: "User deleted Successfully",
      data: {},
      error: {}
    });
  } catch (error) {
    next(error);
  }
};