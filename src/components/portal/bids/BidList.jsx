import { useEffect, useRef, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import {
  created_bids_column,
  invited_bids_column,
  related_bids_column,
} from "../../../elements/CustomDataTable/PortalColumnData";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./BidList.module.scss";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import RequestModal from "../../../elements/CustomModal/RequestModal";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { Close } from "@mui/icons-material";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const BidList = ({ listType }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const [bidDetails, setBidDetails] = useState({});
  const [createdBids, setCreatedBids] = useState([]);
  const [inviteBids, setInviteBids] = useState([]);
  const [relatedBids, setRelatedBids] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const loaderRef = useRef();
  const debounceTimeout = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);

  // To Created Bid List
  const getCreatedBidList = async (productIds = []) => {
    try {
      const queryParams = productIds.length
        ? `?category=${productIds.join("&category=")}`
        : "";

      const response = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls.CREATED_LIST_BIDS}${queryParams}`,
        "",
        true
      );

      if (response.status === 200) {
        setCreatedBids(response.data);
        setScreenLoader(false);
      }
    } catch (error) {}
  };

  // To Invited Bid List
  const getInvitedBidList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.INVITED_BID_LIST,
        "",
        true
      );
      if (response.status === 200) {
        setInviteBids(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // To Related Bid List
  const getRelatedBidList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.RELATED_BID_LIST,
        "",
        true
      );
      if (response.status === 200) {
        setRelatedBids(response.data);
        setScreenLoader(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const productIds = selectedProducts.map((p) => p.id);
    getCreatedBidList(productIds);
  }, [selectedProducts]);

  useEffect(() => {
    const fetchBidList = {
      created: getCreatedBidList,
      invited: getInvitedBidList,
      related: getRelatedBidList,
    };

    fetchBidList[listType]?.();
  }, [sendRequest]);

  const addCreatedAction = (cell) => { 
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

  const addInvitedAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

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

      const grouped = groupByIndustry(res.data.results);
      setHasMore(res.data.next !== null);

      if (isNewSearch) {
        console.log(res.data.results.length, " : Response");
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

  const handleProductSelectFromSearch = (item) => {
    setSearchTerm("");
    setProducts({});
    if (!selectedProducts.some((p) => p.id === item.id)) {
      setSelectedProducts((prev) => [...prev, item]);
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

  const handlerequest = (data) => {
    setSendRequest(true);
    setBidDetails(data.row.original);
  };

  const requestAction = (cell) => {
    const is_requested = cell.row.original.is_requested;
    if (cell.column.id === "action") {
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <button
            className={`${styles["request-btn"]} ${
              is_requested ? styles["disable"] : styles["request-btn"]
            }`}
            onClick={() => handlerequest(cell)}
            disabled={is_requested && true}
          >
            {is_requested === true ? "Requested" : "invite Request"}
          </button>
        </TableCell>
      );
    } else {
      return (
        <TableCell {...cell.getCellProps()} align={cell.column.align}>
          {" "}
          {cell.render("Cell")}{" "}
        </TableCell>
      );
    }
  };

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      {listType === "created" && (
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search according to product or category"
            autoComplete="off"
            className={styles.customInput}
            InputProps={{
              startAdornment: selectedProducts.map((product) => (
                <Chip
                  key={product.id}
                  label={product.name}
                  className={styles.selectedChip}
                  size="medium"
                  onDelete={() =>
                    setSelectedProducts((prev) =>
                      prev.filter((p) => p.id !== product.id)
                    )
                  }
                  sx={{ m: 0.3 }}
                />
              )),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSearchTerm("");
                      setProducts({});
                      setSelectedProducts([]);
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

                  {/* ⏳ Infinite Scroll Loader */}
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
              ) : null}
            </>
          )}
        </Box>
      )}

      {listType === "created" ? (
        <DataTable
          propsColumn={created_bids_column(setScreenLoader)}
          propsData={createdBids}
          action={addCreatedAction}
          customClassName="portal-data-table"
          isSingleSelection={true}
        />
      ) : listType === "invited" ? (
        <DataTable
          propsColumn={invited_bids_column}
          propsData={inviteBids}
          action={addInvitedAction}
          customClassName="portal-data-table"
        />
      ) : (
        listType === "related" && (
          <DataTable
            propsColumn={related_bids_column}
            propsData={relatedBids || []}
            action={requestAction}
            customClassName="portal-data-table"
          />
        )
      )}

      {sendRequest && (
        <RequestModal
          sendRequest={sendRequest}
          setSendRequest={setSendRequest}
          bidDetails={bidDetails}
        />
      )}
    </>
  );
};

export default BidList;
