
class Utils {
    static TITLE_PAGE: string = 'Product list with cart';
    static BUTTON_VIEW_LIST_LABEL: string = 'Enter the app';
}

class UUID {
    private _value: string | UUID;

    private constructor(value: string | UUID) {
        this._value = value;
    }

    get uuid() { return this._value; }
    set uuid(value: string | UUID){ this._value = value; }

    /**
     * Generate a unite UUID.
     * @returns {UUID} - unique UUID
     */
    static generate(): UUID {
        return new UUID(this._uuidString());
    }
    /**
     * Returns if is a valid UUID.
     * @param {string | UUID} value - string uuid to validate
     * @returns boolean true if is a valid UUID
     */
    static validate(value: string | UUID): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(`${value}`);
    }
    /**
     * Returns a  string random hex 16.
     * @returns {string} string random hex 16
     */
    static _getRandomHex16(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    /**
     * Returns a random UUID String value.
     * @returns {string} - random uuid string
     */
    static _uuidString(): string {
        return (this._getRandomHex16() + this._getRandomHex16() + '-' + this._getRandomHex16() + '-' +
        '4' + this._getRandomHex16().substring(1, 3) + '-' + ((Math.random() * 4) | 8).toString(16) + 
        this._getRandomHex16().substring(1, 3) + '-' + this._getRandomHex16() + this._getRandomHex16() + 
        this._getRandomHex16() );
    }
}

const module = {
    Utils,
    UUID
}

export default module;