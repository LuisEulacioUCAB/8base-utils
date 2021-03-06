import {ValidationError} from '../error/ValidationError';
import {normalize8BaseReferenceConnect} from "../references";


test('normalize8BaseReferenceConnect:', () => {
    expect(() => normalize8BaseReferenceConnect({}, '')).toThrowError(
        new ValidationError(`normalize8BaseReferenceConnect:key: value: can't be blank, null or undefined.`),
    );

    const o1 = {a: null};
    normalize8BaseReferenceConnect(o1, 'a');
    expect(o1).toMatchObject({});

    const o2 = {a: ''};
    normalize8BaseReferenceConnect(o2, 'a');
    expect(o1).toMatchObject({});

    const o3 = {a: '<ID>'};
    normalize8BaseReferenceConnect(o3, 'a');
    expect(o3).toMatchObject({a: {connect: {id: '<ID>'}}});

    const o4 = {a: {id: '<ID>'}};
    normalize8BaseReferenceConnect(o4, 'a');
    expect(o4).toMatchObject({a: {connect: {id: '<ID>'}}});

    const o5 = {a: 1};
    expect(() => normalize8BaseReferenceConnect(o5, 'a')).toThrowError(
        new ValidationError(
            `normalize8BaseReferenceConnect: 'a' in data is not a 'string' or a 'object'.`,
        ),
    );

    const o6 = {a: {id: null}};
    expect(() => normalize8BaseReferenceConnect(o6, 'a')).toThrowError(
        new ValidationError(
            `normalize8BaseReferenceConnect: the value on data of the key: 'a' is not a string, instead is: 'null'`,
        ),
    );

    const o7 = {a: {id: undefined}};
    expect(() => normalize8BaseReferenceConnect(o7, 'a')).toThrowError(
        new ValidationError(
            `normalize8BaseReferenceConnect: the value on data of the key: 'a' is not a string, instead is: 'undefined'`,
        ),
    );

    const o8 = {a: {id: 1}};
    expect(() => normalize8BaseReferenceConnect(o8, 'a')).toThrowError(
        new ValidationError(
            `normalize8BaseReferenceConnect: the value on data of the key: 'a' is not a string, instead is: '1'`,
        ),
    );

    const o9 = {a: {id: ''}};
    expect(() => normalize8BaseReferenceConnect(o9, 'a')).toThrowError(
        new ValidationError(
            `normalize8BaseReferenceConnect: the value on data of the key: 'a' is not a string, instead is: ''`,
        ),
    );
});
