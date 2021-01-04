const AdminJS = require('adminjs')
const { sort, timestamps } = require('./sort')

import { sort, timestamps } from './sort';

export default {
  id: 'Article2',
  name: 'Article (customize field)',
  sort,
  actions: {
    list: {
      isVisible: false,
    },
  },
  properties: {
    ...timestamps,
    _id: { isVisible: false },
    content: {
      type: 'richtext',
    },
    published: {
      label: 'Published (custom render)',
      components: {
<<<<<<< HEAD:admin/resources/article.js
        list: AdminJS.bundle('../components/article-in-list')
      }
=======
        list: AdminBro.bundle('../components/article-in-list'),
      },
>>>>>>> 7a993bf (feat: rewrite project to typescript):src/admin/resources/article.ts
    },
  },
};
