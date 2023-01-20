import store from '@/store';

const setTitle = (title) => {
  document.title = title;
};
const setMetaDescription = (metaDescription) => {
  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement('meta');

    meta.name = 'description';

    document
      .getElementsByTagName('head')[0]
      .appendChild(meta)
      .setAttribute('content', metaDescription);
  } else {
    meta.content = metaDescription;
  }
};
const setTitleAndDescription = (object) => {
  setTitle(object.title);

  setMetaDescription(object.description);

  store.dispatch('metas/setMetaDescriptionAndDocumentTitle', {
    title: object.title,
    description: object.description,
  });
};

export {
  setMetaDescription, setTitle, setTitleAndDescription,
};
