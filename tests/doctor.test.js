// use the path of your model
const Doctors = require('../api/models/staffs');
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
            '_staffName': 'Biwash',
            '_staffEmail': 'biwash@gmail.com',
            '_staffType':"doc"
        };
        
        return Doctors.create(vehcile)
            .then((pro_ret) => {
                expect(pro_ret._staffName).toEqual('Biwash');
            });
    });


it('to test the update', async () => {

    return Doctors.findOneAndUpdate({_id :Object('5e39292753c1ae0c20d37730')}, {$set : {_staffName:'Biwash'}})
    .then((pp)=>{
        expect(pp._staffName).toEqual('Biwash')
    })
});

// the code below is for delete testing
    it('to test the delete product is working or not', async () => {
        const status = await Doctors.deleteMany();
        expect(status.ok).toBe(1);
});

    
})
