import { useState } from "react";


const Filter = ()=>{
    const [min,setMin] = useState();
    const[max,setMax]= useState();
    const handleSubmit=(e)=>{

    }
    return(
        <div class="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 class="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        class="px-2"
        action="your_action_url_here"
        method="get"
      >
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e)=>{
                setMin(e.target.value)
              }}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e)=>{setMax(e.target.value)}}
            />
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 class="mb-3">Category</h5>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          value="Category 1"
        />
        <label class="form-check-label" for="check4"> Category 1 </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="category"
          id="check5"
          value="Category 2"
        />
        <label class="form-check-label" for="check5"> Category 2 </label>
      </div>

      <hr />
      <h5 class="mb-3">Ratings</h5>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label class="form-check-label" for="check7">
          <span class="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label class="form-check-label" for="check8">
          <span class="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>

    )
}
export default Filter;