/**
 * @swagger
 * components:
 *   schemas:
 *     blogs:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - excerpt
 *         - read_time
 *         - blog
 *         - tags
 *         - user
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: The blog title
 *         content:
 *           type: string
 *           description: The book description
 *         excerpt:
 *           type: string
 *           description: The blog short description
 *         read_time:
 *           type: string
 *           description: Total read_time by user
 *         blog:
 *           type: string
 *           description: Blog Image
 *         tags:
 *           type: objectId
 *           description: Populated wit tags table
 *         category:
 *           type: objectId
 *           description: Populated wit category table
 *         user:
 *           type: objectId
 *           description: Populated wit user's table for particular user
 *
 */

// Categories

/**
 * @swagger
 * components:
 *   schemas:
 *     categories:
 *       type: object
 *       required:
 *         - name
 *       unique:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: category name
 *
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       unique:
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: user name applied after login, edit profile
 *         email:
 *           type: string
 *           description: user entered by admin only through email
 *         password:
 *           type: string
 *           description: password must be at least 8 characters
 *         image:
 *           type: string
 *           description: after login, user can update image through edit profile
 *         role:
 *           type: string
 *           description: assigned by admin whether admin or user
 *
 *
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     address:
 *       type: object
 *       required:
 *         - zip_from
 *         - zip_to
 *       properties:
 *         name:
 *           type: string
 *           description: state name according to zip codes
 *         zip_from:
 *           type: number
 *           description: zip code's range starting from of a particular state
 *         zip_from:
 *           type: number
 *           description: zip code's range ending to of a particular state
 *         providers:
 *           type: ObjectId
 *           description: Population added between providers and address table
 *         
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     device:
 *       type: object
 *       required:
 *         - name
 *         - normal
 *         - medium
 *         - good
 *       unique:
 *         -name
 *       properties:
 *         name:
 *           type: string
 *           description: unique device name 
 *         normal:
 *           type: string
 *           description: device minimum speed
 *         medium:
 *           type: string
 *           description: device medium speed
 *         good:
 *           type: string
 *           description: device highest speed
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     providers:
 *       type: object
 *       required:
 *         - name
 *         - service
 *         - offer
 *         - provider
 *         - speed
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: provider's unique name 
 *         service:
 *           type: string
 *           description: provider's service type like 5G, Satelite or Fiber
 *         provider:
 *           type: string
 *           description: provider image
 *         speed:
 *           type: number
 *           description: internet speed 
 *         phone:
 *           type: string
 *           description: provider's contact number 
 *         
 *
 */
 

