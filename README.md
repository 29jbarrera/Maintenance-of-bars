# APPS

### APP

IMPORTANTE: A veces peta al mover archivos o añadirlos y hay que ejecutar `nx reset`.

Para hacer cambios en la libreria server y que se muestren en el resto de proyectos sin tener que matar el proceso y volver a ejecutarlo, hay que ejecutar en una terminal el siguiente comando.

```bash
nx build server --watch
```

Aplicación principal

```bash
Dentro de nx proyects app -> serve -> development
Dentro de nx proyects komandero-server -> serve -> development

nx serve app
```

API

```bash
nx serve komandero-server
```

He dejado estos comandos en NPM Scripts para poder ejecutarlo facilmente

### FIN

```scss
.iframe-container {
  position: relative;
  width: 100vw; /* Ajusta el contenedor al ancho de su contenedor padre */
  // padding-top: 56.25%; /* Proporción de aspecto de 16:9 */
  overflow: hidden;
  height: 100vh;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

```html
<div class="iframe-container">
  <iframe src="https://administracion.plataforma.komandero.es" frameborder="0" allowfullscreen="true" width="100vw" height="100vh"></iframe>
</div>
```

primeng primeicons
primeflex
@ngx-formly/core @ngx-formly/primeng
npm install @ionic/angular@latest

# MAQUETACION PAGES

<!-- Ecabezado -->

<app-header-app [title]="'Nombre Header'" [can_back]="true | false" (go_back)="goBack()"></app-header-app>

<!-- Contenido -->
<ion-content class="ion-padding">
  <section class="container-router-outlet`">

    CONTENIDO DE LA PAGINA

  <section>
<ion-content>

# PAGINAS /authenticated/admin

- Usuarios

  - Crear Usuarios
  - Tabla con Usuarios

- Organizaciones

  - Listado Organizaciones (Buscador)
  - Modal Crear Organizacion (TODO: Mover funcionalidad al padre)

- Organizaciones - Organizacion
  Realizado:

  - Accesos (TODO: Cambios visuales, Funcionalidad)
  - Pedidos
  - OidoKocina
  - Tickets
  - Configuración Encabezado Ticket
  - Categoría de Productos
  - Productos (TODO: Tamaños Productos y Precios Tamaños Productos)

- Configuración Local Impresoras

## TODO:

- organizations/:organization_id:

  - Accesos (TODO: Cambios visuales, Funcionalidad)
  - Configuración Tablas de Comida (/eating-tables-configuration)
  - Impresiones (/printing)
  - Tamaños de productos ???
  - QR

- Configuraciones ??

## LOADING

```javascript
  const loading = await this._loadingController.create({
    backdropDismiss: false,
    mode: 'ios',
    spinner: 'dots',
    duration: 0,
  });

  await loading.present();


  await loading.dissmis()

```

## IDENTIFICADORES

Ejemplo Componente (Pagina Productos)

- Cada item = [id]="'product-item' + product.id"
- Cada button dentro item = [id]="'product-item-{action*}' + product.id"

*action = delete | edit | view | create ....
