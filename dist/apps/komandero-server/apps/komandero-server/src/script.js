var import_prisma = require("@komandero/prisma");
const organization_id = "b4a6384e-cdc5-4223-9d86-937df1c2dc96";
(async () => {
  return;
  const categories_should_had_modification = [
    "f5cb1296-2672-47d8-a5ed-6c0272a83d9e",
    // 'Whisky
    "ac7473e7-3dd5-41d1-a6a3-3197cfe12cbc",
    // 'GINEBRA
    "694f9304-6e6e-4061-9706-8dc3ee031e59",
    // 'RON
    "2ca53a9d-54b8-4357-b440-b34f45b7bb5e"
    // 'VOZKA
  ];
  await import_prisma.prisma.product.updateMany({
    where: { organization_id, product_category_id: { in: categories_should_had_modification } },
    data: {
      price_pick_up: {
        decrement: 200
      }
    }
  });
  const products = await import_prisma.prisma.product.findMany({
    where: { organization_id, product_category_id: { in: categories_should_had_modification } },
    select: {
      id: true,
      name: true,
      price_pick_up: true,
      price_delivery: true,
      price_take_away: true
      // product_category_id: true,
    },
    orderBy: {
      price_pick_up: "asc"
    }
  });
  console.table(products);
  return;
})();
async function add_cosas() {
  const product_categories = await import_prisma.prisma.product_category.findMany({
    where: {
      organization_id
    },
    select: {
      id: true,
      name: true
    }
  });
  console.table(product_categories);
  const categories_should_had_modification = [
    "f5cb1296-2672-47d8-a5ed-6c0272a83d9e",
    // 'Whisky
    "ac7473e7-3dd5-41d1-a6a3-3197cfe12cbc",
    // 'GINEBRA
    "694f9304-6e6e-4061-9706-8dc3ee031e59",
    // 'RON
    "2ca53a9d-54b8-4357-b440-b34f45b7bb5e"
    // 'VOZKA
  ];
  const categories_to_add = [
    "3a14a975-2b91-49d7-a953-a4abe0fec4bd"
    // 'BEBIDAS 1
    // 'ab8ae740-d174-4da5-8e65-85f65daa1f6c', // 'BEBIDAS
    // '972571e0-450c-4f12-8d7e-a311e8193152', // 'BEBIDAS 2
    // 'ee6e0e35-c63a-463f-bdcb-98586b2d583e', // 'REFRESCOS
  ];
  console.log(
    "A\xF1adiendo categorias a las categorias que deberian tener modificacion"
  );
  for (const category of categories_should_had_modification) {
    await import_prisma.prisma.product_category_has_other_product_category.createMany({
      data: categories_to_add.map((c2) => {
        return {
          id: category,
          pc_id: c2,
          o: 2,
          pi: 0
        };
      })
    });
  }
  console.log("Categorias a\xF1adidas");
}
//# sourceMappingURL=script.js.map
