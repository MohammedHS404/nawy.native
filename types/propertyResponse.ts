export class PropertyResponse {
    public id: number
    public type: string
    public createdAt: Date
    public updatedAt?: Date
    public title: string
    public slug: string
    public description: string
    public shortDescription?: string
    public minPrice?: number
    public maxPrice?: number
    public location_lat?: number
    public location_lon?: number
    public address_city?: string
    public address_state?: string
    public address_country?: string
    public bedrooms?: number
    public bathrooms?: number
    public minArea?: number
    public maxArea?: number
    public images?: string[]
    public plans?: string[]

    public constructor(
        params: {
            id: number
            type: string
            createdAt: Date
            updatedAt?: Date
            title: string
            slug: string
            description: string
            shortDescription?: string
            minPrice?: number
            maxPrice?: number
            location_lat?: number
            location_lon?: number
            address_city?: string
            address_state?: string
            address_country?: string
            bedrooms?: number
            bathrooms?: number
            minArea?: number
            maxArea?: number
            images?: string[]
            plans?: string[]
        }) {
        this.id = params.id;
        this.type = params.type;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.title = params.title;
        this.slug = params.slug;
        this.description = params.description;
        this.shortDescription = params.shortDescription;
        this.minPrice = params.minPrice;
        this.maxPrice = params.maxPrice;
        this.location_lat = params.location_lat;
        this.location_lon = params.location_lon;
        this.address_city = params.address_city;
        this.address_state = params.address_state;
        this.address_country = params.address_country;
        this.bedrooms = params.bedrooms;
        this.bathrooms = params.bathrooms;
        this.minArea = params.minArea;
        this.maxArea = params.maxArea;
        this.images = params.images;
        this.plans = params.plans;
    }
}