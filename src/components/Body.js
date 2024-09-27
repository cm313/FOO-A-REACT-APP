import RestaurantCard, {withPromotedLabel}from "./RestaurantCard";
import {restaurantsList} from "../utils/mockData";
import {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import ShimmerUI from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
//import userContext from "../utils/userContext";
import searchIcon from "../images/searchIcon.png";

const Body = ()=>{

// below is normal javascript Variable
/*  let listOfRestaurants =[
    {
      "info": {
        "id": "89373",
        "name": "Akshay tiffins",
        "cloudinaryImageId": "bxc32vivxysgcgpzizgu",
        "locality": "Rohini Hospital Road",
        "areaName": "Hanamkonda",
        "costForTwo": "₹100 for two",
        "cuisines": [
          "South Indian"
        ],
        "avgRating": 4.4,
        "veg": true,
        "deliveryTime": 24,
        "parentId": "28696",
        "avgRatingString": "4.4",
        "totalRatingsString": "10K+",
      },      
  },
  {
    "info": {
        "id": "89374",
        "name": "Mahalaxmi tiffins",
        "cloudinaryImageId": "bxc32vivxysgcgpzizgu",
        "locality": "Rohini Hospital Road",
        "areaName": "Hanamkonda",
        "costForTwo": "₹100 for two",
        "cuisines": [
          "South Indian"
        ],
        "avgRating": 3.8,
        "veg": true,
        "deliveryTime": 24,
        "parentId": "28696",
        "avgRatingString": "4.4",
        "totalRatingsString": "10K+",
      },      
  },
  {
    "info": {
        "id": "89375",
        "name": "Suprabha tiffins",
        "cloudinaryImageId": "bxc32vivxysgcgpzizgu",
        "locality": "Rohini Hospital Road",
        "areaName": "Hanamkonda",
        "costForTwo": "₹100 for two",
        "cuisines": [
          "South Indian"
        ],
        "avgRating": 4,
        "veg": true,
        "deliveryTime": 24,
        "parentId": "28696",
        "avgRatingString": "4.4",
        "totalRatingsString": "10K+",
      },      
  },
]; */


// below is creation of state varibale
// setListOfRestaurant is a function and we can give it any name and it is used to update the state variable.
//It is taken as the 2nd value in array
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  
  const[fullListOfRestaurants, setFullListOfRestaurants] = useState([]);
  
  const[searchText, setSearchText] = useState("");

  //const{userName, setUname} = useContext(userContext);

  useEffect( ()=>{
     fetchData();
  }, []);


  const fetchData = async ()=>{
      const response  = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.0121072&lng=79.561202&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const jsonBackendData =  await response.json();
      //Optional Chaining
      const restroData = jsonBackendData?.data?.cards[4]?.card?.card?.gridElements.infoWithStyle.restaurants
      setListOfRestaurant(restroData);
      setFullListOfRestaurants(restroData);
  }; 


  /* const onlineStatus = useOnlineStatus();

   if(onlineStatus == false){
     return (
      <h1>You are Offline, please check your connection</h1>
     )
   } */

   const promotedRestaurantCard = withPromotedLabel(RestaurantCard);


  // conditional rendering {rendering UI based on the condition is known as conditional rendering}
 /* if(listOfRestaurants.length === 0){
    return <ShimmerUI/>
  } */
 
// writing above condition using Ternary Operator
  return (
    listOfRestaurants.length === 0 ? <ShimmerUI/>
  :<div className="body">
      <div className = "flex  my-8 items-center">
        <div className="px-5">
          <input  data-testid="searchInput" className=" ml-10 mr-2 my-2 pr-28 border-2 pl-2 border-gray-300 shadow-2xl rounded-full" type="text" placeholder="Search Restaurants" value={searchText} onChange={(e)=>{
            {/*This "e.target.value" is given to us by the browser */}
             setSearchText(e.target.value);
          }}></input>
          <button className=" w-5 -ml-12" onClick = {()=>{
            const filteredResult = fullListOfRestaurants.filter((restaurants)=>
            restaurants.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setListOfRestaurant(filteredResult);
          }}><img src={searchIcon}/></button>
        </div>
        <div className="flex-1">
        <button data-testid = "topRated" className="bg-orange-300 ml-3 text-black font-medium p-2 transition-all hover:scale-95 hover:bg-orange-200 font-sans rounded-full " onClick = { ()=>{
          const filteredList = fullListOfRestaurants.filter(
            (res) => res.info.avgRating>4.2);
            setListOfRestaurant(filteredList);
        } 
        }>Top Rated Restaurants!</button>
        </div>
       {/* <div className="mr-2 font-medium font-serif">                                               
          Username:  <input className="rounded-md" value ={userName} onChange={(e)=>{setUname(e.target.value)}}></input>
        </div> */}
      </div>
  <div className="flex flex-wrap ml-16 mb-96 shadow-2xl w-[1150px] border-x-[1px] border-b-[1px] border-transparent">
   {listOfRestaurants.map((restaurant) => (
      <Link key = {restaurant.info.id}  to = { "/restaurant/" + restaurant.info.id}>
        { 
          restaurant?.info?.promoted ?
          <promotedRestaurantCard resData = {restaurant}/> :
          <RestaurantCard resData = {restaurant} /> }</Link>
   ))}
  </div>
  </div>
  );
};

export default Body;
