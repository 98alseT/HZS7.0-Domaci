import React from 'react';
import Post from '../Objects/Post';

const PostList = ({ events }) => {
  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <Post
            key={event._id}
            info={event}
          />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default PostList;
