const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [
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

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    const listWithNoBlog = []

    test('of empty list is 0', () => {
        const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toBe(0)
    })

      const listWithMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
          },
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
    test('of a bigger list is summed correctly', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(20)
    })
  })