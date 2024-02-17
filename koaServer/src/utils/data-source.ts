const { DataSource } =require ("typeorm")
const { EntityContract } = require("../module/ContractModule/contract.entity")

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [EntityContract],
    migrations: [],
    subscribers: [],
})
