 const swaggerUI = require("swagger-ui-express");
 
 
 
let data = () =>{
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
 *           format: binary
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
 *         category:
 *           type: string
 *           description: category name
 *
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     tags:
 *       type: object
 *       required:
 *         - name
 *       unique:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: tag name
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
 *         
 *         email:
 *           type: string
 *           description: user entered by admin only through email
 *         password:
 *           type: string
 *           description: password must be at least 8 characters
 *         
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     reset:
 *       type: object
 *       required:
 *         - email
 *       unique:
 *         - email
 *       properties:
 *         
 *         email:
 *           type: string
 *           description: user entered by admin only through email
 *       
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
 *         zip_to:
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
/**
  * @swagger
  * tags:
  *   name: Login
  *   description: User Login
  */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login user
 *     tags: [Login]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
  
 *     responses:
 *       200:
 *         description: user logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */ 

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reset Password
 *     tags: [Login]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reset'
  
 *     responses:
 *       200:
 *         description: reset Link sent to your email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/reset'
 *       500:
 *         description: Some server error
 */ 

/**
 * @swagger
 * /new-password:
 *   post:
 *     summary: enter new password
 *     tags: [Login]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
  
 *     responses:
 *       200:
 *         description: password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */ 


/**
  * @swagger
  * tags:
  *   name: Blogs
  *   description: The blogs managing API
  */

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blogs'
 *       404:
 *         description: The blog was not found
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/blogs'
  
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/blog'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /blog/{id}:
 *  put:
 *    summary: Update the blog by the id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/blogs'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blogs'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 * 
 *     responses:
 *       200:
 *         description: The blog was deleted
 *       404:
 *         description: The blog was not found
 */


// Providers

/**
  * @swagger
  * tags:
  *   name: Providers
  *   description: The providers managing API
  */

/**
 * @swagger
 * /provider:
 *   get:
 *     summary: Returns the list of all the providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: The list of the providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/providers'
 */

/**
 * @swagger
 * /provider/{id}:
 *   get:
 *     summary: Get the provider by id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     responses:
 *       200:
 *         description: The provider description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/providers'
 *       404:
 *         description: The provider was not found
 */

/**
 * @swagger
 * /provider:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/providers'
  
 *     responses:
 *       200:
 *         description: The provider was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/provider'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /provider/{id}:
 *  put:
 *    summary: Update the provider by the id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The provider id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/providers'
 *    responses:
 *      200:
 *        description: The provider was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/providers'
 *      404:
 *        description: The provider was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /provider/{id}:
 *   delete:
 *     summary: Remove the provider by id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 * 
 *     responses:
 *       200:
 *         description: The provider was deleted
 *       404:
 *         description: The provider was not found
 */

/**
  * @swagger
  * tags:
  *   name: Address
  *   description: The address managing API
  */

/**
 * @swagger
 * /address:
 *   get:
 *     summary: Get the address by zip code
 *     tags: [Address]
 *     parameters:
 *       - in: query
 *         name: zip_code
 *         schema:
 *         type: number
 *         required: true
 *         description: filter by zip_code
 *       - in: query
 *         name: speed
 *         schema:
 *         type: number
 *         required: false
 *         description: filter by provider's speed
 *    
 *     responses:
 *       200:
 *         description: The address description by zip code
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/address'
 *       404:
 *         description: The address was not found
 */

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     summary: Get the address by id
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/address'
 *       404:
 *         description: The address was not found
 */

/**
 * @swagger
 * /address:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/address'
  
 *     responses:
 *       200:
 *         description: The provider was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/address'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /address/{id}:
 *  put:
 *    summary: Update the address by the id
 *    tags: [Address]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The address id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/address'
 *    responses:
 *      200:
 *        description: The address was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/address'
 *      404:
 *        description: The address was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /address/{id}:
 *   delete:
 *     summary: Remove the address by id
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 * 
 *     responses:
 *       200:
 *         description: The address was deleted
 *       404:
 *         description: The address was not found
 */


/**
  * @swagger
  * tags:
  *   name: Categories
  *   description: Blogs Categories
  */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: All the Blogs Categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categories'
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categories'
 *       404:
 *         description: The category was not found
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categories'
  
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categories'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /category/{id}:
 *  put:
 *    summary: Update the category by the id
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/categories'
 *    responses:
 *      200:
 *        description: The category was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/category'
 *      404:
 *        description: The category was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: The category id
 * 
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 */

/**
  * @swagger
  * tags:
  *   name: Devices
  *   description: Provider's Devices
  */

/**
 * @swagger
 * /device:
 *   get:
 *     summary: All the Internet Devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: The list of the devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/device'
 */

/**
 * @swagger
 * /device/{id}:
 *   get:
 *     summary: Get the device by id
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The device id
 *     responses:
 *       200:
 *         description: The device description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/device'
 *       404:
 *         description: The device was not found
 */

/**
 * @swagger
 * /device:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/device'
  
 *     responses:
 *       200:
 *         description: The device was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/device'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /device/{id}:
 *  put:
 *    summary: Update the device by the id
 *    tags: [Devices]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The device id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/device'
 *    responses:
 *      200:
 *        description: The device was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/device'
 *      404:
 *        description: The device was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /device/{id}:
 *   delete:
 *     summary: Remove the device by id
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: The device id
 * 
 *     responses:
 *       200:
 *         description: The device was deleted
 *       404:
 *         description: The device was not found
 */

/**
  * @swagger
  * tags:
  *   name: Tags
  *   description: Tags for the Blogs
  */

/**
 * @swagger
 * /tag:
 *   get:
 *     summary: all the available blog's tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: The list of the tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/tags'
 */

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     summary: Get the tag by id
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag id
 *     responses:
 *       200:
 *         description: The tag by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tags'
 *       404:
 *         description: The tag was not found
 */

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: create a new tag
 *     tags: [Tags]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tags'
  
 *     responses:
 *       200:
 *         description: The tag was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tags'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /tag/{id}:
 *  put:
 *    summary: Update the tag by the id
 *    tags: [Tags]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The tag id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/tag'
 *    responses:
 *      200:
 *        description: The tag was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tag'
 *      404:
 *        description: The tag was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     summary: Remove the tag by id
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: The tag id
 * 
 *     responses:
 *       200:
 *         description: The tag was deleted
 *       404:
 *         description: The tag was not found
 */
 }
 