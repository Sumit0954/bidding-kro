import {
  Box,
  TextField,
  Typography,
  Paper,
  Chip,
  Skeleton,
  IconButton,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { Add, Close, SearchOff } from "@mui/icons-material";
import styles from "../bids/BidCategories.module.scss";
import { AlertContext } from "../../../contexts/AlertProvider";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import QueryFormModal from "../../../elements/CustomModal/QueryFormModal";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";

const CategoriesManagement = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const debounceTimeout = useRef(null);
  const loaderRef = useRef();
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subcategoryProducts, setSubcategoryProducts] = useState({});
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [showAllSubCategories, setShowAllSubCategories] = useState(false);
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [searchSubCategory, setSearchSubCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [screenLoader, setScreenLoader] = useState(true);
  const [editCategoryLoader, setEditCategoryLoader] = useState();
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const { companyDetails } = useContext(CompanyDetailsContext);

  const { setAlert } = useContext(AlertContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProducts = async (keyword, pageNo = 1, isNewSearch = false) => {
    if (!keyword || keyword.trim().split(" ").length > 3) return;

    if (isNewSearch) setLoading(true);
    else setIsFetchingMore(true);

    try {
      const query = new URLSearchParams({
        keyword: keyword.trim(),
        ancestors: true,
        page: pageNo,
      }).toString();

      const res = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.SEARCH_CATEGORIES}?${query}`,
        "",
        true
      );

      setProductCount(res.data.count || 0);

      const grouped = groupByIndustry(res.data.results);

      setHasMore(res.data.next !== null);

      if (isNewSearch) {
        setProducts(res.data.results.length ? grouped : {});
      } else {
        setProducts((prev) => {
          const merged = { ...prev };
          Object.entries(grouped).forEach(([industry, items]) => {
            merged[industry] = [...(merged[industry] || []), ...items];
          });
          return merged;
        });
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const groupByIndustry = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const topAncestor = item.ancestors.find((a) => a.depth === 0);
      const industry = topAncestor?.name || "Others";

      if (!grouped[industry]) grouped[industry] = [];
      grouped[industry].push(item);
    });
    return grouped;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (value.trim().length >= 3) {
      debounceTimeout.current = setTimeout(() => {
        fetchProducts(value, 1, true);
      }, 500);
    } else {
      setProducts({});
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && !isFetchingMore && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(searchTerm, nextPage);
        }
      },
      { threshold: 1 }
    );
    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading, isFetchingMore, hasMore, searchTerm, page]);

  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const words = highlight
      .trim()
      .split(/\s+/)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(`(${words.join("|")})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const fetchChildCategories = async (parentIds = []) => {
    if (parentIds.length === 0) return [];
    try {
      const query = parentIds.map((id) => `parent_category=${id}`).join("&");

      const res = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.GET_CATEGORIES}?${query}`,
        "",
        true
      );

      const all = res.data || [];
      const unique = Array.from(new Map(all.map((i) => [i.id, i])).values());
      return unique;
    } catch (error) {
      console.error("Error fetching child categories", error);
      return [];
    }
  };

  const handleIndustrySelect = async (industry) => {
    const isAlreadySelected = selectedIndustries.some(
      (i) => i.id === industry.id
    );
    const updatedIndustries = isAlreadySelected
      ? selectedIndustries.filter((i) => i.id !== industry.id)
      : [...selectedIndustries, industry];

    setSelectedIndustries(updatedIndustries);
    setSearchCategory("");
    setLoadingCategories(true);

    try {
      const cats = await fetchChildCategories(
        updatedIndustries.map((i) => i.id)
      );
      setCategories(cats);
    } catch (error) {
      console.error("Error loading categories", error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategorySelect = async (category) => {
    let updated;
    if (selectedCategories.find((c) => c.id === category.id)) {
      updated = selectedCategories.filter((c) => c.id !== category.id);
    } else {
      updated = [...selectedCategories, category];
    }
    setSelectedCategories(updated);
    const subCats = await fetchChildCategories(updated.map((c) => c.id));
    setSubCategories(subCats);
    const subCatIds = subCats.map((sc) => sc.id);
    const filteredSelectedSubCats = selectedSubCategories.filter((s) =>
      subCatIds.includes(s.id)
    );
    setSelectedSubCategories(filteredSelectedSubCats);
    fetchProductsBySubCategories(filteredSelectedSubCats);
  };

  const fetchProductsBySubCategories = async (subCategories = []) => {
    if (subCategories.length === 0) return;

    try {
      const query = subCategories
        .map((s) => `parent_category=${s.id}`)
        .join("&");

      const res = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.GET_CATEGORIES}?${query}`,
        "",
        true
      );

      const allProducts = res.data || [];

      const grouped = {};
      allProducts.forEach((item) => {
        const topAncestor = Array.isArray(item.ancestors)
          ? item.ancestors.find((a) => a.depth === 0)
          : null;

        const industry = topAncestor?.name || "Others";
        if (!grouped[industry]) grouped[industry] = [];
        grouped[industry].push(item);
      });

      setSubcategoryProducts(grouped);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleSubCategorySelect = async (subCat) => {
    const isAlreadySelected = selectedSubCategories.some(
      (s) => s.id === subCat.id
    );

    const updated = isAlreadySelected
      ? selectedSubCategories.filter((s) => s.id !== subCat.id)
      : [...selectedSubCategories, subCat];

    setSelectedSubCategories(updated);

    try {
      const query = updated.map((s) => `parent_category=${s.id}`).join("&");

      const res = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.GET_CATEGORIES}?${query}`,
        "",
        true
      );

      const allProducts = res.data || [];

      const grouped = {};
      allProducts.forEach((item) => {
        const topAncestor = Array.isArray(item.ancestors)
          ? item.ancestors.find((a) => a.depth === 0)
          : null;

        const industry = topAncestor?.name || "Others";
        if (!grouped[industry]) grouped[industry] = [];
        grouped[industry].push(item);
      });

      setSubcategoryProducts(grouped);

      const validProductIds = new Set(allProducts.map((p) => p.id));
      const filteredSelectedProducts = selectedProducts.filter((product) =>
        validProductIds.has(product.id)
      );
      setSelectedProducts(filteredSelectedProducts);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleProductSelect = (product) => {
    const alreadySelected = selectedProducts.find((p) => p.id === product.id);
    if (alreadySelected) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const getItemByName = (list, name) =>
    list?.find((item) => item.name === name);

  const mergeSelections = (existing = [], newItem) =>
    existing.some((i) => i.id === newItem.id)
      ? existing
      : [...existing, newItem];

  const handleProductSelectFromSearch = async (item) => {
    setProducts({});
    setSearchTerm("");
    setSearchProduct("");

    const ancestors = item?.ancestors || [];
    if (ancestors.length === 0) return;

    const getAncestorByDepth = (depth) =>
      ancestors.find((a) => a.depth === depth)?.name;

    const rawIndustry = getAncestorByDepth(0);
    const rawCategory = getAncestorByDepth(1);
    const rawSubcategory = getAncestorByDepth(2);

    const industry = getItemByName(industries, rawIndustry);
    if (!industry) return;

    const updatedIndustries = mergeSelections(selectedIndustries, industry);
    setSelectedIndustries(updatedIndustries);

    setLoadingCategories(true);
    setSearchCategory("");

    try {
      const categories = await fetchChildCategories(
        updatedIndustries.map((i) => i.id)
      );
      setCategories(categories);

      const category = getItemByName(categories, rawCategory);
      if (!category) return;

      const updatedCategories = mergeSelections(selectedCategories, category);
      setSelectedCategories(updatedCategories);

      const subCategories = await fetchChildCategories(
        updatedCategories.map((c) => c.id)
      );
      setSubCategories(subCategories);

      const subcategory = getItemByName(subCategories, rawSubcategory);
      if (!subcategory) return;

      const updatedSubCategories = mergeSelections(
        selectedSubCategories,
        subcategory
      );
      setSelectedSubCategories(updatedSubCategories);

      await fetchProductsBySubCategories([subcategory]);

      const updatedProducts = mergeSelections(selectedProducts, item);
      setSelectedProducts(updatedProducts);
    } catch (error) {
      console.error("Auto-selecting error:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleIndustryRemove = async (industryToRemove) => {
    const updatedIndustries = selectedIndustries.filter(
      (i) => i.id !== industryToRemove.id
    );
    setSelectedIndustries(updatedIndustries);

    const updatedIndustryIds = updatedIndustries.map((i) => i.id);

    if (updatedIndustryIds.length === 0) {
      setCategories([]);
      setSelectedCategories([]);
      setSubCategories([]);
      setSelectedSubCategories([]);
      setSubcategoryProducts({});
      setSelectedProducts([]);
    } else {
      try {
        const newCategories = await fetchChildCategories(updatedIndustryIds);
        setCategories(newCategories);

        const newCategoryIds = newCategories.map((c) => c.id);
        const updatedSelectedCategories = selectedCategories.filter((c) =>
          newCategoryIds.includes(c.id)
        );
        setSelectedCategories(updatedSelectedCategories);

        const newSubCategories = await fetchChildCategories(
          updatedSelectedCategories.map((c) => c.id)
        );
        setSubCategories(newSubCategories);

        const newSubCatIds = newSubCategories.map((sc) => sc.id);
        const filteredSelectedSubCats = selectedSubCategories.filter((s) =>
          newSubCatIds.includes(s.id)
        );
        setSelectedSubCategories(filteredSelectedSubCats);

        const query = filteredSelectedSubCats
          .map((s) => `parent_category=${s.id}`)
          .join("&");

        const res = await _sendAPIRequest(
          "GET",
          `${PortalApiUrls.GET_CATEGORIES}?${query}`,
          "",
          true
        );
        const allProducts = res.data || [];

        const grouped = {};
        allProducts.forEach((item) => {
          const topAncestor = Array.isArray(item.ancestors)
            ? item.ancestors.find((a) => a.depth === 0)
            : null;

          const industry = topAncestor?.name || "Others";
          if (!grouped[industry]) grouped[industry] = [];
          grouped[industry].push(item);
        });
        setSubcategoryProducts(grouped);

        const validProductIds = new Set(allProducts.map((p) => p.id));
        const filteredSelectedProducts = selectedProducts.filter((product) =>
          validProductIds.has(product.id)
        );
        setSelectedProducts(filteredSelectedProducts);
      } catch (error) {
        console.error(
          "Error updating categories/subcategories on removal",
          error
        );
      }
    }
  };

  useEffect(() => {
    setEditCategoryLoader(true);
    if (!id) return;

    const retrieveBid = async () => {
      setScreenLoader(true);

      try {
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
          "",
          true
        );

        const bid = response?.data;
        const categoryList = bid?.category || [];

        const allIndustriesRes = await _sendAPIRequest(
          "GET",
          PortalApiUrls.GET_CATEGORIES,
          "",
          true
        );
        const allIndustries = allIndustriesRes.data;
        setIndustries(allIndustries);

        const selectedIndustries = categoryList.filter((item) =>
          allIndustries.some((ind) => ind.id === item.id)
        );
        setSelectedIndustries(selectedIndustries);

        const categories = await fetchChildCategories(
          selectedIndustries.map((i) => i.id)
        );
        setCategories(categories);

        const selectedCategories = categoryList.filter((item) =>
          categories.some((cat) => cat.id === item.id)
        );
        setSelectedCategories(selectedCategories);

        const subCategories = await fetchChildCategories(
          selectedCategories.map((cat) => cat.id)
        );
        setSubCategories(subCategories);

        const selectedSubCategories = categoryList.filter((item) =>
          subCategories.some((sub) => sub.id === item.id)
        );
        setSelectedSubCategories(selectedSubCategories);

        const subCategoryIds = selectedSubCategories.map((sub) => sub.id);
        const productQuery = subCategoryIds
          .map((id) => `parent_category=${id}`)
          .join("&");

        const productRes = await _sendAPIRequest(
          "GET",
          `${PortalApiUrls.GET_CATEGORIES}?${productQuery}`,
          "",
          true
        );
        const allProducts = productRes.data || [];

        const grouped = {};
        allProducts.forEach((item) => {
          const industry =
            item.ancestors?.find((a) => a.depth === 0)?.name || "Others";
          if (!grouped[industry]) grouped[industry] = [];
          grouped[industry].push(item);
        });
        setSubcategoryProducts(grouped);

        const selectedProducts = allProducts.filter((prod) =>
          categoryList.some((c) => c.id === prod.id)
        );
        setSelectedProducts(selectedProducts);
        setEditCategoryLoader(false);
      } catch (err) {
        console.error("Error retrieving bid : ", err);
      } finally {
        setScreenLoader(false);
      }
    };

    const autoSelectCompanyCategories = async () => {
      try {
        if (!companyDetails?.category || companyDetails?.category.length === 0)
          return;

        const allIndustriesRes = await _sendAPIRequest(
          "GET",
          PortalApiUrls.GET_CATEGORIES,
          "",
          true
        );
        const allIndustries = allIndustriesRes.data;
        setIndustries(allIndustries);

        const selectedIndustries = companyDetails?.category.filter((item) =>
          allIndustries.some((ind) => ind.id === item.id)
        );
        setSelectedIndustries(selectedIndustries);

        const categories = await fetchChildCategories(
          selectedIndustries.map((ind) => ind.id)
        );
        setCategories(categories);

        const selectedCategories = companyDetails?.category.filter((item) =>
          categories.some((cat) => cat.id === item.id)
        );
        setSelectedCategories(selectedCategories);

        const subCategories = await fetchChildCategories(
          selectedCategories.map((cat) => cat.id)
        );
        setSubCategories(subCategories);

        const selectedSubCategories = companyDetails?.category.filter((item) =>
          subCategories.some((sub) => sub.id === item.id)
        );
        setSelectedSubCategories(selectedSubCategories);

        const subCategoryIds = selectedSubCategories.map((sub) => sub.id);
        const productQuery = subCategoryIds
          .map((id) => `parent_category=${id}`)
          .join("&");

        const productRes = await _sendAPIRequest(
          "GET",
          `${PortalApiUrls.GET_CATEGORIES}?${productQuery}`,
          "",
          true
        );
        const allProducts = productRes.data || [];

        const grouped = {};
        allProducts.forEach((item) => {
          const industry =
            item.ancestors?.find((a) => a.depth === 0)?.name || "Others";
          if (!grouped[industry]) grouped[industry] = [];
          grouped[industry].push(item);
        });
        setSubcategoryProducts(grouped);

        const selectedProducts = allProducts.filter((prod) =>
          companyDetails?.category.some((cat) => cat.id === prod.id)
        );
        setSelectedProducts(selectedProducts);
      } catch (err) {
        console.error("Error in autoSelectCompanyCategories:", err);
      } finally {
        setScreenLoader(false);
        setEditCategoryLoader(false);
      }
    };

    if (type === "company") {
      autoSelectCompanyCategories();
    }
    if (type === "bid") {
      retrieveBid();
    }
  }, [id, companyDetails, type]);

  useEffect(() => {
    const loadIndustries = async () => {
      try {
        setLoadingIndustries(true);
        const response = await _sendAPIRequest(
          "GET",
          PortalApiUrls.GET_CATEGORIES,
          "",
          true
        );
        if (response.status === 200) {
          setIndustries(response.data);
          setScreenLoader(false);
        }
      } catch (err) {
        console.error("Failed to load industries", err);
      } finally {
        setLoadingIndustries(false);
      }
    };
    loadIndustries();
  }, []);

  const handleCategorySubmit = async () => {
    if (type === "company") {
      setBtnLoader(true);

      const missingFields = [];

      if (selectedIndustries.length === 0) missingFields.push("industry");
      if (selectedCategories.length === 0) missingFields.push("category");
      if (selectedSubCategories.length === 0) missingFields.push("subcategory");
      if (selectedProducts.length === 0) missingFields.push("product");

      if (missingFields.length > 0) {
        const formatted = missingFields
          .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
          .join(", ");

        setAlert({
          isVisible: true,
          message: `Please select at least one ${formatted}.`,
          severity: "warning",
        });
        setBtnLoader(false);
        return;
      }

      const payload = [
        ...selectedIndustries.map((i) => ({ category: i.id, depth: 0 })),
        ...selectedCategories.map((c) => ({ category: c.id, depth: 1 })),
        ...selectedSubCategories.map((s) => ({ category: s.id, depth: 2 })),
        ...selectedProducts.map((p) => ({ category: p.id, depth: 3 })),
      ];

      try {
        await _sendAPIRequest(
          "PUT",
          PortalApiUrls.UPDATE_COMPANY_CATEGORIES,
          payload,
          true
        );

        setAlert({
          isVisible: true,
          message: "Company categories updated successfully.",
          severity: "success",
        });
        navigate(`/portal/company-profile/address-certificate/${id}`);
      } catch (error) {
        console.error("Failed to update company categories:", error);
        setAlert({
          isVisible: true,
          message: "Failed to update categories. Please try again.",
          severity: "error",
        });
      } finally {
        setBtnLoader(false);
      }
    } else if (type === "bid") {
      setBtnLoader(true);
      const missingFields = [];

      if (selectedIndustries.length === 0) missingFields.push("industry");
      if (selectedCategories.length === 0) missingFields.push("category");
      if (selectedSubCategories.length === 0) missingFields.push("subcategory");
      if (selectedProducts.length === 0) missingFields.push("product");

      if (missingFields.length > 0) {
        const formatted = missingFields
          .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
          .join(", ");

        setAlert({
          isVisible: true,
          message: `Please select at least one ${formatted}.`,
          severity: "warning",
        });
        setBtnLoader(false);

        return;
      }
      // Prepare formData
      const formData = [
        ...selectedIndustries.map((i) => ({ category: i.id, depth: 0 })),
        ...selectedCategories.map((c) => ({ category: c.id, depth: 1 })),
        ...selectedSubCategories.map((s) => ({ category: s.id, depth: 2 })),
        ...selectedProducts.map((p) => ({ category: p.id, depth: 3 })),
      ];

      // Prepare productData
      const productData = selectedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        depth: 3,
      }));

      // Save in localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("productData", JSON.stringify(productData));

      // Show alert
      setAlert({
        isVisible: true,
        message: `Category has been ${
          id ? "updated" : "submitted"
        } successfully.`,
        severity: "success",
      });
      setBtnLoader(false);
      if (id) {
        navigate(`/portal/bids/update/${id}`);
      } else {
        navigate("/portal/bids/create");
      }
    }
  };

  if (id) {
    if (editCategoryLoader) {
      return <ScreenLoader />;
    }
  } else {
    if (screenLoader) {
      return <ScreenLoader />;
    }
  }

  console.log(companyDetails, " : companyDetails");
  return (
    <>
      <Alert severity="info" className="my-3">
        If you find that your business related category is not in the list.
        Please{" "}
        <span
          className="query-form-button"
          onClick={() => setShowQueryForm(true)}
        >
          Click here
        </span>{" "}
        to send request to Admin.
      </Alert>
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          value={searchTerm}
          label="Search your product or category"
          onChange={handleInputChange}
          placeholder="Enter upto three characters"
          autoComplete="off"
          className={styles.customInput}
          InputProps={{
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchTerm("");
                    setProducts({});
                    setProductCount(0);
                  }}
                  aria-label="clear search"
                >
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {loading && page === 1 && (
          <Box textAlign="center" mt={2}>
            <ButtonLoader size={60} />
          </Box>
        )}

        {/* Total Result Count */}
        {!loading &&
          searchTerm.trim().length > 0 &&
          Object.keys(products).length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Results: {productCount}
              </Typography>
            </Box>
          )}

        {!loading && (
          <>
            {Object.keys(products).length > 0 ? (
              <Box mt={4} className={styles.searchResultBox}>
                {Object.entries(products).map(([industry, items]) => (
                  <Box key={industry} mb={3}>
                    {items.map((item, index) => (
                      <Paper
                        key={`${item.id}_${index}`}
                        onClick={() => handleProductSelectFromSearch(item)}
                        elevation={2}
                        className={styles.searchProductCard}
                        sx={{ p: { xs: 1, sm: 2 } }}
                      >
                        <Box
                          display="flex"
                          flexDirection={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          rowGap={1}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                              wordBreak: "break-word",
                              maxWidth: { xs: "100%", sm: "40%" },
                            }}
                          >
                            {`➤ `}
                            {getHighlightedText(item.name, searchTerm)}
                          </Typography>

                          <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent={{
                              xs: "flex-start",
                              sm: "flex-end",
                            }}
                            maxWidth={{ xs: "100%", sm: "60%" }}
                          >
                            {item.ancestors.map((a, idx) => (
                              <Typography
                                key={idx}
                                variant="body2"
                                className={`${styles.depth} ${
                                  a.depth === 0
                                    ? styles.depth0
                                    : a.depth === 1
                                    ? styles.depth1
                                    : styles.depth2
                                }`}
                                sx={{ ml: 0.5 }}
                              >
                                {a.name}
                                {idx !== item.ancestors.length - 1 && " ➤"}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                ))}

                {/* 👇 Loader Target */}
                <Box ref={loaderRef} textAlign="center" mt={2}>
                  {(isFetchingMore || hasMore) && (
                    <Typography variant="body2" color="text.secondary">
                      Loading more products <ButtonLoader size={60} />
                    </Typography>
                  )}
                  {!hasMore && !isFetchingMore && (
                    <Typography variant="body2" color="text.secondary">
                      No more products to load.
                    </Typography>
                  )}
                </Box>
              </Box>
            ) : (
              searchTerm.trim().length > 0 &&
              searchTerm.trim().split(/\s+/).length <= 3 && (
                <Box className={styles.noProductWrapper}>
                  <SearchOff sx={{ fontSize: 80, color: "#ccc" }} />
                  <Typography variant="h5" fontWeight="bold" mt={2}>
                    No Products Found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </Typography>
                </Box>
              )
            )}
          </>
        )}
      </Box>
      {/* Select Industry  */}
      <Box className={styles.industryWrapper}>
        <Typography variant="subtitle1" className={styles.label}>
          Select Industry *
        </Typography>

        {/* Field-like wrapper */}
        <Box className={styles.selectedFieldWrapper}>
          {selectedIndustries.map((industry) => (
            <Chip
              key={industry.id}
              label={industry.name}
              onDelete={() => handleIndustryRemove(industry)}
              className={styles.selectedChip}
            />
          ))}

          {/* Input appears next to chips */}
          <input
            value={searchIndustry}
            onChange={(e) => setSearchIndustry(e.target.value)}
            placeholder="Choose Industry"
            className={styles.categoryInput}
          />

          {selectedIndustries.length > 0 && (
            <IconButton
              size="small"
              onClick={() => {
                setSelectedIndustries([]);
                setSelectedCategories([]);
                setSubCategories([]);
                setSelectedSubCategories([]);
                setSubcategoryProducts({});
                setSelectedProducts([]);
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Box>

        <Box className={styles.chipContainer}>
          {loadingIndustries
            ? [...Array(56)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={160}
                  height={36}
                  sx={{ borderRadius: 10 }}
                />
              ))
            : industries
                .filter(
                  (industry) =>
                    !selectedIndustries.some((i) => i.id === industry.id)
                )
                .map((industry) => {
                  const isMatch =
                    searchIndustry &&
                    industry.name
                      .toLowerCase()
                      .includes(searchIndustry.toLowerCase());

                  return (
                    <Chip
                      key={industry.id}
                      onClick={() => {
                        handleIndustrySelect(industry);
                        setSearchIndustry(""); // clear input after select
                      }}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <span>{industry.name}</span>
                          <Add sx={{ fontSize: 16 }} />
                        </Box>
                      }
                      color="default"
                      variant={isMatch ? "outlined" : "filled"}
                      className={`${styles.industryChip} ${
                        isMatch ? styles.match : ""
                      }`}
                    />
                  );
                })}
        </Box>
      </Box>
      {/* Select Categories */}
      {selectedIndustries.length > 0 && (
        <Box className={styles.categoryWrapper}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={styles.categoryLabel}
          >
            Select Categories *
          </Typography>
          <Box className={styles.selectedFieldWrapper}>
            {selectedCategories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                onDelete={() => handleCategorySelect(cat)}
                className={styles.selectedChip}
              />
            ))}
            <input
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              placeholder="Search or select category"
              className={styles.categoryInput}
            />

            {selectedCategories.length > 0 && (
              <IconButton
                size="small"
                onClick={() => {
                  setSelectedCategories([]);
                  setSubCategories([]);
                  setSelectedSubCategories([]);
                  setSubcategoryProducts({});
                  setSelectedProducts([]);
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box className={styles.categoryChipContainer}>
            {loadingCategories ? (
              [...Array(12)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={160}
                  height={36}
                  sx={{ borderRadius: 10 }}
                />
              ))
            ) : (
              <>
                {(showAllCategories ? categories : categories.slice(0, 50))
                  .filter(
                    (cat) => !selectedCategories.find((c) => c.id === cat.id)
                  )
                  .map((cat) => {
                    const isMatch =
                      searchCategory &&
                      cat.name
                        .toLowerCase()
                        .includes(searchCategory.toLowerCase());
                    return (
                      <Chip
                        key={cat.id}
                        onClick={() => {
                          handleCategorySelect(cat);
                          setSearchCategory("");
                        }}
                        color="default"
                        variant={isMatch ? "outlined" : "filled"}
                        className={`${styles.categoryChip} ${
                          isMatch ? styles.match : ""
                        }`}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <span>{cat.name}</span>
                            <Add sx={{ fontSize: 16 }} />
                          </Box>
                        }
                      />
                    );
                  })}

                {categories.length > 50 && (
                  <Chip
                    label={showAllCategories ? "Show Less" : "Show More"}
                    onClick={() => setShowAllCategories((prev) => !prev)}
                    className={styles.showMoreChip}
                    color="primary"
                    variant="outlined"
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      )}
      {/* Select Subcategories */}
      {selectedCategories.length > 0 && subCategories.length > 0 && (
        <Box className={styles.wrapper}>
          <Typography variant="subtitle1" className={styles.label}>
            Select Subcategories *
          </Typography>

          {/* Search + Selected inside field */}
          <Box className={styles.selectedInputWrapper}>
            {selectedSubCategories.map((sub) => (
              <Chip
                key={sub.id}
                label={sub.name}
                onDelete={() => handleSubCategorySelect(sub)}
                className={styles.selectedChip}
              />
            ))}
            <input
              value={searchSubCategory}
              onChange={(e) => setSearchSubCategory(e.target.value)}
              placeholder="Search or select subcategory"
              className={styles.input}
            />

            {selectedSubCategories.length > 0 && (
              <IconButton
                size="small"
                onClick={() => {
                  setSelectedSubCategories([]);
                  setSubcategoryProducts({});
                  setSelectedProducts([]);
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* All unselected chips */}
          <Box className={styles.chipContainer}>
            {(showAllSubCategories ? subCategories : subCategories.slice(0, 50))
              .filter(
                (sub) => !selectedSubCategories.find((s) => s.id === sub.id)
              )
              .map((sub) => {
                const isMatch =
                  searchSubCategory &&
                  sub.name
                    .toLowerCase()
                    .includes(searchSubCategory.toLowerCase());

                return (
                  <Chip
                    key={sub.id}
                    onClick={() => {
                      handleSubCategorySelect(sub);
                      setSearchSubCategory("");
                    }}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <span>{sub.name}</span>
                        <Add sx={{ fontSize: 16 }} />
                      </Box>
                    }
                    color="default"
                    variant={isMatch ? "outlined" : "filled"}
                    className={`${styles.chip} ${isMatch ? styles.match : ""}`}
                  />
                );
              })}

            {subCategories.length > 50 && (
              <Chip
                label={showAllSubCategories ? "Show Less" : "Show More"}
                onClick={() => setShowAllSubCategories((prev) => !prev)}
                className={styles.showMoreChip}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      )}

      {/* Select Products */}
      {selectedSubCategories.length > 0 &&
        Object.keys(subcategoryProducts).length > 0 && (
          <Box className={styles.productWrapper}>
            <Typography variant="subtitle1" className={styles.productLabel}>
              Select Products *
            </Typography>

            {/* Selected + Search Input */}
            <Box className={styles.selectedInputWrapper}>
              {selectedProducts.map((prod) => (
                <Chip
                  key={prod.id}
                  label={prod.name}
                  onDelete={() => handleProductSelect(prod)}
                  className={styles.selectedChip}
                />
              ))}

              <input
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Search or select product"
                className={styles.productInput}
              />

              {selectedProducts.length > 0 && (
                <IconButton
                  size="small"
                  onClick={() => setSelectedProducts([])}
                  title="Clear all"
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Box>

            {/* Unselected Product Chips */}
            <Box className={styles.unselectedChips}>
              {Object.entries(subcategoryProducts).flatMap(([_, items]) =>
                Array.isArray(items)
                  ? (showAllProducts ? items : items.slice(0, 50)) // Limit to first 50 if not showing all
                      .filter(
                        (item) =>
                          !selectedProducts.find((p) => p.id === item.id) &&
                          (!searchProduct ||
                            item.name
                              .toLowerCase()
                              .includes(searchProduct.toLowerCase()))
                      )
                      .map((item) => (
                        <Chip
                          key={item.id}
                          label={
                            <Box className={styles.chipContent}>
                              <span>{item.name}</span>
                              <Add sx={{ fontSize: 16 }} />
                            </Box>
                          }
                          onClick={() => {
                            handleProductSelect(item);
                            setSearchProduct("");
                          }}
                          color="default"
                          variant={searchProduct ? "outlined" : "filled"}
                          className={`${styles.productChip} ${
                            searchProduct ? styles.matchChip : ""
                          }`}
                        />
                      ))
                  : []
              )}
            </Box>

            {/* Show More / Show Less Button */}
            {Object.values(subcategoryProducts).flat().length > 50 && (
              <Box mt={1}>
                <Chip
                  label={showAllProducts ? "Show Less" : "Show More"}
                  onClick={() => setShowAllProducts((prev) => !prev)}
                  className={styles.showMoreChip}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            )}
          </Box>
        )}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="flex-end"
        gap={2}
        mt={3}
      >
        <Button
          fullWidth={isSmallScreen}
          variant="outlined"
          color="secondary"
          className={classNames("btn", "button")}
          onClick={() =>
            id
              ? navigate(`/portal/bids/details/${id}`)
              : navigate(`/portal/bids/`)
          }
        >
          Back
        </Button>

        {btnLoader ? (
          <Box width={isSmallScreen ? "100%" : "auto"}>
            <ButtonLoader size={60} />
          </Box>
        ) : (
          <Button
            fullWidth={isSmallScreen}
            className={classNames("btn", "button")}
            variant="contained"
            color="primary"
            onClick={handleCategorySubmit}
          >
            {id ? "Update" : "Submit"} Categories
          </Button>
        )}
      </Box>

      {showQueryForm && (
        <QueryFormModal
          showQueryForm={showQueryForm}
          setShowQueryForm={setShowQueryForm}
          formHeading="Category Suggestion Query"
          type="category"
        />
      )}
    </>
  );
};

export default CategoriesManagement;
