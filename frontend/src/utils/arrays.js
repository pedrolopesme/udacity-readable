
export function assignToProperElement(arr, index, element) {
    Object.keys(arr).forEach((key) => {
        if (arr[key].id === index) {
            arr[key] = element
        }
    })
}

export function removeElement(arr, index) {
    let newCollection = {};
    let i = 0;
    Object.keys(arr).forEach((key) => {
        if (arr[key].id !== index) {
            newCollection[i] = arr[key]
            i++
        }
    })
    return newCollection;
}

export function flattenObjectArray(obj) {
    let arr = [];
    if (obj) {
        let keys = Object.keys(obj) || [];
        keys.forEach((key) => {
            arr.push(obj[key]);
        });
    }
    return arr;
}