
export function assignToProperElement(arr, index, element) {
    Object.keys(arr).forEach((key) => {
        if (arr[key].id === index) {
            arr[key] = element
        }
    })
}