import { Prisma } from '@prisma/client';
type PaginatedQuery = {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
};
export declare const notDeletedQuery: {
    deletedAt: any;
};
export declare const isPublishedQuery: {
    status: "published";
};
export declare const softDeleteQuery: (id: string) => Prisma.UserUpdateArgs;
export declare const paginationQuery: (page?: number, perPage?: number) => PaginatedQuery;
export declare const searchQuery: (search: string, fields: string[]) => {
    OR?: undefined;
} | {
    OR: {
        [x: string]: {
            contains: string;
            mode: string;
        };
    }[];
};
export {};
