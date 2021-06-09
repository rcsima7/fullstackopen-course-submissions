const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogentry = require('../models/blogentry')

const initialBlogEntries = [
    {
        title: "More patterns",
        author: "Michael Lallala",
        url: "https://reactpatterns.com/",
        likes: 8,
        id: "607749c011507c26f87d920a"
        },
        {
        title: "Hello Blog",
        author: "Salma Hayek",
        url: "https://reactpatterns.com/",
        likes: 7,
        id: "607749db11507c26f87d920b"
        }
  ]

beforeEach( async () => {
    await Blogentry.deleteMany({})
    let entryobject = new Blogentry(initialBlogEntries[0])
    await entryobject.save()
    entryobject = new Blogentry(initialBlogEntries[1])
    await entryobject.save()
})

test('all notes are returned', async() => {
    const response = await api.get('/api/blogentries')
    expect(response.body).toHaveLength(initialBlogEntries.length)
})

test('a valid entry can be added', async () => {
    const newBlogEntry = {
        title: "We are Blog",
        author: "La La",
        url: "https://reactpatterns.com/",
        likes: 7,
    }
    await api
        .post('/api/blogentries')
        .send(newBlogEntry)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogentries')
    const contents = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogEntries.length + 1)
    expect(contents).toContain('We are Blog')
    })


afterAll(() => {
    mongoose.connection.close()
    })