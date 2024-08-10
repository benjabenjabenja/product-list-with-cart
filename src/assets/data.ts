import { Product } from "@/App";
import { randomUUID, UUID } from "crypto";

/**
 * Class of Tag's
 */
export class Tag {
    private _name: string | null = null;
    private _type: EProducts | null = null;

    constructor(name: string | null, type: EProducts | null) {
        !!name && (this.name = name);
        !!type && (this.type = type);
    }

    get name() { return this._name; }
    get type() { return this._type; }

    set name(name:string | null){ this._name = name; }
    set type(type: EProducts | null){ this._type = type; }

    /**
     * Combine a tag or array of tags.
     * @param {Tag | Tag[]} tagA 
     * @param {Tag | Tag[]} tagB 
     * @returns {Tag[]} - array of combine tags.
     */
    combine2Tags(tagA: Tag | Tag[], tagB: Tag | Tag[]): Tag[] {
        let response: Tag[] = [];
        if(Array.isArray(tagA)) {
            response = [...response, ...tagA];
        }
        if(tagA instanceof Tag) {
            return [...response, tagA];
        }
        if(Array.isArray(tagB)){
            response = [...response, ...tagB];
        }
        if(tagB instanceof Tag) {
            response = [...response, tagB];
        }

        return response;
    }
};
export type API_RESPONSE<T> = {
    data: T,
    status: EERROR_STATUS | 200,
    message: EERROR_MESSAGES | string,
};
export enum EProducts {
    ELECTRONIC = 'ELECTRONIC',     
    ELECTRICAL = 'ELECTRICAL',     
    APPLIANCE = 'APPLIANCE',       
    LIGHTING = 'LIGHTING',         
    TOOLS = 'TOOLS',               
    INDUSTRIAL = 'INDUSTRIAL',
};
export enum ERROR_SEVERITY {
    ERROR = 'ERROR',
    WARNING = 'WARNING'
};
export enum EERROR_MESSAGES {
    FAIL_PRODUCTS =  `${ERROR_SEVERITY.ERROR} - Fail loading products.`,
    FAIL_PRODUCT = `${ERROR_SEVERITY.ERROR} - Fail load product.`,
    FAIL_PRODUCT_NOT_FOUND = `${ERROR_SEVERITY.ERROR} - Fail product not found.`
};
export enum EERROR_STATUS {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405
};
/**
 * Returns a random product.
 * @returns - Object product
 */
const getRandomProduct = (): Product => {
    const productTypes = Object.values(EProducts);
    const randomType = productTypes[Math.floor(Math.random() * productTypes.length)];
    
    const productNames: { [key in EProducts]: string[] } = {
        [EProducts.ELECTRONIC]: ['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Camera'],
        [EProducts.ELECTRICAL]: ['Extension Cord', 'Circuit Breaker', 'Power Outlet', 'Switch', 'Fuse'],
        [EProducts.APPLIANCE]: ['Washing Machine', 'Refrigerator', 'Microwave', 'Oven', 'Dishwasher'],
        [EProducts.LIGHTING]: ['LED Bulb', 'Desk Lamp', 'Ceiling Light', 'Chandelier', 'Spotlight'],
        [EProducts.TOOLS]: ['Drill', 'Saw', 'Wrench', 'Hammer', 'Screwdriver'],
        [EProducts.INDUSTRIAL]: ['Generator', 'Compressor', 'Conveyor Belt', 'Forklift', 'Industrial Fan'],
    };
    
    const randomName = productNames[randomType][Math.floor(Math.random() * productNames[randomType].length)];
    const randomPrice = parseFloat((Math.random() * 1000).toFixed(2)); // Precio aleatorio entre 0 y 1000
    const randomCount = Math.floor(Math.random() * 100) + 1; // Cantidad aleatoria entre 1 y 100

    const tag = new Tag(randomName, randomType);

    return {
        productName: randomName,
        price: randomPrice,
        tag: tag,
        count: randomCount,
        id: randomUUID(),
    };
};
/**
 * MOCK DATA OF PRODUCTS
 */
const DATA_RANDOM: Product[] = [
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
];
/**
 * Returns a promise of array of products.
 * @returns {Promise<API_RESPONSE<Product[]>>} - a Promise<Product[]>
 */
const getMockProducts = async (): Promise<API_RESPONSE<Product[]>> => {
    // to test errors.
    const error: boolean = false;
    return new Promise<API_RESPONSE<Product[]>>((resolve, reject) => {
        if(!!error) {
            return reject({
                status: EERROR_STATUS.BAD_REQUEST,
                message: EERROR_MESSAGES.FAIL_PRODUCTS,
                data: [],
            });
        }
        return resolve({ 
            data: DATA_RANDOM,
            status: 200,
            message: "SUCCESS"
        });
    });
};
/**
 * Search a product by if, if exist return it else return null.
 * @param {UUID} id - UUID PRODUCT 
 * @returns {Promise<API_RESPONSE<Product | null>>} - Promise<Product | null>
 */
const getMockProductById = async (id: UUID): Promise<API_RESPONSE<Product | null>> => {
    const find = DATA_RANDOM.find(v => v.id === id) ?? null;
    return new Promise(
        (resolve, reject) => {
            if(find) {
                return resolve({
                    data: find,
                    message: "SUCCESS",
                    status: 200
                });
            }
            return reject({
                data: null,
                message: EERROR_MESSAGES.FAIL_PRODUCT_NOT_FOUND,
                status: EERROR_STATUS.NOT_FOUND
            });
        }
    );
};

export const module = {
    getMockProducts,
    getMockProductById
};