const JobCategory = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if all required fields are provided
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required',
            });
        }

        // Check if the category already exists
        const existingCategory = await JobCategory.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists',
            });
        }

        // Create the new category
        const newCategory = await JobCategory.create({
            name,
            description,
        });

        return res.status(201).json({
            success: true,
            category: newCategory,
            message: 'Category created successfully',
        });
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Unable to create category',
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await JobCategory.find();

        // Check if any categories are found
        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No categories found',
            });
        }

        return res.status(200).json({
            success: true,
            categories,
            message: 'Categories fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Unable to fetch categories',
        });
    }
};

exports.categoryPageDetails = async(req,res) => {
    try{
        const { CategoryId } = req.body;
        const selectedCategory = await JobCategory.findById(CategoryId).populate("jobs").exec();
    //validation
    if (!selectedCategory) {
        return res.status(404).json({
            success: false,
            message: "Data Not Found",
        });
    }

    if (selectedCategory.jobs.length === 0) {
		console.log("No Jobs for this selected category.")
		return res.status(404).json({
		  success: false,
		  message: "No Jobs for this category.",
		})
	    }

        //return response
		  return res.status(200).json({
            success: true,
            selectedCategory
        });

    }
    catch(error){
        console.log(error);
		  return res.status(500).json({
			  success: false,
			  message: error.message,
		  });
    }
    
}