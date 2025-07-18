const Product = require('../models/product');

const getProductStats = async (req, res) => {
    try {

        const result = await Product.aggregate([
            //stage 1: Group by category and calculate total price and count
            
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100
                    },
                },
            },
            //stage 2: Group by category and calculate total price and count
            {
                $group: {
                    _id: "category",
                    avgPrice: { $avg: "$price"},
                    count: { $sum: 1, },
                },
            },
        ])
        res.status(200).json({
            success : true,
            message : "Product stats fetched successfully",
            data : result
        })

    }catch(error){
        console.error("Error fetching product stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product stats"
        });
    }
    };

const  getProductAnalysis = async (req, res) => {
    try{
        const result = await Product.aggregate([
            {
                $match : {
                    category: "Electronics"
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" },
                    averagePrice: { $avg: "$price" },
                    maxProductPrice: { $max: "$price" },
                    minProductPrice: { $min: "$price" },
                    
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"],
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Product analysis fetched successfully",
            data: result
        });

    }catch(error){
        console.error("Error fetching product analysis:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product analysis"
        });
    }
};

const insertSampleProducts = async (req, res)=>{
    try{
    const sampleProducts = [
        {
            name: "Laptop",
            category: "Electronics",
            price: 1200,
            inStock: true,
            tags: ["electronics", "computer", "portable"],
        },
        {
            name: "Smartphone",
            category: "Electronics",
            price: 800,
            inStock: true,
            tags: ["electronics", "mobile", "touchscreen"],
        },
        {
            name: "Coffee Maker",
            category: "Home Appliances",
            price: 150,
            inStock: true,
            tags: ["home", "appliances", "kitchen"],
        },
        {
            name: "Running Shoes",
            category: "Footwear",
            price: 100,
            inStock: false,
            tags: ["footwear", "sports", "running"],
        },
        {
            name: "Novel Book",
            category: "Books",
            price: 20,
            inStock: true,
            tags: ["books", "literature", "fiction"],
        }
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
        success: true,
        message: "Sample products inserted successfully",
        data: `Inserted ${result.length} sample products`,
    }); 
    }catch(err){
        console.error("Error inserting sample products:", err);
        res.status(500).json({
            success: false,
            message: "Failed to insert sample products"
        });
    }
};

module.exports = { insertSampleProducts, getProductStats, getProductAnalysis };
