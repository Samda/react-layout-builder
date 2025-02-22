jest.unmock('../src');

import {inputPropsLookup, inputValueLookup} from '../src';

describe('#inputPropsLookup', () => {
    it('should lookup normal names', () => {
        let fields = {
            name: {
                type: 'text'
            },
            age: {
                type: 'text'
            }
        };
        expect(inputPropsLookup(fields, 'name')).toBeDefined();
        expect(inputPropsLookup(fields, 'name').type).toBe(fields.name.type);

        expect(inputPropsLookup(fields, 'age')).toBeDefined();
        expect(inputPropsLookup(fields, 'age').type).toBe(fields.age.type);
    });

    it('should lookup array names', () => {
        let fields = {
            name: {
                type: 'text'
            },
            age: {
                type: 'text'
            }
        };
        expect(inputPropsLookup(fields, 'name[1]')).toBeDefined();
        expect(inputPropsLookup(fields, 'name[1]').type).toBe(fields.name.type);

        expect(inputPropsLookup(fields, 'age[2]')).toBeDefined();
        expect(inputPropsLookup(fields, 'age[2]').type).toBe(fields.age.type);
    });

    it('should lookup nested names', () => {
        let fields = {
            address: {
                type: 'nested',
                fields: {
                    city: {
                        type: 'text'
                    }
                }
            }
        };

        expect(inputPropsLookup(fields, 'address[0][city]')).toBeDefined();
        expect(inputPropsLookup(fields, 'address[0][city]').type)
            .toBe(fields.address.fields.city.type);

        expect(inputPropsLookup(fields, 'address[0][city][3]')).toBeDefined();
        expect(inputPropsLookup(fields, 'address[0][city][3]').type)
            .toBe(fields.address.fields.city.type);
    });
});

describe('#inputValueLookup', () => {
    it('should lookup normal values', () => {
        let values = {
            name: 'john',
            age: 11
        };
        expect(inputValueLookup(values, 'name')).toBe(values.name);
        expect(inputValueLookup(values, 'age')).toBe(values.age);
    });

    it('should lookup array values', () => {
        let values = {
            country: {
                0: 'Ireland',
                1: 'Fiji'
            },
            city: [
                'taipei',
                'tiblisi'
            ]
        };

        expect(inputValueLookup(values, 'country[0]')).toBe(values.country[0]);
        expect(inputValueLookup(values, 'country[1]')).toBe(values.country[1]);

        expect(inputValueLookup(values, 'city[0]')).toBe(values.city[0]);
        expect(inputValueLookup(values, 'city[1]')).toBe(values.city[1]);
    });

    it('should lookup nested values', () => {
        let values = {
            shipping_address: {
                0: {
                    city: 'queens'
                },
                1: {
                    city: 'brooklyn'
                }
            },
            billing_address: [
                {
                    city: 'bangkok'
                },
                {
                    city: 'delhi'
                }
            ]
        };
        expect(inputValueLookup(values, 'shipping_address[0][city]'))
            .toBe(values.shipping_address[0].city);
        expect(inputValueLookup(values, 'shipping_address[1][city]'))
            .toBe(values.shipping_address[1].city);

        expect(inputValueLookup(values, 'billing_address[0][city]'))
            .toBe(values.billing_address[0].city);
        expect(inputValueLookup(values, 'billing_address[1][city]'))
            .toBe(values.billing_address[1].city);
    });
});
