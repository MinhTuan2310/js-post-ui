import postApi from './api/postApi'

function createPostElement(post) {
  // find tempate
  const postTemplate = document.getElementById('postItemTemplate');
  if(!postTemplate) return;
  // clone template to get li Element
  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  // update thumbnail, title, desc, author, timeSpan
  const liThumbnail = liElement.querySelector('[data-id=thumbnail]');
  if(liThumbnail) {
    liThumbnail.src = post.imageUrl;
  }

  const liTitle = liElement.querySelector('[data-id=title]');
  if(liTitle) {
    liTitle.textContent = post.title;
  }

  const descLiElement = liElement.querySelector('[data-id=description]');
  if(descLiElement) {
    descLiElement.textContent = post.description;
  }

  const authorLiElement = liElement.querySelector('[data-id=author]');
  if(authorLiElement) {
    authorLiElement.textContent = post.author;
  }

  return liElement;
}

function renderPostList(postList) {
  if(!Array.isArray(postList) || postList.length === 0) return;

  const ulPostList = document.getElementById('postList');
  if(!ulPostList) return;

  postList.forEach(post => {
    const liElement = createPostElement(post);
    ulPostList.appendChild(liElement);
  })
}

;(async () => {
  try {
    const queryParams = {
      _page: 1,
      _limit: 6,
    }
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
  } catch (error) {
    // block catch error
    console.log('main js error', error)
  }
})()