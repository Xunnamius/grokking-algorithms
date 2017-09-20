let sum = (arr) =>
{
    if(arr.length == 1)
        return arr[0];

    else
        return arr[0] + sum(arr.slice(1));
};

let count = (arr) => arr[0] ? 1 + count(arr.slice(1)) : 0;

let max = (arr, localMax) =>
{
    localMax = localMax === undefined ? arr[0] : localMax;

    if(localMax && arr.length)
        return max(arr.slice(1), localMax > arr[0] ? localMax : arr[0]);
    else
        return localMax;
};

console.log(max([5, 1, 2, 3, 4, 4]));
