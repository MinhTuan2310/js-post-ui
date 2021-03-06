import postApi from './api/postApi'
import { initPagination, initSearch, renderPostList, renderPagination } from './utils'

function getURL() {
  const url = new URL(window.location)
  
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  history.pushState({}, '', url)


  return url.searchParams
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
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('failed to fetch data', error)
  }
}

;(async () => {
  try {
    const queryParams = getURL()
    
    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: page => handleFilterChange('_page', page)
    })
    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: value => handleFilterChange('title_like', value)
    })
    
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination('pagination', pagination)
  } catch (error) {
    // block catch error
    console.log('main js error', error)
  }
})()
