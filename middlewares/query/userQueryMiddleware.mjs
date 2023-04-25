import expressAsyncWrapper from "express-async-wrapper"
import { paginationHelper, populateHelper,questionSortHelper, searchHelper } from "./queryMiddlewareHelpers.mjs";

const userQueryMidleware = function(model,options){
    return expressAsyncWrapper(async function (req,res,next){
        let query = model.find();
        query = searchHelper("name",query,req);
        const total = await model.countDocuents();

        const paginationResult = await paginationHelper(total,query,req);
        query = paginationResult.query;
        let pagination = paginationResult.pagination;
        const queryResults = await query.find();
        res.queryResults = {
            success:true,
            count:queryResults.length,
            pagination:pagination,
            data:queryResults

        }
        next();
    })
}

export {userQueryMidleware};