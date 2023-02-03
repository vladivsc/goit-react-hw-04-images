import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { fetchImages } from './services/posts-api';

class SearchImages extends Component {
  state = {
    items: [],
    search: "",
    loading: false,
    error: null,
    page: 1,
    total: 0,
    showModal: false,
    imgDetails: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const { hits, totalHits } = await fetchImages(search, page);
      if (hits.length === 0) {
        Notiflix.Notify.warning('No result found!');
      }
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = ( largeImageURL, tags ) => {
    this.setState({
      showModal: true,
      imgDetails: { largeImageURL, tags, }
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imgDetails: null,
    });
  };

  render() {
    const { items, page, total, loading, error, showModal, imgDetails } = this.state;
    const { searchImages, loadMore, openModal, closeModal } = this;
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
  }
} 

export default SearchImages;