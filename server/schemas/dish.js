import {defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Dish Name',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Dish Description',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'price',
      title: 'Dish Price',
      type: 'number',
      validation: (rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Image of the Dish',
      type: 'image',
      validation: (rule) => rule.required(),
    },
  ],
})
