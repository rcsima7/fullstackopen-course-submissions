const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    const allLikes = blogs.reduce(reducer,0)
    console.log('sum of likes:', allLikes)
    return allLikes
}
  
  module.exports = {
    dummy,
    totalLikes
  }