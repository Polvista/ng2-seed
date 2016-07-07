export interface AppRoute {
    url: string;
    params: { [key: string]: any };
    queryParams: { [key: string]: any };

    prevRoute?: AppRoute;
}