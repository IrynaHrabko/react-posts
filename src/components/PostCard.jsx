const PostCard = ({item}) => {
  return (
    <div className="post__card">
    <h3 className="post__title">
      {item.title}
    </h3>
    <p className="post__body">
      {item.body}
    </p>
  </div>
  )
}

export default PostCard