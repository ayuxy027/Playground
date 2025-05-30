import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Textarea, Button } from 'flowbite-react';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function PostDetails() {
  const { slug } = useParams();
  const { currentstudent } = useSelector(state => state.student);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/server/post/getpost/${slug}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  // fetch its comments
  useEffect(() => {
    if (!post || !post.post._id) return;
    fetch(`http://localhost:3000/server/post/${post.post._id}/comments`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(setComments)
      .catch(console.error);
  }, [post]);

  const handleCommentSubmit = async e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const res = await fetch(
      `http://localhost:3000/server/post/${post.post?._id}/comments`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment })
      }
    );
    const saved = await res.json();
    setComments([saved, ...comments]);
    setNewComment('');
  };

  if (loading) return <div className="flex justify-center p-10"><Spinner size="xl" /></div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.post?.title}</h1>
      <img src={post.post?.image} alt="" className="w-full h-64 object-contain m-6 rounded-lg" style={{ borderRadius: '0.5rem' }} />
      <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: post.post?.content }} />
      <div className="text-sm text-gray-500 mb-6">
        Posted on {moment(post.post?.createdAt).format('LL')}
      </div>

      {/* Comments */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Comments</h2>

        {currentstudent && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <Textarea
              placeholder="Add a comment..."
              rows={3}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <Button type="submit" className="mt-2">Post Comment</Button>
          </form>
        )}

        {comments.map(c => (
          <div key={c._id} className="border-b py-2">
            <div className="font-medium">
              {c.createdBy.name}
              <span className="text-xs text-gray-400 ml-2">
                {moment(c.createdAt).fromNow()}
              </span>
            </div>
            <div>{c.content}</div>
          </div>
        ))}

        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
      </div>
    </div>
  );
}
