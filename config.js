const swaggerJsDoc = require("swagger-jsdoc"); 
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "YiP",
			version: "1.0.0",
			description: "Your Internet Providers Documentation",
		},
		components: {
			securitySchemes: {
			  bearerAuth: {
				type: 'http',
				in: 'header',
				name: 'Authorization',
				description: 'Bearer Token',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			  },
			},
		},
		  security: [{
			bearerAuth: [],
		}],
		servers: [
			{
				url: "https://yip-project-leilani.cyclic.app", 
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
module.exports = {specs};