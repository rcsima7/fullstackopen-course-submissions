const blogRouter = require('express').Router()
const blogentry = require('../models/blogentry')
const Blogentry = require('../models/blogentry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
    
    try {
    const blogEntries = await Blogentry
    .find({}).populate('user', {username: 1, name: 1})
    response.json(blogEntries)
    } catch(exception) {
        next(exception)
    }
})

blogRouter.get('/:id', async (request, response, next) => {
    
    try {
        const blogentry = await Blogentry.findById(request.params.id)
        blogentry 
        ? response.json(blogentry)
        : response.status(404).end()
        } catch(exception) {
        next(exception)
        }
})

blogRouter.delete('/:id', async (request, response, next) => {
    
    try {
        await Blogentry.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null}

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
   
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }  
    
    const user = await User.findById(decodedToken.id)
    //const user = await User.findById(body.userId)

    const blogentry = new Blogentry({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    try {
        const savedEntry = await blogentry.save()
        user.blogEntries = user.blogEntries.concat(savedEntry._id)
        await user.save()
        response.json(savedEntry)
    } catch(exception) {
        next(exception)
    }
    //.catch(error => next(error))
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blogentry = {
        likes: body.likes
    }

    try {
    const updatedEntry = await Blogentry.findByIdAndUpdate(request.params.id, blogentry, {new: true})
    response.json(updatedEntry)
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogRouter