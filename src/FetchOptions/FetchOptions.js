import react, { useEffect, useState } from "react";

export const FetchBanks = () => {
  const [returnedBanks, setReturnedBanks] = useState([]);
  const getBanks = async () => {
    try {
      const allBanks = await fetch(
        "https://afarmacco-api.herokuapp.com/api/banks",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedBanks(allBanks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  return { returnedBanks };
};

export const FetchOtherItems = () => {
  const [returnedOtherItems, setReturnedOtherItems] = useState([]);
  const getOtherItems = async () => {
    try {
      const allOtherItems = await fetch(
        "https://afarmacco-api.herokuapp.com/api/other-items",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedOtherItems(allOtherItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOtherItems();
  }, []);

  return { returnedOtherItems };
};

export const FetchBirds = () => {
  const [returnedBirds, setReturnedBirds] = useState([]);
  const getBirds = async () => {
    try {
      const allBirds = await fetch(
        "https://afarmacco-api.herokuapp.com/api/birds",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedBirds(allBirds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBirds();
  }, []);

  return { returnedBirds };
};

export const FetchMethods = (url) => {
  const [returnedMethods, setReturnedMethods] = useState([]);
  const getPmtMethod = async () => {
    try {
      const allMethods = await fetch(
        "https://afarmacco-api.herokuapp.com/api/payments",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedMethods(allMethods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPmtMethod();
  }, []);
  return { returnedMethods };
};

export const FetchDrugs = () => {
  const [returnedDrugs, setReturnedDrugs] = useState([]);
  const getDrugs = async () => {
    try {
      const allDrugs = await fetch(
        "https://afarmacco-api.herokuapp.com/api/drugs",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedDrugs(allDrugs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrugs();
  }, []);

  return { returnedDrugs };
};

export const FetchFeeds = () => {
  const [returnedFeeds, setReturnedFeeds] = useState([]);
  const getFeeds = async () => {
    try {
      const allFeeds = await fetch(
        "https://afarmacco-api.herokuapp.com/api/feeds",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedFeeds(allFeeds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return { returnedFeeds };
};

export const FetchExpenseTypes = () => {
  const [returnedExpenseTypes, setReturnedExpenseTypes] = useState([]);
  const getExpenseTypes = async () => {
    try {
      const allExpenseTypes = await fetch(
        "https://afarmacco-api.herokuapp.com/api/expense-types",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedExpenseTypes(allExpenseTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenseTypes();
  }, []);

  return { returnedExpenseTypes };
};

export const FetchExpenseHeads = () => {
  const [returnedExpenseHeads, setReturnedExpenseHeads] = useState([]);
  const getExpenseHeads = async () => {
    try {
      const allExpenseHeads = await fetch(
        "https://afarmacco-api.herokuapp.com/api/expense-heads",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedExpenseHeads(allExpenseHeads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenseHeads();
  }, []);

  return { returnedExpenseHeads };
};
export const FetchAssetTypes = () => {
  const [returnedAssetTypes, setReturnedAssetTypes] = useState([]);
  const getAssetTypes = async () => {
    try {
      const allAssetTypes = await fetch(
        "https://afarmacco-api.herokuapp.com/api/asset-types",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedAssetTypes(allAssetTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssetTypes();
  }, []);

  return { returnedAssetTypes };
};
export const FetchTxnTypes = () => {
  const [returnedTxnTypes, setReturnedTxnTypes] = useState([]);
  const getTxnTypes = async () => {
    try {
      const allTxnTypes = await fetch(
        "https://afarmacco-api.herokuapp.com/api/txn-types",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setReturnedTxnTypes(allTxnTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTxnTypes();
  }, []);

  return { returnedTxnTypes };
};
