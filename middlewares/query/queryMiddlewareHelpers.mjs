const searchHelper = (searchKey,query,req) =>{
    if(req.query.search){
        const searchObject = {};
        const regex = new RegExp(req.query.search,"i");
        searchObject[searchKey]  = regex;
        query = query.where(searchObject);
        
   }
}

const populateHelper = (query,population) => {
         return query.populate(population);
};
const questionSortHelper = (query,req) => {
let sortKey = req.query.sortBy;
console.log(sortKey)
 if(sortKey === "most-answered"){
  return query.sort("-answerCount");

 }
 if(sortKey === "most-liked"){
  return query.sort("-likeCount");
 } 
  return query.sort("-createAt"); 
};
const paginationHelper = async function(model,query,req){
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page-1)*limit;
  const endIndex = page*limit;
  let pagination = {};
  const total = await model.countDocuments();
  if(startIndex>0){
      pagination.previous = {
        page:page-1,
        limit:limit
      };
  }
  if(endIndex<total){
    pagination.next = {
      page:page+1,
      limit:limit
    };

}
 return json({
    query:query.skip(startIndex).limit(limit),
    pagination:pagination
 });
}
export {
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper
}