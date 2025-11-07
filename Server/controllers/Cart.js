 

const Cart=require("../models/Cart")
const Course=require("../models/Course")
 

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId })
    .populate({
      path: "courses",
      model: "Course",
      populate: {
        path: "category",
        model: "Category"
      }
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        courses: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    return res.status(200).json({
      courses: cart.courses,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




exports.addCourseToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, courses: [] });
    }

    if (cart.courses.includes(courseId)) {
      return res.status(400).json({ message: "Course already in cart" });
    }

    const course = await Course.findById(courseId);

    cart.courses.push(courseId);
    cart.totalItems = cart.courses.length;
    cart.totalPrice += course.price;
    await cart.save();

    let updatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: "courses",
        model: "Course",
        populate: { path: "category" }
      });

    return res.json({
      courses: updatedCart.courses,
      totalItems: updatedCart.totalItems,
      totalPrice: updatedCart.totalPrice
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



exports.removeCourseFromCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId);

    let cart = await Cart.findOne({ user: userId });

    cart.courses = cart.courses.filter(id => id.toString() !== courseId);
    cart.totalItems = cart.courses.length;
    cart.totalPrice -= course.price;
    await cart.save();

    let updatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: "courses",
        model: "Course",
        populate: { path: "category" }
      });

    return res.json({
      courses: updatedCart.courses,
      totalItems: updatedCart.totalItems,
      totalPrice: updatedCart.totalPrice
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    //  Clear everything
    cart.courses = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
      courses: [],
      totalItems: 0,
      totalPrice: 0
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


