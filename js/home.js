import postApi from './api/postApi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getUlPagination } from './utils/selectors'
import debounce from 'lodash.debounce'

// to use from now fn
dayjs.extend(relativeTime)

function createPostElement(post) {
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

  return liElement
}

function renderPostList(postList) {
  if (!Array.isArray(postList)) return

  const ulPostList = document.getElementById('postList')
  if (!ulPostList) return

  ulPostList.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulPostList.appendChild(liElement)
  })
}

function renderPagination(pagination) {
  const ulPagination = getUlPagination()

  // calc total pages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)
  // save to ulPagination current page and totalPages
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  // disable prev pagination
  if (_page <= 1) {
    ulPagination.firstElementChild.classList.add('disabled')
  } else {
    ulPagination.firstElementChild.classList.remove('disabled')
  }

  // disable next pagination
  if (_page >= totalPages) {
    ulPagination.lastElementChild.classList.add('disabled')
  } else {
    ulPagination.lastElementChild.classList.remove('disabled')
  }
}

function handlePrevClick(e) {
  e.preventDefault()

  const page = Number.parseInt(e.currentTarget.parentElement.dataset.page)
  console.log(page);
  if (page <= 1) return

  handleFilterChange('_page', page - 1)
}

function handleNextClick(e) {
  e.preventDefault()

  const page = Number.parseInt(e.currentTarget.parentElement.dataset.page)
  console.log(page);
  const totalPages = e.currentTarget.parentElement.dataset.totalPages
  if (page >= totalPages) return

  handleFilterChange('_page', page + 1)
}

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)
    if (filterName === 'title_like') {
      url.searchParams.set('_page', 1)
    }

    history.pushState({}, '', url)

    // fetch API and re-render post list
    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('failed to fetch data', error)
  }
}
// TODO
function initPagination() {
  const ulPagination = getUlPagination()

  const prevPagination = ulPagination.querySelector('li:first-child')
  const nextPagination = ulPagination.querySelector('li:last-child')

  prevPagination.addEventListener('click', handlePrevClick)
  nextPagination.addEventListener('click', handleNextClick)
}

function getURL() {
  const url = new URL(window.location)
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  history.pushState({}, '', url)

  return url.searchParams;
}

const debounceSearch = debounce((e) => handleFilterChange('title_like', e.target.value), 500)

function initSearch() {
  const searchInput = document.getElementById('searchInput')
  if (!searchInput) return

  // population search content when reloading browers
  
  // const queryparams = new URLSearchParams(window.location.search);
  // if(queryparams.get('title_like')) {
  //   searchInput.value = queryparams.get('title_like');
  // }

  const url = new URL(window.location);
  if(url.searchParams.get('title_like')) {
    searchInput.value = url.searchParams.get('title_like');
  }

  //set default value from query params
  searchInput.addEventListener('input', debounceSearch)
}

;(async () => {
  initPagination()
  initSearch()
  try {
    const queryParams = getURL();
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    // block catch error
    console.log('main js error', error)
  }
})()
