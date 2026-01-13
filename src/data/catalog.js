// Sample catalog data for departments -> categories -> subcategories
const catalog = {
  electronics: {
    name: 'Electronics',
    categories: {
      phones: {
        name: 'Phones',
        subcategories: {
          smartphones: { name: 'Smartphones' },
          accessories: { name: 'Accessories' },
        },
      },
      laptops: {
        name: 'Laptops',
        subcategories: {
          ultrabooks: { name: 'Ultrabooks' },
          gaming: { name: 'Gaming Laptops' },
        },
      },
    },
  },
  clothing: {
    name: 'Clothing',
    categories: {
      men: {
        name: "Men's",
        subcategories: {
          shirts: { name: 'Shirts' },
          pants: { name: 'Pants' },
        },
      },
      women: {
        name: "Women's",
        subcategories: {
          dresses: { name: 'Dresses' },
          tops: { name: 'Tops' },
        },
      },
    },
  },
}

export default catalog
