/**
 * check if object is null or has keys
 * @param obj
 * @returns {boolean}
 */
export const hasKeys = (obj: any): boolean => {
    return !!(obj && Object.keys(obj).length);
};