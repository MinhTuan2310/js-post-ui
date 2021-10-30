import debounce from 'lodash.debounce'

export function initSearch({elementId, defaultParams, onChange}) {
  const searchInput = document.getElementById(elementId)
  if (!searchInput) return

  // population search content when reloading browers
  if(defaultParams.get('title_like')) {
    searchInput.value = defaultParams.get('title_like');
  }

  // const url = new URL(window.location)
  // if (url.searchParams.get('title_like')) {
  //   searchInput.value = url.searchParams.get('title_like')
  // }

  const debounceSearch = debounce((event) => onChange?.(event.target.value), 500)
  //set default value from query params
  searchInput.addEventListener('input', debounceSearch)
}