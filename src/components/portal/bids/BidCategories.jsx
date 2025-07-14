import { createContext, useState } from "react";
import CategoriesManagement from "../categories/CategoriesManagement";


const BidCategories = () => {
  return (
    <>
      <CategoriesManagement type={"bid"}/>
    </>
  );
};

export default BidCategories;

const BidDataContext = createContext();

export const useBidData = () => {
  return useContext(BidDataContext);
};

export const BidDataProvider = ({ children }) => {
  const [formData, setBidformdata] = useState([]);
  const [productData, setBidProductData] = useState([]);

  return (
    <BidDataContext.Provider
      value={{
        formData,
        setBidformdata,
        productData,
        setBidProductData,
      }}
    >
      {children}
    </BidDataContext.Provider>
  );
};
