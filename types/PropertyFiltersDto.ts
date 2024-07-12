
export class PropertyFiltersDto {
    public query?: string;

    public type?: string;

    public minPrice?: number;

    public maxPrice?: number;

    public minBedrooms?: number;

    public maxBedrooms?: number;

    public minBathrooms?: number;

    public maxBathrooms?: number;

    public minArea?: number;

    public maxArea?: number;

    public constructor(params: {
        query?: string;
        type?: string;
        minPrice?: number;
        maxPrice?: number;
        minBedrooms?: number;
        maxBedrooms?: number;
        minBathrooms?: number;
        maxBathrooms?: number;
        minArea?: number;
        maxArea?: number;
    }) {
        this.query = params.query;
        this.type = params.type;
        this.minPrice = params.minPrice;
        this.maxPrice = params.maxPrice;
        this.minBedrooms = params.minBedrooms;
        this.maxBedrooms = params.maxBedrooms;
        this.minBathrooms = params.minBathrooms;
        this.maxBathrooms = params.maxBathrooms;
        this.minArea = params.minArea;
        this.maxArea = params.maxArea;
    }
}
