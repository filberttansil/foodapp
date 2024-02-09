import {defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Restaurants',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of Featured',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description of Featured',
    },
    // hasMany => RestaurantTable
    {
      name: 'restaurants',
      title: 'Restaurants of this featured',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    },
  ],
})
