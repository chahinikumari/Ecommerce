import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination"


const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
    const [currentPage, setCurrentPage] = useState(1);
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);

        if (searchParams.has("page")) {
            searchParams.set("page", pageNumber);
        } else {
            searchParams.append("page", pageNumber);
        }

        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);

        // Log to check if the parameters are set correctly
        console.log("Current Page:", currentPage, "New Page:", pageNumber, "Path:", path);
    };

    // Log to check if the component is rendering
    console.log("Rendering CustomPagination",currentPage);

    return (
        <div className="d-flex justify-content-center my-5">
            {filteredProductsCount > resPerPage && (
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={filteredProductsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            )}
        </div>
    );
};
export default CustomPagination;

