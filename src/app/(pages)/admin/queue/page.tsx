'use client';

import { Home, Loader } from '@app/components';
import axios from 'axios';
import {
  ChevronDown,
  ChevronUp,
  CircleMinus,
  Pencil,
  Plus,
  Trash
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Queue() {
  const [queue, setQueue] = useState<any[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [clear, setClear] = useState(false);
  // const [editAlbum, setEditAlbum] = useState(false);
  // const [selectedAlbum, setSelectedAlbum] = useState<IAlbum>();

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const { data: albumData } = await axios.get('/api/albums/backlog');
        const { data: queueData } = await axios.get('/api/queue');

        const filteredAlbums = albumData.albums.filter(
          (album: IAlbum) =>
            !queueData.queue.some((q: any) => q.album_id === album.id)
        );
        setAlbums(filteredAlbums);
        setQueue(queueData.queue);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [clear]);

  const onMoveUp = (index: number): void => {
    if (index === 0) return;
    setIsDirty(true);

    const newQueue = [...queue];
    const temp = {
      ...newQueue[index - 1],
      position: index + 1
    };
    newQueue[index - 1] = {
      ...newQueue[index],
      position: index
    };
    newQueue[index] = temp;

    setQueue(newQueue);
  };

  const onMoveDown = (index: number): void => {
    if (index === queue.length - 1) return;
    setIsDirty(true);

    const newQueue = [...queue];
    const temp = {
      ...newQueue[index + 1],
      position: index + 1
    };
    newQueue[index + 1] = {
      ...newQueue[index],
      position: index + 2
    };
    newQueue[index] = temp;

    setQueue(newQueue);
  };

  const onAddToQueue = (album: IAlbum): void => {
    if (queue.some((i) => i.album_id === album.id)) return;
    if (queue.length > 9) return;

    setIsDirty(true);
    const nextPosition = queue.length + 1;

    const newItem = {
      album_id: album.id,
      position: nextPosition,
      albums: album
    };

    setQueue((prev: any[]) => [...prev, newItem]);
    setAlbums((prev: IAlbum[]) =>
      prev.filter((item: IAlbum) => item.id !== album.id)
    );
  };

  const onSaveQueue = async (): Promise<any> => {
    setLoading(true);
    try {
      const saveQueue = queue.map((item) => {
        return {
          album_id: item.album_id,
          position: item.position
        };
      });

      const { data } = await axios.post('/api/queue', { queue: saveQueue });

      if (data.success) {
        setIsDirty(false);
      }
    } catch (err: any) {
      console.error('[QUEUE] ', err);
      setError('An error occurred saving queue');
    } finally {
      setLoading(false);
    }
  };

  const onClear = (): void => {
    setIsDirty(false);
    setClear(!clear);
  };

  const onRemoveFromQueue = (item: any): void => {
    const newQueue = queue.filter((album) => album.album_id !== item.album_id);
    setAlbums((prev) => [...prev, item.albums]);

    // reorder queue after removing item
    const tempItems = newQueue.map((album: any, idx: number) => {
      return { ...album, position: idx + 1 };
    });

    setQueue(tempItems);
    setIsDirty(true);
  };

  const onDeleteAlbum = async (id: number, title: string): Promise<void> => {
    try {
      const { data } = await axios.delete(`/api/albums/${id}`);
      console.warn(data.message);
      setAlbums((prev) => prev.filter((album) => album.id !== id));
    } catch (err: any) {
      console.error('[QUEUE] ', err);
      setError(`An error occurred deleting album ${title}`);
    }
  };

  const onEditAlbum = (album: IAlbum): void => {
    // TODO: Add edit album logic
  };

  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <Link href="/admin">RETURN TO ADMIN</Link>
        <h3>ALBUM QUEUE</h3>
        <div className="flex flex-row justify-center gap-4">
          <button className="btn btn-md btn-success">RUN QUEUE NOW</button>
        </div>
        <div className="divider divider-accent">
          {queue.length} albums in queue
        </div>
        {loading ? (
          <Loader></Loader>
        ) : (
          queue.map((item: any, idx: number) => (
            <div
              key={item.album_id}
              className="flex flex-row items-center gap-4"
            >
              <div>
                {item.position}&emsp;{item.albums.title} - {item.albums.artist}
              </div>
              <div className="flex flex-row justify-center gap-1">
                <div className="tooltip" data-tip="Move up">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onMoveUp(idx)}
                  >
                    <ChevronUp />
                  </button>
                </div>
                <div className="tooltip" data-tip="Move down">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onMoveDown(idx)}
                  >
                    <ChevronDown />
                  </button>
                </div>
                <div className="tooltip" data-tip="Remove from queue">
                  <button
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => onRemoveFromQueue(item)}
                  >
                    <CircleMinus />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {isDirty && (
          <div className="flex gap-4">
            <button className="btn btn-md btn-success" onClick={onSaveQueue}>
              SAVE
            </button>
            <button className="btn btn-md btn-neutral" onClick={onClear}>
              CLEAR
            </button>
          </div>
        )}
        <div className="divider divider-accent">Album Backlog</div>
        <div className="flex flex-col gap-6">
          {albums.map((album: IAlbum) => (
            <div key={album.id} className="flex flex-row items-center gap-2">
              <Image
                src={album.cover_url}
                alt="cover"
                width={50}
                height={50}
              ></Image>
              <div>
                {album.title} - {album.artist}
              </div>
              <div className="flex flex-row justify-center gap-2">
                <div className="tooltip" data-tip="Add to queue">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => onAddToQueue(album)}
                  >
                    <Plus />
                  </button>
                </div>
                <div className="tooltip" data-tip="Edit album">
                  <button className="btn btn-sm btn-info">
                    <Pencil />
                  </button>
                </div>
                <div className="tooltip" data-tip="Delete album">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => onDeleteAlbum(album.id, album.title)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-8"></div>
        {error && <span>{error}</span>}
      </main>
    </div>
  );
}
