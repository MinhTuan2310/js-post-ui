import postApi from './api/postApi';
import { renderPostDetail } from './utils'


(async () => {
  const queryParams = new URLSearchParams(window.location.search);

  // fetch API
  const postDetail = await postApi.getById(queryParams.get('id'))

  // render DOM
  renderPostDetail(postDetail)
})();
