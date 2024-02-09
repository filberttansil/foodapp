import {defineType} from 'sanity'
import category from './category'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant Name',
      validation: (rule) => rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Restaurant Image',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Restaurant Description',
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restaurant',
    },
    {
      name: 'lng',
      type: 'number',
      title: 'Longtitude of the Restaurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation: (rule) => rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Restaurant rating',
      validation: (rule) => rule.required().min(1).max(5).error('Value must between 1 to 5'),
    },
    {
      name: 'reviews',
      type: 'string',
      title: 'Reviews',
    },
    // has One ( belongs to ) => CategoryTable
    {
      name: 'type',
      title: 'Category',
      validation: (rule) => rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    },
    // hasMany => DishTable
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
})
