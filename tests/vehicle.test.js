// use the path of your model
const Vehicles = require('../api/models/vehicles');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/apiTestDB'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('Vehicle  Schema test anything', () => {
// the code below is for insert testing
    it('Add Vehicle testing anything', () => {
        const vehcile = {
            '_vehicleName': 'ambulance',
            '_vehicleType': 'van'
        };
        
        return Vehicles.create(vehcile)
            .then((pro_ret) => {
                expect(pro_ret._vehicleName).toEqual('ambulance');
            });
    });


    
// it('to test the update', async () => {

//     return Vehicles.findOneAndUpdate({_id :Object('5e3926c4f432d911e85b0100')}, {$set : {_vehicleName:'ambulance'}})
//     .then((pp)=>{
//         expect(pp._vehicleName).toEqual('ambulance')
//     })
// });

// // the code below is for delete testing
//     it('to test the delete product is working or not', async () => {
//         const status = await Vehicles.deleteMany();
//         expect(status.ok).toBe(1);
// });

    
})
