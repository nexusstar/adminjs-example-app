const AdminJS = require('adminjs');
const { sort, timestamps } = require('./sort');

export default {
  sort,
  properties: {
    ...timestamps,
    content: {
      type: 'textarea',
      isTitle: true,
    },
  },
  actions: {
    show: {
      isAccessible: false,
    },
    edit: {
      showInDrawer: true,
    },
  },
};
