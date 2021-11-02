import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// to use from now fn
dayjs.extend(relativeTime)

export function createPostElement(post) {
  // find tempate
  const postTemplate = document.getElementById('postItemTemplate')
  if (!postTemplate) return
  // clone template to get li Element
  const liElement = postTemplate.content.firstElementChild.cloneNode(true)

  // update thumbnail, title, desc, author, timeSpan
  const liThumbnail = liElement.querySelector('[data-id=thumbnail]')
  if (liThumbnail) {
    liThumbnail.src = post.imageUrl

    liThumbnail.addEventListener('error', () => {
      liThumbnail.src = 'https://via.placeholder.com/1368x400?text=thumbnail'
    })
  }

  const liTitle = liElement.querySelector('[data-id=title]')
  if (liTitle) {
    liTitle.textContent = post.title
  }

  const descLiElement = liElement.querySelector('[data-id=description]')
  if (descLiElement) {
    descLiElement.textContent = post.description
  }

  const authorLiElement = liElement.querySelector('[data-id=author]')
  if (authorLiElement) {
    authorLiElement.textContent = post.author
  }

  const timeSpanLiElement = liElement.querySelector('[data-id=timeSpan]')
  if (timeSpanLiElement) {
    timeSpanLiElement.textContent = ` - ${dayjs(post.updatedAt).fromNow()}`
  }

  // bind event click for div element to go to post-detail page
  liElement.firstElementChild.addEventListener('click', () => {
    window.location.assign(`/post-detail.html?id=${post.id}`)
  })

  return liElement
}

export function renderPostList(postList) {
  if (!Array.isArray(postList)) return

  const ulPostList = document.getElementById('postList')
  if (!ulPostList) return

  ulPostList.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulPostList.appendChild(liElement)
  })
}