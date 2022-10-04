export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name of dish",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Short description of dish",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "price",
      title: "Price of dish",
      type: "number",
    },
    {
      name: "image",
      title: "Image of dish",
      type: "image",
    },
  ],
};
