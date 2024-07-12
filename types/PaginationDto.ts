
export class PaginationDto {
    public page: number = 1;
    public limit: number = 24;
    public sortBy?: string = 'id';
    public sortOrder?: 'asc' | 'desc' = 'asc';

    public constructor(params: {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }) {
        this.page = params.page ?? 1;
        this.limit = params.limit ?? 24;
        this.sortBy = params.sortBy ?? 'id';
        this.sortOrder = params.sortOrder ?? 'asc';
    }
}
