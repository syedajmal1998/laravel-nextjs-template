/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route);
  }

  return route?.exact
    ? pathname == route?.path
    : route?.path
    ? pathname.indexOf(route.path) === 0
    : false;
}

const routes: IRoute[] = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
    exact: true,
  },
  {
    icon: "PagesIcon",
    name: "Settings",
    routes: [
      {
        path: "/users",
        icon: "CardsIcon",
        name: "Users",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Components",
    routes: [
      {
        path: "/example/forms",
        icon: "FormsIcon",
        name: "Forms",
      },
      {
        path: "/example/cards",
        icon: "CardsIcon",
        name: "Cards",
      },
      {
        path: "/example/charts",
        icon: "ChartsIcon",
        name: "Charts",
      },
      {
        path: "/example/buttons",
        icon: "ButtonsIcon",
        name: "Buttons",
      },
      {
        path: "/example/modals",
        icon: "ModalsIcon",
        name: "Modals",
      },
      {
        path: "/example/tables",
        icon: "TablesIcon",
        name: "Tables",
      },
    ],
  },
];

export type { IRoute };
export default routes;
