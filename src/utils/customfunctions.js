

// You can still use an object to map product names to images
const imagesMap = {
    "SAMPLE": require("../../assets/images/SAMPLE.png"),
    "Food Package": require("../../assets/images/Food Package.png"),
    "Food Package 1.0": require("../../assets/images/Food Package 1.0.png"),
    "Food Package 2": require("../../assets/images/Food Package 2.png"),
    "Food Package 3": require("../../assets/images/Food Package 3.png"),
    "Food Package 4": require("../../assets/images/Food Package 4.png"),
};

// Utility function to get the right image
const resolveProductImage = (productName) => {
    // Normalize the product name to match the keys in your map
    // const normalizedProductName = productName.trim();
    const defaultImage = "https://via.placeholder.com/150";  

    // Check if the image exists in your map, else return the default
    return imagesMap[productName] || defaultImage;
};


export default resolveProductImage;