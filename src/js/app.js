import fetchQuery from "./apiService";
import LayoutForQuery from "../hbs/LayoutForQuery.hbs";

const debounce = require('lodash.debounce');
const refs = {
    input: document.querySelector('[name="query"]'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    divLightbox: document.querySelector('.js-lightbox'),
    divLightboxContent: document.querySelector('.lightbox__content'),
    divLightboxImg: document.querySelector('.lightbox__image'),
    page: 1
};

refs.input.addEventListener('input', debounce(showQueryResult, 500));
refs.gallery.addEventListener('click', openModal);
refs.loadMore.addEventListener('click', ()=> {
    refs.page += 1
    return fetchQuery(refs.input.value,refs.page)
    .then(markup)
});

function showQueryResult () {
    refs.loadMore.classList.add('hide');
    refs.gallery.innerHTML ='';
    if(!refs.input.value){
    refs.input.parentNode.classList.add('onstrat')
    refs.input.parentNode.classList.remove('update')
        return
    };
    refs.input.parentNode.classList.remove('onstrat')
    refs.input.parentNode.classList.add('update')
    return fetchQuery(refs.input.value)
    .then(response => {
        refs.page = 1;
        if(response.photos.length){
            refs.loadMore.classList.remove('hide');
        }
       markup(response);
       return response
    });
    // .catch(alert('По данному запросу ничего не найдено!'));
};

function markup(query) {
    refs.gallery.insertAdjacentHTML('beforeend',LayoutForQuery(query.photos));
    refs.loadMore.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
}

function openModal (event) {
    event.preventDefault();
    event.target.nodeName === "IMG"?
      onOpenModal(event.target.dataset.source) 
      : null;
  };
  
  function onOpenModal (url) {
    window.addEventListener('keydown',onEscape);
    refs.divLightbox.addEventListener('click',onEscape);
    refs.divLightboxImg.src = url;
  
    refs.divLightbox.classList.add("is-open");
  
  };

  function onEscape (event) {
    if(event.target.dataset.action === "close-lightbox" || event.target.className === "lightbox__overlay" || event.code === 'Escape' )
    {
      closeModal();
    };
};

function closeModal () {
    refs.divLightbox.classList.remove("is-open");
    refs.divLightboxImg.src = '';
    window.removeEventListener('keydown',onEscape);
    refs.divLightbox.removeEventListener('click',onEscape);
  };
