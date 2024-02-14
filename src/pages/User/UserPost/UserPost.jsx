import './UserPost.css';

export default function UserPost({ post, username }) {


    const postDate = new Date(post.date);

    const formattedDate = postDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });


    return (
        <div className='post'>

            <p className='username'>{username}</p>

            <p className='content'>{post.description}</p>

            {
                post.image &&
                <img className='img' loading='lazy' src={post.image} alt="postpic" />
            }

            <p className='date'>{formattedDate}</p>

            <div className='likes'>{post.likes || 0}</div>

        </div>
    );
}
