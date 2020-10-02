npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,phoneNumber:string,username:string,password:string,salt:string,type:string
npx sequelize-cli model:generate --name Admin --attributes firstName:string,lastName:string,email:string,phoneNumber:string,username:string,password:string,salt:string,type:string
npx sequelize-cli model:generate --name Address --attributes adminId:integer,userId:integer,addressName:string,city:string,zipcode:string,address:string
npx sequelize-cli model:generate --name Product --attributes adminId:integer,name:string,price:string,weight:integer,description:string,tags:string,stock:integer,imageId:string,imageName:string
npx sequelize-cli model:generate --name Variation --attributes color:string,size:string,material:string,productId:integer
npx sequelize-cli model:generate --name Category --attributes categoryName:enum('Makanan', 'Pakaian', 'Elektronik', 'Alat Masak', 'Olahraga'),productId:integer
npx sequelize-cli model:generate --name Discount --attributes dicountName:string,expired:date,total:float
npx sequelize-cli model:generate --name Order --attributes discountId:integer,userId:integer,courierName:string,courierService:string,courierPrice:integer
npx sequelize-cli model:generate --name Order_Item --attributes orderId:integer,productId:integer,quantity:integer
npx sequelize-cli model:generate --name Checkout --attributes orderId:integer,date:date,note:string
npx sequelize-cli model:generate --name Payment --attributes chekoutId:integer,status:string,token:string,paymentHeader:string