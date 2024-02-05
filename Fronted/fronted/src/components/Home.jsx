import React, { useEffect } from "react"
import MetaData from "./MetaData"
import { useGetProductsQuery } from "../redux/app/productApi"
import ProductItem from "./product/ProductItem";
import Loader from "./layout/loader"
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "./layout/customPagination";
import Filter from "./layout/filter";





const Home = () =>{
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || ""
  const params = {page,keyword};
    const {data,isLoading,isError,error}=useGetProductsQuery(params);
      useEffect(()=>{
        if(isError){
          toast.error(error?.data?.message)
        }
      },[isError])
    console.log(data)
    const columnSize = keyword? 4 : 3;
    if(isLoading){
      return <Loader/>
    }
    
    return(
        <>
        <MetaData title={"Buy Best Product Online"}/>
        <div className="row">
          {keyword && (
            <div className="col-6 col-md-3 my-5"><Filter/></div>
          )}
        <div className={keyword? "col-6 col-md-9" : "col-6 col-md-12"}>
            <h1 id="products_heading" className="text-secondary">
              {keyword?`${data?.products?.length} product found with this keyword: ${keyword}`:"Latest Product"}
            </h1>
  
            <section id="products" className="mt-5">
              <div className="row">
                {data?.products?.map((product)=>(
                <ProductItem product={product} columnSize={columnSize}/>
                
                
               ))}
              
                
                </div>
                </section>
                <CustomPagination resPerPage={data?.resPerPage} 
                filteredProductsCount={data?.filteredProductsCount}/>
        </div>
        </div>
      
     </>
    )
}
export default Home
