/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */


export class SubTypeFactory {
    /**
     * create subType based on the value if the typeSelector property
     */
    static createSubTypeInstance(value: any): object {
        switch (value.$type) {
            default:
                throw new Error(`${value.typeSelector} not supported here`);
        }
    }
}
