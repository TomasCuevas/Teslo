# Teslo: Readme

Autor: Anselmo Tomas Cuevas  
Ultima actualización: 2022-12-6

## Contenido

- [Objetivo](#objetivo)
- [Metas](#metas)
- [Background](#background)
- [Diseño detallado](#diseño-detallado)
  - [Frontend](#frontend)
    - [Pagina de autenticacion](#pagina-de-autenticacion)
    - [Pagian de registro](#pagina-de-registro)
    - [Pagina principal](#pagina-principal)
    - [Pagina por Categoria](#pagina-por-categoria)
    - [Pagina de producto](#pagina-de-producto)
    - [Pagina del carrito](#pagina-del-carrito)
    - [Pagina de direccion](#pagina-de-direccion)
    - [Pagina de resumen](#pagina-de-resumen)
    - [Pagina de orden](#pagina-de-orden)
    - [Pago de la orden](#pago-de-la-orden)
    - [Pagina de historial de ordenes](#pagina-de-historial-de-ordenes)
    - [Pagina de buscado de productos](#pagina-de-buscado-de-productos)
    - [Dashboards administrativos](#dashboards-administrativos)
    - [Verificar Autenticacion](#verificar-autenticacion)
    - [Verificar Administrador](#verificar-administrador)
  - [Backend](#backend)
    - [APIs de cliente](#apis-de-cliente)
    - [APIs de administrador](#apis-de-administrador)
- [Estilo de la aplicacion](#estilo-de-la-aplicacion)
- [Ejecutar en modo desarrollo](#ejecutar-en-modo-desarrollo)

## Objetivo

Proyecto personal de **Anselmo Tomas Cuevas**, creando un Ecommerce, con el fin de aprender NextJs junto con librerias extras como _swr, NextAuth, MaterialUI, Cloudinary, Tailwind, Axios, etc._ Utilizando MongoDB como base de datos y mongoose como ORM.

[⬆️ Volver al indice](#contenido)

## Metas

- Pagina de autenticacion **(login y register).**
- Pagina principal, donde se listen todos los productos que existan en la base de datos.
- Pagina por categoria _(hombres, mujeres, niños)._
- Pagina dedicada a cada producto.
- Elegir cantidad de items, talla de producto y agregar producto al carrito.
- Pagina de carrito donde se listen todos los productos del mismo y el total a pagar.
- Pagina para establecer la direccion y datos del usuario.
- Pagina de resumen y confirmacion de la orden.
- Pago con PayPal.
- Pagina donde el usuario pueda ver todas sus ordenes.
- Buscador de productos.
- Dashboards administrativo.
- Verificacion de autenticacion y autorizacion.
- Verificacion de admin
- Backend con apis para los clientes:
  - API de usuarios: Para registrarse y iniciar sesion.
  - API de productos: Para obtener todos los productos o individualmente.
  - API de ordenes: Para obtener todas las ordenes del usuario o individualmente. Crear y pagar orden.
  - API para realizar busquedas de productos.
- Backend con apis para los administradores:
  - API de usuarios: Para obtener todos los usuarios de la aplicacion y poder cambiarle el role a los mismos.
  - API de productos: Para poder obtener todos los productos, actualizar o crear un nuevo producto.
  - API de ordenes: Para obtener todas las ordenes generadas en la aplicacion o individualmente.
  - API para obtener los datos para el dashboard principal.
  - API para poder subir las imagenes de los productos.

[⬆️ Volver al indice](#contenido)

## Background

Estuve aprendiendo NextJs, junto con demas herramientas, y me propuse a mejorar una aplicacion que realice en un curso tomado sobre Next. Mejorar el diseño, el performance y agregar funcionalidades extras, asi como la legibilidad del codigo y la estructura de los archivos.

[⬆️ Volver al indice](#contenido)

## Diseño detallado

## Frontend

---

### Pagina de autenticacion

![image](https://user-images.githubusercontent.com/79057608/205643591-f97b42fc-9f0b-42fa-bc4e-c85432895e75.png)

Para la autenticacion, esta aplicacion utiliza la libreria de **NextAuth**. Esta ofrece multiples formas de realizar una autenticacion. Aqui, tendremos 2 formas de autenticacion.

- Credenciales (email y password).
- Github

#### Credentials

Cuando se autentica mediante las credenciales, tras dar en _Ingresar_, se llama a la funcion **onLoginUser**, a la cual, se le pasa el email y el password ingresado por el usuario. Dentro de esta funcion, se hace uso de la funcion **signIn**, proporcionada por **NextAuth**. Esta se encarga de realizar la autenticacion junto al backend de nuestra aplicacion.

![image](https://user-images.githubusercontent.com/79057608/205662112-7d80c86c-5549-4a36-ba03-00c7549a575f.png)

#### Github

Para realizar el renderizado del boton de la autenticacion mediante **Github**, se debe utilizar la funcion **getProviders**, proporcionada por **NextAuth**, para obtener todos los providers configurados. Estos providers los establecemos en un estado local de nuestra pagina.

```ts
const [providers, setProviders] = useState<any>({});

getProviders().then((prov) => {
  setProviders(prov);
});
```

Tras tener todos los providers configurados, debemos renderizarlos en nuestra pagina de la siguiente manera:

```ts
{
  Object.values(providers).map((provider: any) => {
    if (provider.id! === "credentials") return <div key={provider.id}></div>;

    return (
      <Button
        key={provider.id}
        variant="outlined"
        fullWidth
        color="primary"
        sx={{ mb: 1, borderRadius: "30px" }}
        onClick={() => signIn(provider.id)}
      >
        {provider.name}
      </Button>
    );
  });
}
```

Todos los providers que sean diferentes de _credentials_, devolveran un buton con el nombre del provider al cual pertenece. Al hacer click en tales botones, se ejecutara la funcion **signin** proporcionada por **NextAuth**.

Al realizar el login con Github, _NextAuth_ se encarga de la logica necesaria, obteniendo las credenciales desde Github y realizando la autenticacion con el backend de nuestra aplicacion.

[⬆️ Volver al indice](#contenido)

---

### Pagina de registro

![image](https://user-images.githubusercontent.com/79057608/205664500-a6e5a773-c607-49bf-8759-1937135b5a73.png)

Esta pagina, utiliza un context **(AuthContext)**, para obtener el metodo **onRegister**, que se encarga de realizar la peticion hacia el backend, enviando los datos que el usuario ingreso en el formulario.

```ts
const { onRegister } = useContext(AuthContext);
```

El metodo **onRegister** se llama desde la funcion **onLoginUser**, que se encuentra en la misma pagina, cuando el usuario haya completado el formulario y haya hecho click en _Registrarse_.

![image](https://user-images.githubusercontent.com/79057608/205663481-0a4402dd-76c5-4c79-b267-7e1891c00671.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina principal

La pagina principal, hace uso de un CustomHook **(useGetProducts)** para obtener todos los productos desde la base de datos. Dentro de la pagina principal, hay un componente que se encarga de renderizar en pantalla todos estos productos.

```ts
const { products } = useGetProducts("/products");
```

![image](https://user-images.githubusercontent.com/79057608/205496270-35085adc-aa9f-4eec-979d-293e246b4537.png)

![image](https://user-images.githubusercontent.com/79057608/204804391-db8793bb-b43a-43ec-a559-669d762ddf87.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina por categoria

Hay 3 categorias (hombres, mujeres y niños). Cada una de ellas tiene su propia pagina dedicada y todas funcionan igual.

Las 3 paginas, al igual que la pagina principal, hacen uso del CustomHook **(useGetProducts)** para obtener los productos de la base de datos. Y luego, dentro de cada una de ellas, hay un componente encargado de renderizar los productos obtenidos.

```ts
const { products } = useGetProducts("/products?gender=men");
const { products } = useGetProducts("/products?gender=women");
const { products } = useGetProducts("/products?gender=kid");
```

![image](https://user-images.githubusercontent.com/79057608/205496179-549a037a-b2b0-451f-ad94-f4d43a189818.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina de producto

La pagina de producto, es generada de forma estatica utilizando la funcion **getStaticProps** de NextJs. Esta toma el _slug_ que le llega por parametro y busca el producto en base al slug en la base de datos, utilizando una _serverless function_ y genera la pagina estatica. La pagina, se revalidara cada 7 dias.

```ts
const { slug = "" } = params as { slug: string };
const product = await getProductBySlug(slug);

return {
  props: {
    product,
  },
  revalidate: 60 * 60 * 24 * 7,
};
```

Cuando el usuario ingrese a la url del producto, el servidor le devolvera el html de el mismo.

![image](https://user-images.githubusercontent.com/79057608/204812917-af8313bf-0d46-4f82-9f6a-ea1d19e693d9.png)

![image](https://user-images.githubusercontent.com/79057608/204838011-dc0b7803-2d29-4cec-b33a-2e7244c83721.png)

#### cambiar talla y cantidad de productos

Dentro de esta pagina, hay un estado que se encarga de capturar la talla y la cantidad de items que el usuario seleccione.

Hay 2 metodos que se encargan de modificar este estado. El primero, se encarga de cambiar la talla cuando el usuario haga click en la talla deseada y el segundo, en cambiar la cantidad de productos cuando el usuario cambie esta.

```ts
const onSelectedSize = (size: IValidSizes) => {};

const onSelectedQuantity = (add: boolean) => {};
```

#### agregar al carrito

Todos los productos que esten en el carrito de compras, se establecen en las cookies. Luego, hay un contexto que se encarga de manejar toda la logica de este. Este contexto posee metodos para obtener el carrito, agregar nuevo producto, actualizar cantidad de items, eliminar productos, actualizar direccion del usuario y crear una nueva orden.

En la pagina del producto, obtendremos desde el contexto, el metodo para agregar un producto al carrito.

```ts
const { addProductToCart } = useContext(CartContext);
```

Cuando el usuario, haya elegido la talla y la cantidad de items y haga click en agregar al carrito, se llama este metodo. Este, tomara el producto junto con la talla y la cantidad de items seleccionados y lo establecera en el contexto, al cambiar el contexto, las cookies se actualizan con el nuevo cambio.

Si el producto y la talla agregada ya se encontraban en el carrito, este, actualizara el producto que ya se encontraba en el contexto y tomara la cantidad de items que se encuentran en el contexto y le sumara la nueva cantidad.

[⬆️ Volver al indice](#contenido)

---

### Pagina del carrito

Se hace uso de **CartContext** para obtener la cantidad de items que hay almacenados en el carrito.

```ts
const { numberOfItems } = useContext(CartContext);
```

Dentro de esta pagina, hay un componente **CartList** encargado de renderizar todos los productos almacenados en el carrito. A este componente se le pasa el parametro _editable={true}_, para que dentro de este, se pueda editar la cantidad de items de cada producto o eliminar el producto del carrito si el usuario lo desea.

```ts
<CardList editable={true} />
```

Dentro de CartList, hacemos uso nuevamente del **CartContext** para tomar los productos almacenados en el y los metodos _updateCartQuantity_ y _deleteCart_.

```ts
const {
  cart: { cartItems },
  updateCartQuantity,
  deleteCart,
} = useContext(CartContext);
```

Y por ultimo, renderizamos todos los productos que se encuentren en el carrito.

![image](https://user-images.githubusercontent.com/79057608/204835280-3b26ab9b-a9aa-4740-b005-7c2b3f30d14c.png)

![image](https://user-images.githubusercontent.com/79057608/204837456-34c3fee7-06ba-4e2d-baba-e29956f3711d.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina de direccion

Esta pagina, utiliza el **cartContext** para actualizar los datos de la direccion y obtener el numero de items que hay en el carrito. Si el numeros de items en el carrito es 0, la pantalla no se renderiza y te envia a la pantalla principal.

```ts
const { updateAddress, numberOfItems } = useContext(CartContext);
```

![image](https://user-images.githubusercontent.com/79057608/204850656-7bef91a7-78be-4c78-9ef4-efa5dca87a57.png)

Para el manejo del estado del formulario, se utiliza la libreria **react-hook-form**.

```ts
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<IAddress>({
  defaultValues: getAddressFromCookies(),
});
```

Cuando el usuario click en _revisar pedido_ y este haya completado todos los campos necesarios del formulario, se llama al metodo _updateAddress_ del **CartContext** y esta se encarga de actualizar los datos en el contexto y posteriormente en las cookies, para luego, insertar estos datos en la orden generada.

![image](https://user-images.githubusercontent.com/79057608/205081444-25673be5-aea8-403a-a846-7f34d98c761c.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina de resumen

En esta pagina, se le mostrar al usuario todo lo relacionado a su orden y tambien podra confirmarla aqui mismo.

Para ello, se utiliza el **CartContext** para tomar todos los datos de la orden a generar, que previamente se han establecido en las paginas anteriores. Se tomara el numero de items del carrito y el metodo _createOrder_ que se llamara cuando el usuario de en _Confirmar orden_.

```ts
const { numberOfItems, createOrder } = useContext(CartContext);
```

![image](https://user-images.githubusercontent.com/79057608/205085822-75d87d30-1245-408c-98ef-4b3444876624.png)

El metodo _createOrder_, toma todos los datos de la orden y se los envia al backend. Cuando el backend retorne que fue creado exitosamente. Se enviara al usuario a pagina de la orden generada, donde debera realizar el pago.

![image](https://user-images.githubusercontent.com/79057608/205495961-641cd618-8ae7-48c5-8488-e84756a75efb.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina de orden

En esta pagina, que es unica para cada orden generada, se le muestra al usuario si la orden fue paga o no, y si no lo ha sido, podra pagar su orden mediante _PayPal_.

![image](https://user-images.githubusercontent.com/79057608/205492987-3aeaa175-10a2-4b2b-abf7-62d3d1d3b10f.png)

En esta pagina, se obtiene el id ingresado por parametros en la url y se la envia a un CustomHook **(useGetOrder)**, que es encargado de realizar la peticion http al backend y obtener los datos de la orden si esta existe.

```ts
const { id } = router.query as { id: string };
const { order } = useGetOrder(id, `/api/orders/${id}`, `/orders/${id}`);
```

Si la orden existe, se le muestra al usuario. Si no existe, se envia al usuario a la pagina de historial de ordenes. Y si existe pero el usuario no esta autenticado, se envia al usuario a la pagina de login.

![image](https://user-images.githubusercontent.com/79057608/205495741-6411f10b-8d61-4fa1-bbdb-2e3a793d1902.png)

[⬆️ Volver al indice](#contenido)

---

### Pago de la orden

Para realizar los pagos, se utiliza la libreria **(@paypal/react-paypal-js)**, propia de PayPal. Esta te ofrece todo lo que se necesita para realizar los pagos con PayPal, tanto la logica como la UI de la misma.

![image](https://user-images.githubusercontent.com/79057608/205493716-18dd2387-bd08-481a-8946-bf46d6b60dfe.png)

Para hacer uso de esta, debemos importar los botones de la libreria.

```ts
import { PayPalButtons } from "@paypal/react-paypal-js";
```

Luego, se hacen uso de este componente, pasandole un callback a las propiedades _createOrder_ y _onApprove_. La primera se ejecuta cuando el usuario haga click en el boton, y tras esto, se le envia el monto a pagar a PayPal. La segunda, se ejecuta cuando la transaccion haya terminado, sin importar el estado de la misma.

```ts
<PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${order.total}`,
          },
        },
      ],
    });
  }}
  onApprove={(data, actions) => {
    return actions.order!.capture().then((details) => {
      onOrderCompleted(details);
    });
  }}
/>
```

En _onApprove_, obtenemos el detalle de la transaccion y este mismo, se lo pasamos a una funcion _(onOrderCompleted)_ que se encuentra en nuestro componente, que se encarga de enviar el id de la transaccion y de la orden a nuestro backend, si la transaccion fue exitosa.

```ts
await tesloApi.post("/orders/pay", {
  transactionId: details.id,
  orderId: order._id,
});
```

Y tras todo esto, la orden se marca como pagada en la UI del usuario, y se eliminan los botones de PayPal.

![image](https://user-images.githubusercontent.com/79057608/205494466-6d9ba30f-c577-4305-9c3f-6024468591d0.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina de historial de ordenes

En esta pagina, se hace uso del CustomHook **(useGetOrders)** para obtener todas las ordenes del usuario desde el backend.

Si el usuario no esta autenticado, se lo envia a la pantalla de login, y si el usuario no posee aun ninguna orden, tan solo se muestra la grilla vacia.

![image](https://user-images.githubusercontent.com/79057608/205494586-1dcd905a-728e-4656-8bd7-0a9ea076af65.png)

![image](https://user-images.githubusercontent.com/79057608/205497146-80d5aefe-874e-4d26-8cc4-83d6ed56a6f6.png)

[⬆️ Volver al indice](#contenido)

---

### Pagina de buscado de productos

El buscador de productos, ya sea el del navbar o el del sidebar, siempre redirijen a la pagina **/search**. Esta recibe como parametro, en el url, la busqueda que el usuario haya realizado. Tomara esa busqueda y mediante un CustomHook **(useSearchProducts)**, realizara la busqueda en la base de datos.

![image](https://user-images.githubusercontent.com/79057608/205496751-d719aebb-120c-49bb-91b8-18961bada761.png)

Si no se encuentra nada relacionado con la busqueda realizada, el CustomHook, devolvera todos los productos de la base de datos.

[⬆️ Volver al indice](#contenido)

---

### Dashboards administrativos

Los administradores poseen 4 dashboards principales.

- [Dashboard general](#Dashboard-general)
- [Dashboard de productos](#dashboard-de-productos)
  - [Editar producto](#editar-producto)
- [Dashboard de ordenes](#dashboard-de-ordenes)
- [Dashboard de usuarios](#dashboard-de-usuarios)

---

### Dashboard general

![image](https://user-images.githubusercontent.com/79057608/205497441-5f8c8d75-0cd0-4411-959e-bc835d0cb8aa.png)

Este dashboard, posee informacion resumida de todos los datos de la aplicacion. Estos datos se iran actualizando cada 30 segundos.

Se utiliza **swr** en el propio componente, para obtener la informacion desde el backend, de la siguiente forma:

```ts
const { data } = useSWRInmutable<DashboardSummaryResponse>(
  "/api/admin/dashboard",
  {
    refreshInterval: 30 * 1000,
  }
);
```

![image](https://user-images.githubusercontent.com/79057608/205514707-10f1241e-839c-463f-9cb6-aed4e232b8e7.png)

---

### Dashboard de productos

![image](https://user-images.githubusercontent.com/79057608/205497706-7fe04178-b305-4265-8288-14b9f92b25e9.png)

Este dashboard, posee una tabla paginada, con todos los productos del ecommerce. Estos datos se iran actualizando cada 30 segundos.

Se utiliza **swr** en el propio componente, para obtener la informacion desde el backend, de la siguiente forma:

```ts
const { data: products = [] } = useSWRInmutable<IProduct[]>(
  "/api/admin/products",
  { refreshInterval: 5000 }
);
```

![image](https://user-images.githubusercontent.com/79057608/205517287-1514cb66-243f-4014-b69a-5d0876c7da38.png)

Como dato extra, desde esta pagina, dando click en el **titulo del producto**, te lleva a la pagina dedicada para editar tal producto. Tambien, dando click en el boton **Crear Producto**, te lleva a una pagina para crear un nuevo producto.

---

### Editar producto

![image](https://user-images.githubusercontent.com/79057608/205498091-317b44b5-0e81-4108-bb14-b8b95d309498.png)

En esta pagina, el adminsitrador posee un formulario para poder modificar el producto.

Esta pagina, toma el **slug** del producto, que recibio por la url, y se lo envia a un CustomHook **(useGetProduct)** que es encargado de tomar todos los datos del producto desde el servidor, para luego, ingresarlos en el formulario. Si el producto no existe, devuelve al administrador al dashboard de productos.

```ts
const { slug } = router.query as { slug: string };
const { product } = useGetProduct(slug, "/admin/products");
```

El CustomHook **(useEditProducts)** es encargando de manejar toda la logica del formulario. Por lo que obtenemos todas las propiedades y metodos que este nos ofrece.

```ts
const {
  handleSubmit,
  isSaving,
  onSubmitForm,
  control,
  errors,
  getValues,
  onChangeSize,
  register,
  newTag,
  onAddTag,
  onDeleteImage,
  onDeleteTag,
  onFilesSelected,
  setNewTag,
  isReady,
} = useEditProduct(product);
```

Una vez el administrador de en _Guardar_, la pagina hace uso del metodo _onSubmitForm_ que este ofrece, para guardar los cambios en el servidor.

![image](https://user-images.githubusercontent.com/79057608/205516217-29a8d9f1-46ba-4251-8943-20fe84c38bc6.png)

---

### Dashboard de ordenes

![image](https://user-images.githubusercontent.com/79057608/205517152-38f8a622-3b12-47da-97d9-1caa5967618f.png)

Este dashboard, posee una tabla paginada, con todas las ordenes hechas en la aplicacion. Estos datos se iran actualizando cada 30 segundos.

Para obtener todas las ordenes generadas en la aplicacion desde el backend, se utiliza un CustomHook **(useGetOrders)**.

```ts
const { orders } = useGetOrders("/api/admin/orders", "/admin/orders");
```

Como dato extra, desde esta pagina, dando click en **ver orden**, te lleva a la pagina de dicha orden.

![image](https://user-images.githubusercontent.com/79057608/205517391-2335caef-049b-40f8-a951-38c245a0e692.png)

---

### Dashboard de usuarios

![image](https://user-images.githubusercontent.com/79057608/205517538-0002b983-0fd3-4d4b-ae85-331d70483157.png)

Este dashboard, posee una tabla paginada, con todos los usuarios registrados en la aplicacion. Estos datos se iran actualizando cada 30 segundos.

Se utiliza **swr** en el propio componente, para obtener la informacion desde el backend, de la siguiente forma:

```ts
const { data: users = [] } = useSWRInmutable<IUser[]>("/api/admin/users", {
  refreshInterval: 1000 * 30,
});
```

Como dato extra, desde esta pagina se puede cambiar el role de un usuario de _client_ a _admin_ o a la inversa.

![image](https://user-images.githubusercontent.com/79057608/205517726-203370f5-2b3f-400f-93a2-0e885f90e4a5.png)

Al realizar el cambio, el componente llama a la funcion **onRoleUpdated** enviando el role seleccionado. Esta funcion se encarga de hacer la peticion al backend con el neuvo role asignado al usuario.

```ts
onChange={({ target }) => onRoleUpdated(row.id, target.value)}
```

```ts
const onRoleUpdated = async (userId: string, newRole: string) => {
  try {
    await tesloApi.put("/admin/users", { userId, newRole });
  } catch (error) {
    console.log(error);
    alert("No se pudo actualizar el role del usuario.");
  }
};
```

![image](https://user-images.githubusercontent.com/79057608/205518464-fcb32a4f-3130-4ead-993d-28427c2861b6.png)

[⬆️ Volver al indice](#contenido)

---

### Verificar Autenticacion

Cuando una pagina requiere que el usuario se encuentre autenticado para poder mostrarse, se utiliza un CustomHook **(useAuthenticated)**, de este, desestructuramos la propiedad **isAuthenticated** que posee 3 posibles valores: **'loading'**, **'authenticated'** o **'unauthenticated'**.

```ts
const { isAuthenticated } = useAuthenticated();
```

Las paginas que requieran autenticacion, por defecto, retornan un loader, mientras se comprueba el estado de la autenticacion.

```ts
return <FullScreenLoading />;
```

Si el usuario no se encuentra autenticado **(isAuthenticated = 'unauthenticated')**, entra en una condicional, que lo redirije a la ruta que se establezca.

```ts
const query = "/";
if (isAuthenticated === "unauthenticated") router.replace(query);
```

Y si el usuario, se encuentra autenticado **(isAuthenticated = 'authenticated')**, entra en otra condicional, que retorna la pagina visitada.

```ts
if (isAuthenticated === "authenticated") {
  return (
    <h1>Pagina</h1>
    <p>Do eu id non aute cupidatat commodo magna.</p>
    <p>Incididunt dolore esse veniam in reprehenderit.</p>
  );
}
```

El CustomHook **(useAuthenticated)**, en su interior, utiliza el metodo **useSesion** que provee **NextAuth**, para verificar si el usuario esta o no autenticado.

[⬆️ Volver al indice](#contenido)

---

### Verificar Administrador

Cuando una pagina, requiere que el usuario sea administrador para mostrarse, se utiliza el CustomHook **(useAdmin)**, de este, desestructuramos la propiedad **isAdmin**, un booleano que indica si el usuario autenticado es o no administrador.

```ts
const { isAdmin } = useAdmin();
```

Las paginas que requieran que el usuario sea administrador, por defecto, retornan un loader. Mientras se comprueba si el usuario es o no administrador.

```ts
return <FullScreenLoading />;
```

Si el usuario no es administrador o no esta autenticado, desde el CustomHook, se redirije al usuario a la pagina que se le paso como parametro a este.

```ts
const { isAdmin } = useAdmin("/", '/admin);

export const useAdmin = (redirectTo, query) => {
  const { data: session, status } = useSession();

  if (session.user !== 'admin) {
    router.push(redirectTo);
  }

  if (status === 'unauthenticated') {
    router.push(`/auth/login?p=${query}`);
  }
}
```

Si el usuario es administrador, la propiedad **isAdmin** sera **true**, y entrara en la condicional que renderizara la pagina.

```ts
if (isAdmin) {
    return (
      <h1>Pagina de admin</h1>
      <p>Nisi adipisicing ex magna sint laboris consectetur non nulla.</p>
    );
  }
```

[⬆️ Volver al indice](#contenido)

## Backend

## APIs de cliente

- [APIs de usuarios](#apis-de-usuarios)
  - [Registrar usuario](#registrar-usuario)
  - [Iniciar sesion](#iniciar-sesion)
- [APIs de productos](#apis-de-productos)
  - [Obtener todos los productos](#obtener-todos-los-productos)
  - [Obtener producto por slug](#obtener-producto-por-slug)
- [APIs de ordenes](#apis-de-ordenes)
  - [Obtener todas las ordenes de un usuario](#obtener-todas-las-ordenes-de-un-usuario)
  - [Obtener order de un usuario por el id](#obtener-order-de-un-usuario-por-el-id)
  - [Crear orden](#crear-orden)
  - [Pagar orden](#pagar-orden)
- [API de busqueda](#api-de-busqueda)
  - [Buscar producto](#buscar-producto)

---

### APIs de usuarios

#### Registrar usuario:

`url`: **/api/user/register**  
`method`: **post**

`body`:

```ts
name: string;
email: string;
password: string;
```

`response`:

```ts
token: string
user: {
  email: string,
  name: string,
  role: string,
},
```

#### Iniciar sesion:

`url`: **/api/user/login**  
`method`: **post**

`body`:

```ts
email: string;
password: string;
```

`response`:

```ts
token: string
user: {
  email: string,
  name: string,
  role: string,
},
```

---

### APIs de productos

#### Obtener todos los productos

`url`: **/api/products**  
`method`: **get**

`query`:

```ts
gender?: 'kid' | 'men' | 'women' | 'unisex'
```

`response`:

```ts
product: IProduct[];
```

#### Obtener producto por slug

`url`: **/api/products/[slug]**  
`method`: **get**

`response`:

```ts
product: IProduct;
```

---

### APIs de ordenes

#### Obtener todas las ordenes de un usuario

`url`: **/api/orders/all**  
`method`: **get**

`response`:

```ts
orders: IOrder[]
```

#### Obtener order de un usuario por el id

`url`: **/api/orders/[id]**  
`method`: **get**

`response`:

```ts
orders: IOrder;
```

#### Crear orden

`url`: **/api/orders/create**  
`method`: **post**

`body`:

```ts
orderItems: IOrderItem[]
total: number
```

`response`:

```ts
newOrder: IOrder;
```

#### Pagar orden

`url`: **/api/orders/pay**  
`method`: **post**

`body`:

```ts
transactionId: string;
orderId: string;
```

`response`:

```ts
message: string;
```

---

### API de busqueda

#### Buscar producto

`url`: **/api/search/[query]**  
`method`: **get**

`response`:

```ts
products: IProduct | IProduct[];
```

[⬆️ Volver al indice](#contenido)

## APIs de administrador

- [APIs de usuarios para administradores](#apis-de-usuarios-para-administradores)
  - [Obtener todos los usuarios de la aplicacion](#obtener-todos-los-usuarios-de-la-aplicacion)
  - [Actualizar role de usuario](#actualizar-role-de-usuario)
- [APIs de productos para administradores](#apis-de-productos-para-administradores)
  - [Obtener todos los productos de la aplicacion](#obtener-todos-los-productos-de-la-aplicacion)
  - [Crear un nuevo producto](#crear-un-nuevo-producto)
  - [Actualizar un producto](#actualizar-un-producto)
- [APIs de ordenes para administradores](#apis-de-ordenes-para-administradores)
  - [Obtener todas las ordenes de la aplicacion](#obtener-todas-las-ordenes-de-la-aplicacion)
  - [Obtener orden por id](#obtener-orden-por-id)
- [API para obtener los datos del dashboard principal](#api-para-obtener-los-datos-del-dashboard-principal)
  - [Dashboard](#dashboard)

---

### APIs de usuarios para administradores

#### Obtener todos los usuarios de la aplicacion

`url`: **/api/admin/users**  
`method`: **get**

`response`:

```ts
users: IUser[];
```

#### Actualizar role de usuario

`url`: **/api/admin/users**  
`method`: **put**

`body`:

```ts
userId: string;
newRole: string;
```

`response`:

```ts
message: string;
```

---

### APIs de productos para administradores

#### Obtener todos los productos de la aplicacion

`url`: **/api/admin/products**  
`method`: **get**

`response`:

```ts
products: IProduct[];
```

#### Crear un nuevo producto

`url`: **/api/admin/users**  
`method`: **post**

`body`:

```ts
product: IProduct;
```

`response`:

```ts
product: IProduct;
```

#### Actualizar un producto

`url`: **/api/admin/users**  
`method`: **put**

`body`:

```ts
product: IProduct;
```

`response`:

```ts
product: IProduct;
```

---

### APIs de ordenes para administradores

#### Obtener todas las ordenes de la aplicacion

`url`: **/api/admin/orders**  
`method`: **get**

`response`:

```ts
orders: IOrder[];
```

#### Obtener orden por id

`url`: **/api/admin/orders/[id]**  
`method`: **get**

`response`:

```ts
order: IOrder;
```

---

para obtener los datos para el dashboard principal.

- API para poder subir las imagenes de los productos.

### API para obtener los datos del dashboard principal

#### Dashboard

`url`: **/api/admin/dashboard**  
`method`: **get**

`response`:

```ts
numberOfClients: number;
numberOfProducts: number;
lowInventory: number;
productsWithNoInventory: number;
numberOfOrders: number;
paidOrders: number;
notPaidOrders: number;
```

[⬆️ Volver al indice](#contenido)

## Estilo de la aplicacion

La aplicacion posee multiples componentes de Material UI, pero la mayoria del estilo, fue migrado a Tailwind, con el proposito de practicar este ultimo.

[⬆️ Volver al indice](#contenido)

## Ejecutar en modo desarrollo

### Clonar repositorio

Para ejecutar este proyecto en modo desarrollo, primero debes clonar el repositorio con el siguiente comando:

```
  git clone https://github.com/TomasCuevas/Pokedex-TC.git
```

### Instalar dependencias

Una vez clonado, dentro de la carpeta del proyecto ejecutar en la terminar el siguiente comando, para instalar todas las dependencias del mismo:

```
  npm i
```

### Iniciar base de datos

Una vez todas las dependencias hayan sido instaladas, hay que iniciar la base de datos de forma local. Para ello, necesitamos tener instalado docker desktop en nuestro equipo, y luego, ejecutar el siguiente comando con docker abierto:

```
  docker-compose up -d
```

- El -d, significa **detached**

### Configurar variables de entorno

Debemos configurar las siguientes variables de entonrnos en el archivo `.env` o `.env.development`.

```ts
HOST_NAME=
NEXT_PUBLIC_HOST_NAME=

# MongoDB
MONGODB_URI=

# Jwt
JWT_SECRET_SEED=

# Next Auth
NEXTAUTH_SECRET=

# Next Auth Providers
GITHUB_ID=
GITHUB_SECRET=

# Paypal
NEXT_PUBLIC_PAYPAL_CLIEND=
PAYPAL_SECRET=
PAYPAL_OAUTH_URL=
PAYPAL_ORDERS_URL=

# Cloudinary
CLOUDINARY_URL=
CLOUD_NAME=
API_KEY=
API_SECRET=
```

### Iniciar servidor y llenar base de datos con datos semillas

Ahora que tenemos la base de datos arriba, debemos llenar a esta de datos. Para ello, debemos iniciar nuestro servidor con el siguiente comando:

```
  npm run dev
```

Una vez el servidor se haya iniciado, debemos hacer una peticion a la siguiente direccion:

```
  http://localhost:3000/api/seed
```

Al llamar a esta direccion, se llena la base de datos con los datos semilla para que podamos desarrollar.

### Direccion de la base de datos

Por ultimo, la siguiente es la direccion para acceder a la base de datos a travez de MongoDBCompass

```
  mongodb://localhost:27017/teslodb
```

[⬆️ Volver al indice](#contenido)
