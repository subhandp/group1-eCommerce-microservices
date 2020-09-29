npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,phoneNumber:string,username:string,password:string,salt:string,type:string
npx sequelize-cli model:generate --name Admin --attributes firstName:string,lastName:string,email:string,phoneNumber:string,username:string,password:string,salt:string,type:string
npx sequelize-cli model:generate --name Address --attributes adminId:integer,userId:integer,addressName:string,city:string,zipcode:string,address:string
npx sequelize-cli model:generate --name Product --attributes adminId:integer,name:string,price:string,weight:integer,description:string,tags:string,stock:integer,imageId:string,imageName:string
npx sequelize-cli model:generate --name Variation --attributes color:string,size:string,material:string,productId:integer
npx sequelize-cli model:generate --name Category --attributes categoryName:enum('Makanan', 'Pakaian', 'Elektronik', 'Alat Masak', 'Olahraga'),productId:integer