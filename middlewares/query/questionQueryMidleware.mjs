import { query } from "express";
import expressAsyncWrapper from "express-async-wrapper"
import { paginationHelper, populateHelper,questionSortHelper,searchHelper } from "./queryMiddlewareHelpers.mjs";

const questionQueryMidleware = function(model,options){
        return expressAsyncWrapper(async function (req,res,next){
        let query = model.find();
        query = searchHelper("title",query,req);
        if(options && options.population){
            query = populateHelper(query,options.population)
        }
        query = questionSortHelper(query,req);
        const total = await model.countDocuents;
        const paginationResult =  await paginationHelper(total,query,req);
        const pagination = paginationResult.pagination;
        const queryResults = await query;
        
        res.queryResults = {
            success:true,
            count:queryResults.length,
            pagination:pagination,
            data:queryResults

        }
        next();
    });
}

export {
    questionQueryMidleware
}