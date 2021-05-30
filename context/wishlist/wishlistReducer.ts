import addItemToCart from "../Util/addItemToCart";
import {
  ADD_TO_WISHLIST,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
  wishlistType,
  itemType,
} from "./wishlist-type";
import removeItemFromCart from "../Util/removeItemFromCart";
import addWishlist from "../Util/addWishlist";

type actionType = {
  type: string;
  payload?: itemType;
};

const cartReducer = (state: wishlistType, action: actionType) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: addWishlist(state.wishlist, action.payload),
        // wishlist: !state.wishlist.some(
        //   (cartItem) => cartItem.id === action.payload.id
        // ) && [...state.wishlist, { ...action.payload }],
      };
    case DELETE_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem.id !== action.payload.id
        ),
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [],
      };
    default:
      return state;
  }
};

export default cartReducer;