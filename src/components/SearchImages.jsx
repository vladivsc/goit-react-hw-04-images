import { useState, useEffect, useCallback } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { fetchData } from './services/posts-api';

const SearchImages = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imgDetails, setImgDetails] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async () => {
      try {
        setloading(true);
        const { hits, totalHits } = await fetchData(search, page);
        if (hits.length === 0) {
          Notiflix.Notify.warning('No result found!');
        }
        setItems(items => [...items, ...hits]);
        setTotal(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchImages();
  }, [search, page]);

  const searchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const openModal = useCallback((largeImageURL, tags) => {
    setShowModal(true);
    setImgDetails({ largeImageURL, tags });
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImgDetails(null);
  }, [])

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, [])

  const isImages = Boolean(items.length);
  const totalPage = Math.ceil(total / 12);

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      <ImageGallery items={items} onClick={openModal} />

      {loading && <Loader />}

      {error && Notiflix.Notify.failure('Something has gone wrong :(')}

      {isImages && page < totalPage && (
        <Button onLoadMore={loadMore} text={'Load more'} />
      )}

      {showModal && (
        <Modal close={closeModal}>
          <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
        </Modal>
      )}
    </>
  );
};

export default SearchImages;