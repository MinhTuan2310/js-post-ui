export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);

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


export function initPagination({ elementId, defaultParams, onChange }) {
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  const prevPagination = ulPagination.querySelector('li:first-child')
  const nextPagination = ulPagination.querySelector('li:last-child')

  prevPagination.addEventListener('click', (e) => {
    e.preventDefault()

    const page = Number.parseInt(e.currentTarget.parentElement.dataset.page)
    if (page <= 1) return

    onChange?.(page - 1)
  })

  nextPagination.addEventListener('click', (e) => {
    e.preventDefault()

    const page = Number.parseInt(e.currentTarget.parentElement.dataset.page)
    const totalPages = e.currentTarget.parentElement.dataset.totalPages
    if (page >= totalPages) return

    onChange?.(page + 1)
  })
}
