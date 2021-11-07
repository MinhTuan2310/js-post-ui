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

  // direct to add-edit-post page when clicking edit post
  const editPost = document.getElementById('goToEditPageLink');
  if(editPost) {
    editPost.addEventListener('click', () => {
      window.location.assign(`/add-edit-post.html?id=${queryParams.get('id')}`)
    })
  }
})();
