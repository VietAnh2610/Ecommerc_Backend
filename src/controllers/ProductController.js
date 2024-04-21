const ProductService = require("../services/ProductService");
const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock,rating,description } = req.body;
   
 
    if (!name || !image || !type || !price || !countInStock  || !rating ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } 

    const response = await ProductService.createProduct(req.body);
   
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteProduct = async (req, res) => {
    try {
      const ProductId = req.params.id;
      const token = req.headers;

  
      if (!ProductId) {
        return res.status(200).json({
          status: "ERR",
          message: "The productID is required",
        });
      }
  
      const response = await ProductService.deleteProduct(ProductId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };
  
  const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter } = req.query
      const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };
  
  const getDetailsProduct = async (req, res) => {
    try {
        const ProductId = req.params.id;
        if (!ProductId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productID is required'
            });
        }
        const response = await ProductService.getDetailsProduct(ProductId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e); 
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
  };
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailsProduct
};
