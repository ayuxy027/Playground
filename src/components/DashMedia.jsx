import { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import moment from 'moment';

export default function DashMedia() {
  const { currentstudent } = useSelector((state) => state.student);
  const [media, setMedia] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (!currentstudent.isAdmin) return;
    (async () => {
      try {
        const [aRes, vRes, mRes] = await Promise.all([
          fetch('/server/gallery/albums',    { credentials: 'include' }),
          fetch('/server/gallery/videos',    { credentials: 'include' }),
          fetch('/server/gallery/memories',  { credentials: 'include' }),
        ]);
        const [albums, videos, memories] = await Promise.all([
          aRes.json(), vRes.json(), mRes.json()
        ]);
        const A = albums.map(a => ({ ...a, type: 'Album', title: a.title, preview: a.coverImage }));
        const V = videos.map(v => ({ ...v, type: 'Video', title: v.title, preview: v.url }));
        const M = memories.map(m => ({ ...m, type: 'Memory', title: m.caption||'–', preview: m.image }));
        setMedia([...A, ...V, ...M].sort((x,y)=>new Date(y.createdAt)-new Date(x.createdAt)));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [currentstudent]);

  const confirmDelete = (item) => {
    setToDelete(item);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    const type = toDelete.type.toLowerCase() + 's';
    await fetch(`/server/gallery/${type}/${toDelete._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setMedia((m) => m.filter((x) => x._id !== toDelete._id));
    setShowModal(false);
  };

  return (
    <div className=' w-full overflow-x-auto p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentstudent.isAdmin && media.length > 0 ? (
        <>
          <Table hoverable className='w-full table-auto'>
            <Table.Head>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Preview</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {media.map((item) => (
              <Table.Body key={item._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{item.type}</Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>
                    {item.type === 'Video' ? (
                      <video src={item.preview} className='w-16 h-16' controls />
                    ) : (
                      <img src={item.preview} className='w-16 h-16 rounded' />
                    )}
                  </Table.Cell>
                  <Table.Cell>{moment(item.createdAt).format('MM/DD/YYYY')}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => confirmDelete(item)}
                      className='text-red-500 cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>No media available.</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Delete this {toDelete?.type}?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                Yes, delete
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
