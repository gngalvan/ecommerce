export default class ManagerDb {
    constructor(modelManager){
        this.model = modelManager;
    }

        getAll = async () =>{
            const resultAll = await this.model.find().lean();
            return resultAll;
        }


    save = async (ele) => {
        const resultAdd = await this.model.create(ele);
        return resultAdd;
    }

    update = async (id,props) => {
        const resultUpdate = await this.model.updateOne({_id:id},{$set:props})
        return resultUpdate;
    }

    delete = async (id) => {
        const resultDelete = await this.model.deleteOne({_id:id})
        return resultDelete;
    }

    findElementById = async (id) => {
        const resultCart = await this.model.findById({_id:id}).populate('products.product').lean();
        return resultCart
    }

}