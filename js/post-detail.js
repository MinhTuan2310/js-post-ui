import postApi from './api/postApi';
import { registerLightBox, renderPostDetail } from './utils'


(async () => {
  registerLightBox({
    modalId: 'lightbox',
    modalImgId: 'img[data-id=lightboxImg]',
    modalPrevButtonId: 'button[data-id=lightboxImgPrev]',
    modalNextButtonId: 'button[data-id=lightboxImgNext]',
  });
  const queryParams = new URLSearchParams(window.location.search);

  // fetch API
  const postDetail = await postApi.getById(queryParams.get('id'))

  // render DOM
  renderPostDetail(postDetail)
})();
