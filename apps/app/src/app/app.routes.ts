import { Route } from '@angular/router';
import { WaiterPage } from './pages/waiter/waiter.page';
import { UsersPage } from './pages/admin/pages/users/users.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { OrganizationsAdminPage } from './pages/admin/pages/organizations/organizations.page';
import { AccessAdminPage } from './pages/admin/pages/organizations/pages/access/access-admin.page';
import { EatingTablesConfigurationAdminPage } from './pages/admin/pages/organizations/pages/eating-tables-configuration/eating-tables-configuration-admin.page';
import { OidokocinaAdminPage } from './pages/admin/pages/organizations/pages/oidokocina/oidokocina-admin.page';
import { PrinterJobsPage } from './pages/admin/pages/organizations/pages/printer-jobs/printer-jobs.page';
import { ProductCategoriesAdminPage } from './pages/admin/pages/organizations/pages/product-categories/product-categories-admin.page';
import { ProductsAdminPage } from './pages/admin/pages/organizations/pages/products/products-admin.page';
import { ProductSizesAdminPage } from './pages/admin/pages/organizations/pages/product-sizes/product-sizes-admin.page';
import { QrAdminPage } from './pages/admin/pages/organizations/pages/qr/qr-admin.page';
import { PrinterConfigPage } from './pages/admin/pages/organizations/pages/printer-config/printer-config.page';
import { AppConfigsPage } from './pages/admin/pages/app-configs/app-configs.page';
import { LocalConfigurationPrintersPage } from './pages/admin/pages/local-configuration-printers/local-configuration-printers.page';
import { OrdersComponent } from './pages/admin/pages/organizations/pages/orders/orders.component';
import { ProductsInCategoryPage } from './pages/admin/pages/organizations/pages/qr/products-in-category/products-in-category.page';
import { CommanderPage } from './pages/admin/pages/organizations/pages/commander/commander.page';
import { IngredientsPage } from './pages/admin/pages/organizations/pages/ingredients/ingredients.page';
import { IngredientsMasiveConfigPage } from './pages/admin/pages/organizations/pages/ingredients-masive-config/ingredients-masive-config.page';
import { ConfigurationIngredientsProductPage } from './pages/admin/pages/organizations/pages/configuration-ingredients-product/configuration-ingredients-product.page';
import { ClientPage } from './pages/admin/pages/organizations/pages/client/client.page';
import { ProductCategoryPage } from './pages/admin/pages/organizations/pages/product-category/product-category.page';
import { ProductsReorderKomanderoOnePage } from './pages/admin/pages/organizations/pages/products-reorder-komandero-one/products-reorder-komandero-one.page';
import { InvoicesPage } from './pages/admin/pages/organizations/pages/invoices/invoices.page';
import { OrganizationOidokocinaPage } from './pages/admin/pages/organizations/pages/organization-oidokocina/organization-oidokocina.page';
import { ProductPage } from './pages/admin/pages/organizations/pages/products/product/product.page';
import { HomeOrganizationPage } from './pages/admin/pages/organizations/pages/home-organization/home-organization.page';
import { MenuAdminPage } from './pages/admin/pages/menu-admin/menu-admin.page';
import { MenuOrganizationPage } from './pages/admin/pages/organizations/pages/menu-organization/menu-organization.page';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authenticated/admin',
  },
  {
    path: 'authenticated',
    pathMatch: 'full',
    redirectTo: 'authenticated/admin',
  },
  // {
  //   path: 'authenticated/waiter',
  //   component: WaiterPage,
  //   pathMatch: 'full'
  // },
  {
    path: 'authenticated/admin',
    component: MenuAdminPage,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersPage,
      },
      {
        path: 'local-configuration-printers',
        component: LocalConfigurationPrintersPage,
      },
      {
        path: 'app-configs',
        component: AppConfigsPage,
      },
      {
        path: 'organizations',
        component: OrganizationsAdminPage,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'authenticated/admin/organizations/:organization_id',
    component: MenuOrganizationPage,
    children: [
      {
        path: '',
        component: HomeOrganizationPage,
      },
      {
        path: 'access',
        component: AccessAdminPage,
      },
      {
        path: 'eating-tables-configuration',
        component: EatingTablesConfigurationAdminPage,
      },
      {
        path: 'oidokocina',
        component: OidokocinaAdminPage,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'ingredients',
        component: IngredientsPage,
      },
      {
        path: 'ingredients-masive-config',
        component: IngredientsMasiveConfigPage,
      },
      {
        path: 'configuration-ingredients-product',
        component: ConfigurationIngredientsProductPage,
      },
      {
        path: 'printer-jobs',
        component: PrinterJobsPage,
      },
      {
        path: 'printer-config',
        component: PrinterConfigPage,
      },
      {
        path: 'product-categories',
        component: ProductCategoriesAdminPage,
        pathMatch: 'full',
      },
      {
        path: 'product-categories/:category_id',
        component: ProductCategoryPage,
      },
      {
        path: 'products',
        component: ProductsAdminPage,
      },
      {
        path: 'products/:product_id',
        component: ProductPage,
      },
      {
        path: 'products-reorder',
        component: ProductsReorderKomanderoOnePage,
      },
      {
        path: 'product-sizes',
        component: ProductSizesAdminPage,
      },
      {
        path: 'qr',
        component: QrAdminPage,
      },
      {
        path: 'qr/:category_id',
        component: ProductsInCategoryPage,
      },
      {
        path: 'commander',
        component: CommanderPage,
      },
      {
        path: 'client',
        component: ClientPage,
      },
      {
        path: 'invoices',
        component: InvoicesPage,
      },
      {
        path: 'organization-oidokocina',
        component: OrganizationOidokocinaPage,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
