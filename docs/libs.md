# Librerías y Servicios

## api-services

Abstrae las peticiones HTTP mediante **Axios**. Crea una instancia configurada con
la URL base (`NEXT_PUBLIC_API_URL`) y maneja cabeceras, token y manejo de errores.

### Métodos principales
- `get(endpoint, options)`
- `post(endpoint, data, options)`
- `put(endpoint, data, options)`
- `patch(endpoint, data, options)`
- `delete(endpoint, options)`

Incluye versión `safe` que devuelve `{ data, error }` para manejar errores de forma
sencilla.

```ts
import api from '@/common/libs/api-services'

const { data, error } = await api.safe.get('/users')
```

## base-services

Clase abstracta que facilita la creación de servicios por módulo. Define métodos
`get`, `post`, `put`, `patch` y `delete` que anteponen la ruta base del servicio.

```ts
class UserService extends BaseService {
  constructor() { super('administration/users') }
}
```

## cookies-services

Funciones utilitarias para manejar cookies en el navegador.
- `setCookie(name, value, options)`
- `getCookie(name)`
- `getCookies()`
- `deleteCookie(name)`

Se usan para guardar el token y la expiración de la sesión.
