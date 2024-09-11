var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var products_exports = {};
__export(products_exports, {
  products: () => products
});
module.exports = __toCommonJS(products_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const products = (0, import_serverTRPC.router)({
  get_product_by_id: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, id } = input;
    const product = await import_prisma.prisma.product.findUniqueOrThrow({
      where: {
        organization_id,
        id
      },
      include: {
        product_size_price: {
          include: {
            product_size: true
          }
        },
        ingredient_product: {
          include: {
            ingredient: true
          },
          orderBy: {
            ingredient: {
              name: "asc"
            }
          }
        },
        product_modification: {
          include: {
            app_product_modification: true
          },
          orderBy: {
            app_product_modification: {
              name: "asc"
            }
          }
        }
      }
    });
    const categories = await import_prisma.prisma.product_category.findMany({
      where: {
        organization_id
      },
      orderBy: {
        priority_u: "asc"
      }
    });
    const _product = {
      ...product,
      product_modification: product.product_modification.map((m) => {
        return {
          ...m,
          apm: m.apm.toString(),
          app_product_modification: {
            ...m.app_product_modification,
            id: m.app_product_modification.id.toString(),
            apmg: m.app_product_modification.apmg?.toString()
          }
        };
      })
    };
    return {
      _product,
      categories,
      product_size_price: product.product_size_price
    };
  }),
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization_id = input.organization_id;
    const _products = await import_prisma.prisma.product.findMany({
      where: { organization_id },
      // select: {
      //   id: true,
      //   name: true,
      //   name_i: true,
      //   priority: true,
      //   priority_ko: true,
      //   priority_u: true,
      //   product_category_id: true,
      //   price_pick_up: true,
      //   price_delivery: true,
      //   price_take_away: true,
      // },
      include: {
        product_size_price: {
          include: {
            product_size: true
          }
        },
        product_modification: {
          include: {
            app_product_modification: true
          }
        },
        ingredient_product: {
          include: {
            ingredient: true
          }
        }
      }
    });
    const categories = await import_prisma.prisma.product_category.findMany({
      where: {
        organization_id
      },
      orderBy: {
        priority_u: "asc"
      }
    });
    const products2 = _products.map((product) => {
      return {
        ...product,
        product_modification: product.product_modification.map((pm) => {
          return {
            ...pm,
            apm: (pm.apm || "").toString(),
            app_product_modification: {
              ...pm.app_product_modification,
              id: pm.app_product_modification.id.toString(),
              apmg: (pm.app_product_modification.apmg || "").toString()
            }
          };
        })
      };
    });
    return { products: products2, categories };
  }),
  get_all_to_reorder: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      products_ids: z.array(z.string().uuid())
    })
  ).mutation(async ({ ctx, input }) => {
    const organization_id = input.organization_id;
    const products2 = await import_prisma.prisma.product.findMany({
      where: {
        organization_id,
        id: {
          in: input.products_ids
        }
      },
      select: {
        id: true,
        name: true,
        priority: true,
        priority_ko: true,
        priority_u: true
      }
    });
    return products2;
  }),
  delete: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const product_deleted = await import_prisma.prisma.product.delete({
      where: {
        id: input.id,
        organization_id: input.organization_id
      }
    });
    return { product_deleted };
  }),
  saver_order_waiter: import_serverTRPC.publicProcedure.input(
    z.object({
      products_to_save: z.array(
        z.object({
          id: z.string().uuid(),
          priority_u: z.number()
        })
      )
    })
  ).mutation(async ({ ctx, input }) => {
    const products2 = input.products_to_save;
    let i = -1;
    for (const product of products2) {
      const priority = products2.slice(i)[0].priority_u;
      i--;
      await import_prisma.prisma.product.update({
        where: { id: product.id },
        data: { priority, priority_u: priority, priority_ko: priority }
      });
    }
    return { products: products2 };
  }),
  create_product: import_serverTRPC.publicProcedure.input(
    z.object({
      name: z.string(),
      name_i: z.string(),
      price_take_away: z.number(),
      price_delivery: z.number(),
      price_pick_up: z.number(),
      organization_id: z.string().uuid(),
      product_category_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const {
      name,
      name_i,
      price_take_away,
      price_delivery,
      price_pick_up,
      organization_id,
      product_category_id
    } = input;
    const product_created = await import_prisma.prisma.product.create({
      data: {
        name,
        name_i,
        price_take_away,
        price_delivery,
        price_pick_up,
        organization_id,
        product_category_id
      }
    });
    return product_created;
  }),
  edit_product: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      name_i: z.string(),
      price_take_away: z.number(),
      price_delivery: z.number(),
      price_pick_up: z.number(),
      organization_id: z.string().uuid(),
      product_category_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const updated_product = await import_prisma.prisma.product.update({
      where: {
        id: input.id,
        organization_id: input.organization_id
      },
      data: {
        name: input.name,
        name_i: input.name_i,
        price_take_away: input.price_take_away,
        price_delivery: input.price_delivery,
        price_pick_up: input.price_pick_up,
        organization_id: input.organization_id,
        product_category_id: input.product_category_id
      }
    });
    return updated_product;
  }),
  get_by_id: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const product = await import_prisma.prisma.product.findFirst({
      where: {
        id: input.id,
        organization_id: input.organization_id
      },
      include: {
        product_size_price: {
          include: {
            product_size: true
          }
        },
        product_modification: {
          include: {
            app_product_modification: true
          }
        },
        ingredient_product: {
          include: {
            ingredient: true
          }
        }
      }
    });
    return product;
  }),
  get_products_with_ingredients: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization_id = input.organization_id;
    const products2 = await import_prisma.prisma.product.findMany({
      where: { organization_id },
      orderBy: { name: "desc" },
      include: {
        ingredient_product: {
          orderBy: {
            ingredient: {
              name: "asc"
            }
          },
          include: {
            ingredient: true
          }
        }
      }
    });
    return products2;
  }),
  update_ingredient_product_active_or_desactive: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      ingredient_id: z.string().uuid(),
      product_id: z.string().uuid(),
      active: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, ingredient_id, product_id, active } = input;
    const update = await import_prisma.prisma.ingredient_product.update({
      data: {
        default: !active
      },
      where: {
        ingredient_id_product_id: {
          ingredient_id,
          product_id
        }
      }
    });
    return update;
  }),
  add_ingredient_to_product: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      ingredients_ids: z.array(z.string()),
      product_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, ingredients_ids, product_id } = input;
    let created_ingredients_to_product = [];
    for (const ingredient_id of ingredients_ids) {
      const created = await import_prisma.prisma.ingredient_product.create({
        data: {
          ingredient_id,
          organization_id,
          product_id
        },
        include: {
          ingredient: true
        }
      });
      created_ingredients_to_product.push(created);
    }
    return { created_ingredients_to_product };
  }),
  remove_ingredient_to_product: import_serverTRPC.publicProcedure.input(
    z.object({
      ingredient_id: z.string().uuid(),
      product_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { ingredient_id, product_id } = input;
    await import_prisma.prisma.ingredient_product.delete({
      where: {
        ingredient_id_product_id: {
          ingredient_id,
          product_id
        }
      }
    });
    return true;
  }),
  edit_ingredient_to_product: import_serverTRPC.publicProcedure.input(
    z.object({
      ingredient_id: z.string().uuid(),
      product_id: z.string().uuid(),
      price: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { ingredient_id, product_id, price } = input;
    const ingredient_updated = await import_prisma.prisma.ingredient_product.update({
      where: {
        ingredient_id_product_id: {
          ingredient_id,
          product_id
        }
      },
      data: {
        price
      }
    });
    return { ingredient_updated };
  }),
  update_priority: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      products: z.array(
        z.object({
          id: z.string().uuid(),
          num: z.number()
        })
      ),
      // prior only can 'priority' | 'priority_ko' | 'priority_u';
      prior: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    for (const product of input.products) {
      const { id, num } = product;
      const prior = input.prior;
      await import_prisma.prisma.product.update({
        where: {
          id,
          organization_id: input.organization_id
        },
        data: {
          [prior]: num
        }
      });
    }
    return { success: true };
  }),
  edit_product_size_price: import_serverTRPC.publicProcedure.input(
    z.object({
      product_size_id: z.string().uuid(),
      product_id: z.string().uuid(),
      price: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { product_size_id, product_id, price } = input;
    const updated_product_size_price = await import_prisma.prisma.product_size_price.update(
      {
        where: {
          product_id_product_size_id: {
            product_size_id,
            product_id
          }
        },
        data: {
          price
        },
        include: {
          product_size: true
        }
      }
    );
    return { updated_product_size_price };
  }),
  delete_product_size_prices: import_serverTRPC.publicProcedure.input(
    z.object({
      product_size_id: z.string().uuid(),
      product_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { product_size_id, product_id } = input;
    const product_size_deleted = await import_prisma.prisma.product_size_price.delete({
      where: {
        product_id_product_size_id: {
          product_size_id,
          product_id
        }
      }
    });
    return { product_size_deleted };
  }),
  add_product_size_to_product: import_serverTRPC.publicProcedure.input(
    z.object({
      product_id: z.string().uuid(),
      product_size_id: z.string().uuid(),
      price: z.number(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { product_id, product_size_id, price, organization_id } = input;
    const add_product_size_price = await import_prisma.prisma.product_size_price.create({
      data: {
        price,
        organization_id,
        product_id,
        product_size_id
      },
      include: {
        product_size: true
      }
    });
    return { add_product_size_price };
  }),
  get_all_modifiers: import_serverTRPC.publicProcedure.mutation(async ({ ctx, input }) => {
    const modifiers_availables = await import_prisma.prisma.app_product_modification_group.findMany({
      include: { app_product_modification: true }
    });
    return modifiers_availables.map((modifier) => {
      return {
        id: modifier.id.toString(),
        name: modifier.name,
        app_product_modification: modifier.app_product_modification.map(
          (modification) => ({
            name: modification.name,
            id: modification.id.toString(),
            apmg: modification.apmg.toString()
          })
        )
      };
    });
  }),
  create_product_modification: import_serverTRPC.publicProcedure.input(
    z.object({
      p_id: z.string().uuid(),
      apm: z.array(z.string()),
      o: z.number(),
      pi: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { p_id, apm, o, pi } = input;
    const _apm_to_bigint = apm.map((a) => BigInt(a));
    let modifiers_created = [];
    for (const _apm of _apm_to_bigint) {
      const create = await import_prisma.prisma.product_modification.create({
        data: {
          p_id,
          apm: _apm,
          o,
          pi
        },
        include: {
          app_product_modification: true
        }
      });
      modifiers_created.push(create);
    }
    return modifiers_created.map((m) => {
      return {
        ...m,
        apm: m.apm.toString(),
        app_product_modification: {
          ...m.app_product_modification,
          id: m.app_product_modification.id.toString(),
          apmg: m.app_product_modification.apmg?.toString()
        }
      };
    });
  }),
  edit_product_modification_by_id: import_serverTRPC.publicProcedure.input(
    z.object({
      p_id: z.string().uuid(),
      apm: z.string(),
      pi: z.number(),
      o: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { p_id, apm, pi, o } = input;
    const _apm_bigint = BigInt(apm);
    const update = await import_prisma.prisma.product_modification.update({
      where: {
        p_id_apm: {
          p_id,
          apm: _apm_bigint
        }
      },
      data: {
        pi,
        o
      },
      include: {
        app_product_modification: true
      }
    });
    const updated_modification = {
      ...update,
      apm: update.apm.toString(),
      app_product_modification: {
        ...update.app_product_modification,
        id: update.app_product_modification.id.toString(),
        apmg: update.app_product_modification.apmg?.toString()
      }
    };
    return { updated_modification };
  }),
  remove_product_modification: import_serverTRPC.publicProcedure.input(
    z.object({
      p_id: z.string().uuid(),
      apm: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { p_id, apm } = input;
    const _apm = BigInt(apm);
    const removed_product_modification = await import_prisma.prisma.product_modification.delete({
      where: {
        p_id_apm: {
          p_id,
          apm: _apm
        }
      }
    });
    return true;
  }),
  edit_order_and_visualization: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      product_category_id: z.string().uuid(),
      priority: z.number(),
      priority_ko: z.number(),
      priority_u: z.number(),
      qr_o: z.number(),
      w_v: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const {
      id,
      organization_id,
      product_category_id,
      priority,
      priority_ko,
      priority_u,
      qr_o,
      w_v
    } = input;
    const edit_order_and_visualization = await import_prisma.prisma.product.update({
      where: {
        id,
        organization_id,
        product_category_id
      },
      data: {
        priority,
        priority_ko,
        priority_u,
        qr_o,
        w_v
      }
    });
    return { edit_order_and_visualization };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  products
});
//# sourceMappingURL=index.js.map
