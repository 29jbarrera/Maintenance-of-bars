var import_prisma = require("./prisma");
async function main() {
  const old_organization_id = "fa7accf2-b195-4a35-bc53-e71dcb154df2";
  const organization_id = "b4a6384e-cdc5-4223-9d86-937df1c2dc96";
  const organization_created = await import_prisma.prisma.organization.upsert({
    create: {
      id: organization_id,
      name: "Hoteles Garbell",
      billing_address: "San Sebasti\xE1n 17",
      billing_name: "Hoteles Garbell SL",
      billing_identifier: "B91842385",
      letterhead: [
        {
          style: "B",
          text: "Hoteles Garbell",
          size_x: 3,
          align: "ct",
          size_y: 2,
          font: "B"
        },
        {
          style: "NORMAL",
          text: "",
          size_x: 1,
          align: "ct",
          size_y: 1,
          font: "a"
        },
        {
          style: "NORMAL",
          text: "",
          size_x: 1,
          align: "ct",
          size_y: 1,
          font: "a"
        },
        {
          style: "NORMAL",
          text: "B91842385",
          size_x: 1,
          align: "ct",
          size_y: 1,
          font: "a"
        },
        {
          style: "NORMAL",
          text: "San Sebasti\xE1n, 17, Marchena 41620",
          size_x: 1,
          align: "ct",
          size_y: 1,
          font: "a"
        },
        {
          style: "NORMAL",
          text: "",
          size_x: 1,
          align: "ct",
          size_y: 1,
          font: "a"
        }
      ]
    },
    update: {},
    where: {
      id: organization_id
    }
  });
  const user = await import_prisma.prisma.user.findFirstOrThrow({
    where: {
      email: "damian@kissandcode.com"
    }
  });
  await import_prisma.prisma.user_has_access_to_organization.upsert({
    create: {
      o_id: organization_id,
      u_id: user.id
    },
    update: {},
    where: {
      u_id_o_id: {
        o_id: organization_id,
        u_id: user.id
      }
    }
  });
  const role = "user_manager";
  await import_prisma.prisma.user_has_role_in_organization.upsert({
    create: {
      o_id: organization_id,
      u_id: user.id,
      role
    },
    update: {},
    where: {
      u_id_o_id_role: {
        u_id: user.id,
        o_id: organization_id,
        role
      }
    }
  });
  console.log("Organization created");
  let total = 0;
  console.log("Copying categories");
  const product_categories = await import_prisma.prisma.product_category.findMany({
    where: { organization_id: old_organization_id }
  });
  const category_obj = {};
  for (const product_category2 of product_categories) {
    const obj = {
      ...product_category2,
      organization_id
    };
    delete obj.id;
    const product_category_created = await import_prisma.prisma.product_category.create({
      data: obj
    });
    category_obj[product_category2.id] = product_category_created.id;
  }
  total = Object.keys(category_obj).length;
  console.log(`Categories copied: ${total}/${product_categories.length}`);
  total = 0;
  console.log("Copying prices");
  const product_sizes = await import_prisma.prisma.product_size.findMany({
    where: { organization_id: old_organization_id }
  });
  const product_sizes_obj = {};
  for (const product_size2 of product_sizes) {
    const obj = {
      ...product_size2,
      organization_id
    };
    delete obj.id;
    const product_size_created = await import_prisma.prisma.product_size.create({
      data: obj
    });
    product_sizes_obj[product_size2.id] = product_size_created.id;
  }
  total = Object.keys(product_sizes_obj).length;
  console.log(`Prices copied: ${total}/${product_sizes.length}`);
  total = 0;
  console.log("Copying products");
  const products = await import_prisma.prisma.product.findMany({
    where: {
      organization_id: old_organization_id
    }
  });
  for (const product2 of products) {
    const product_category_id = category_obj[product2.product_category_id];
    const _product_size_price = await import_prisma.prisma.product_size_price.findMany({
      where: {
        product_id: product2.id
      }
    });
    const obj = {
      ...product2,
      organization_id,
      product_category_id,
      product_size_price: {
        createMany: {
          data: _product_size_price.map((p) => {
            const product_size_id = product_sizes_obj[p.product_size_id];
            return {
              product_size_id,
              organization_id,
              order: p.order,
              price: p.price,
              qr_o: p.qr_o,
              qr_v: p.qr_v,
              w_v: p.w_v
            };
          })
        }
      }
    };
    delete obj.id;
    await import_prisma.prisma.product.create({
      data: obj
    });
  }
  console.log(`Products copied: ${products.length}`);
}
//# sourceMappingURL=main.js.map
