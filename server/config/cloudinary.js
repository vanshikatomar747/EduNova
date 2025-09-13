require("dotenv").config(); // Make sure to load env variables
const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

		if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
			throw new Error("Missing Cloudinary configuration in environment variables");
		}

		cloudinary.config({
			cloud_name: CLOUD_NAME,
			api_key: API_KEY,
			api_secret: API_SECRET,
		});
	} catch (error) {
		console.error("Cloudinary connection failed:", error.message);
	}
};
