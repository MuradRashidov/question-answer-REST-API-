import expressAsyncWrapper from "express-async-wrapper"
import { paginationHelper, populateHelper,questionSortHelper, searchHelper } from "./queryMiddlewareHelpers.mjs";

const answerQueryMidleware = function(model,options){
    return expressAsyncWrapper(async function (req,res,next){
        const {id} = req.params;
        const arrayName = "answers";
        const total = (await model.findById(id))["answerCount"];
        const paginationResult =await paginationHelper(total,undefined,req);
        console.log(total);
        const startIndex = paginationResult.startIndex;
        const limit = paginationResult.limit;
        let queryObject = {};
        queryObject[arrayName] = {$slice:[startIndex,limit]};
        let query = model.find({_id:id},queryObject);
        query = populateHelper(query,options.population)
        let queryResults = await query;
        res.queryResults = {
            success:true,
            pagenation:paginationResult.pagenation,
            data:queryResults
        }

        next();
    })
}

export {answerQueryMidleware};