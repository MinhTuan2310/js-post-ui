import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// to use from now fn
dayjs.extend(relativeTime)

export function renderPostDetail(postDetail) {
  console.log(postDetail);
  // update title post detail
  const titlePostDetail = document.getElementById('postDetailTitle')
  if(!titlePostDetail) return;

  titlePostDetail.textContent = postDetail.title;

  // update author post detail
  const auThorPostDetail = document.getElementById('postDetailAuthor')
  if(!auThorPostDetail) return;

  auThorPostDetail.textContent = postDetail.author;

  // update time post detail
  const timeSpanPostDetail = document.getElementById('postDetailTimeSpan')
  if(!timeSpanPostDetail) return;

  timeSpanPostDetail.textContent = ` - ${dayjs(postDetail.updatedAt).format('DD/MM/YYYY HH:mm')}`

  // updaste desc post detail
  const descPostDetail = document.getElementById('postDetailDescription');
  if(!descPostDetail) return;

  descPostDetail.textContent = postDetail.description

  // update heroImage postDetail
  const heroImgPostDetail = document.getElementById('postHeroImage');
  if(!heroImgPostDetail) return;

  heroImgPostDetail.style.backgroundImage = `url(${postDetail.imageUrl})`
}