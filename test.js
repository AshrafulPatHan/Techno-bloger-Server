let data = [
    {
        "id": "676ce85d91ca45e3608c3d72"
    },
    {
        "id": "676ce9d391ca45e3608c3d75"
    }
];

// const returnData = data[0].id  ;
// const returnData = data.map(data => data.id);
const returnData = data.map(data => ({
    id:data.id,
    filter:`this is the id ${data.id}`
}));

console.log(returnData);
