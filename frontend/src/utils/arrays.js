
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