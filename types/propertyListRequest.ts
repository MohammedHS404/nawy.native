import { PaginationDto } from "./PaginationDto";
import { PropertyFiltersDto } from "./PropertyFiltersDto";

export class PropertyListRequest {
    public pagination?: PaginationDto;
    public filters?: PropertyFiltersDto;

    public constructor(params: {
        pagination?: PaginationDto;
        filters?: PropertyFiltersDto;
    }) {
        this.pagination = params.pagination;
        this.filters = params.filters;
    }
}

