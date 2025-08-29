import type { ResponseMessage } from "~/types/common";
import type { FavoriteMenu } from "~/types/models";

export default () => {
    const { callAxios } = useAxios();
    const findAllFavoriteMenu = async (): Promise<FavoriteMenu[] | null> => {
        return await callAxios<FavoriteMenu[]>({
            API: '/api/favoriteMenu/findAllFavoriteMenu',
            method: 'GET',
        });
    };
    const createFavorite = async (request: FavoriteMenu): Promise<FavoriteMenu | null> => {
        return await callAxios<FavoriteMenu>({
            API: '/api/favoriteMenu',
            method: 'POST',
            body: {
                favoriteMenu: request,
            },
        });
    };
    const deleteFavorite = async (request: FavoriteMenu): Promise<ResponseMessage | null> => {
        return await callAxios<ResponseMessage>({
            API: '/api/favoriteMenu',
            method: 'DELETE',
            body: {
                favoriteMenu: request,
            },
        });
    };
    return {
        findAllFavoriteMenu,
        createFavorite,
        deleteFavorite
    }
}