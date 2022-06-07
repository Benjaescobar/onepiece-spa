
# One Piece Race - FrontEnd

## App structure :space_invader: 
Our App consists of 6 main folders that contain our code:
- `src/api`: In this folder we have files to do requests to our API using [Axios](https://axios-http.com/docs/intro).
- `src/assets`:  In this folder we have assets for our app such as icons and images.
- `src/components`: In this folder we have components for our App. These are React functions to have our code modularized and more readable. Some of the components are `Login.jsx`, `Footer.jsx`, `GameSideBar.jsx`, etc.
- `src/contexts`: In this app we have contexts for our app. For now the two contexts we have are for Session managment.
- `src/hooks`: Here we have some Hooks to use our contexts.
- `src/views`: The main views, in which we render our components.
- `src/App.jsx`: React App file.

## Libraries :books:
For this project we used:
- **Vite** for serving our app smartly.
- **React** for html Rendering.
- **TailwindCss** to beauty our app

## Commands:

To start the dev server on your machine:

```shell
yarn dev
```

To start the dev server on your network:

```shell
yarn dev --host
```

To make the production build:

```shell
yarn build
```

To preview the production build locally:

```shell
yarn serve
```

---

### To deploy the site, refer to the [official docs](https://vitejs.dev/guide/static-deploy.html) as it is explained in detail there and for many providers.
