import React, { useEffect, useState, useContext } from "react";
import "../Styles/Dashboard.css";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import { LoggedOut } from "../Components/LoggedOut";
import { BiLogOut } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Loading } from "../Components/Loading";
import { useHistory } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

export const Dashboard = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [returnedDocPurchase, setReturnedDocPurchase] = useState([]);
  const [returnedBirdSales, setReturnedBirdSales] = useState([]);
  const [returnedPolSales, setReturnedPolSales] = useState([]);
  const [returnedPolMortality, setReturnedPolMortality] = useState([]);
  const [returnedPolLayers, setReturnedPolLayers] = useState([]);
  const [returnedDrugPurchase, setReturnedDrugPurchase] = useState([]);
  const [returnedDocMortality, setReturnedDocMortality] = useState([]);
  const [returnedDrugConsumed, setReturnedDrugConsumed] = useState([]);
  const [returnedFeedPurchase, setReturnedFeedPurchase] = useState([]);
  const [returnedFeedConsumed, setReturnedFeedConsumed] = useState([]);
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("");
  const history = useHistory();

  const [isNav, setIsNav] = useState(false);

  const [returnedUser, setReturnedUser] = useState([]);

  const getCurrentUser = async () => {
    try {
      const currentUser = await fetch("/api/user", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  let userFirstName;
  if (returnedUser.name) {
    userFirstName = returnedUser.name.map((currentUser) => {
      return currentUser.FirstName;
    });
  }
  useEffect(() => {
    getCurrentUser();
    console.log(userFirstName);
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // getting Infos start-----------------------------------------------------
  const getAllPolLayers = async () => {
    try {
      const allPolLayers = await fetch("/api/all-pol-layers", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolLayers(allPolLayers);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPolSales = async () => {
    try {
      const allPolSales = await fetch("/api/all-pol-sales", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolSales(allPolSales);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPolMortality = async () => {
    try {
      const allPolMortality = await fetch("/api/all-pol-mortality", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolMortality(allPolMortality);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDocPurchase = async () => {
    try {
      const allDocPurchase = await fetch("/api/all-doc-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDocPurchase(allDocPurchase);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBirdSales = async () => {
    try {
      const allBirdSales = await fetch("/api/all-bird-sales", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedBirdSales(allBirdSales);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDocMortality = async () => {
    try {
      const allDocMortality = await fetch("/api/all-doc-mortality", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDocMortality(allDocMortality);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDrugPurchase = async () => {
    try {
      const allDrugPurchase = await fetch("/api/all-drug-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDrugPurchase(allDrugPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDrugConsumed = async () => {
    try {
      const allDrugConsumed = await fetch("/api/all-drug-consumed", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDrugConsumed(allDrugConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllFeedPurchase = async () => {
    try {
      const allFeedPurchase = await fetch("/api/all-feed-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedFeedPurchase(allFeedPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllFeedConsumed = async () => {
    try {
      const allFeedConsumed = await fetch("/api/all-feed-consumed", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedFeedConsumed(allFeedConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  // getting Infos end-----------------------------------------------------

  useEffect(() => {
    getAllDocPurchase();
    getAllBirdSales();
    getAllDocMortality();
    getAllDrugPurchase();
    getAllDrugConsumed();
    getAllFeedPurchase();
    getAllFeedConsumed();
    getAllPolLayers();
    getAllPolSales();
    getAllPolMortality();
  }, []);

  // Totals start---------------------------------------------------------------------
  let totalPolLayers;
  if (returnedPolLayers.name) {
    totalPolLayers = returnedPolLayers.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  let totalPolSales;
  if (returnedPolSales.name) {
    totalPolSales = returnedPolSales.name.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let totalPolMortality;
  if (returnedPolMortality.name) {
    totalPolMortality = returnedPolMortality.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }

  let totalBirdPurchaseQty;
  if (returnedDocPurchase.name) {
    totalBirdPurchaseQty = returnedDocPurchase.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }

  let totalBirdSaleQty;
  if (returnedBirdSales.name) {
    totalBirdSaleQty = returnedBirdSales.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }

  let totalBirdDiedQty;
  if (returnedDocMortality.name) {
    totalBirdDiedQty = returnedDocMortality.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }

  let totalFeedPurchaseQty;
  if (returnedFeedPurchase.name) {
    totalFeedPurchaseQty = returnedFeedPurchase.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  let totalFeedBagUsed;
  if (returnedFeedConsumed.name) {
    totalFeedBagUsed = returnedFeedConsumed.name.reduce(
      (a, v) => (a = a + v.BagQtyUsed),
      0
    );
  }
  // Totals end---------------------------------------------------------------------

  // broilers------------------------------------------------------------------
  let broilerSale;
  if (returnedBirdSales.name) {
    broilerSale = returnedBirdSales.name.filter(
      (broiler) => broiler.BirdName === "Broiler"
    );
  }
  let broilerPurchase;
  if (returnedDocPurchase.name) {
    broilerPurchase = returnedDocPurchase.name.filter(
      (broiler) => broiler.BirdName === "Broiler"
    );
  }
  let broilerMortality;
  if (returnedDocMortality.name) {
    broilerMortality = returnedDocMortality.name.filter(
      (broiler) => broiler.BirdName === "Broiler"
    );
  }

  let broilerSaleQty;
  if (broilerSale) {
    broilerSaleQty = broilerSale.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let broilerPurchaseQty;
  if (broilerPurchase) {
    broilerPurchaseQty = broilerPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let broilerMortalityQty;
  if (broilerMortality) {
    broilerMortalityQty = broilerMortality.reduce((a, v) => (a = a + v.Qty), 0);
  }

  // broilers------------------------------------------------------------------
  // noilers------------------------------------------------------------------
  let noilerSale;
  if (returnedBirdSales.name) {
    noilerSale = returnedBirdSales.name.filter(
      (noiler) => noiler.BirdName === "Noiler"
    );
  }
  let noilerPurchase;
  if (returnedDocPurchase.name) {
    noilerPurchase = returnedDocPurchase.name.filter(
      (noiler) => noiler.BirdName === "Noiler"
    );
  }
  let noilerMortality;
  if (returnedDocMortality.name) {
    noilerMortality = returnedDocMortality.name.filter(
      (noiler) => noiler.BirdName === "Noiler"
    );
  }

  let noilerSaleQty;
  if (noilerSale) {
    noilerSaleQty = noilerSale.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let noilerPurchaseQty;
  if (noilerPurchase) {
    noilerPurchaseQty = noilerPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let noilerMortalityQty;
  if (noilerMortality) {
    noilerMortalityQty = noilerMortality.reduce((a, v) => (a = a + v.Qty), 0);
  }

  // noilers------------------------------------------------------------------
  // cockerels------------------------------------------------------------------
  let cockerelSale;
  if (returnedBirdSales.name) {
    cockerelSale = returnedBirdSales.name.filter(
      (cockerel) => cockerel.BirdName === "Cockerel"
    );
  }
  let cockerelPurchase;
  if (returnedDocPurchase.name) {
    cockerelPurchase = returnedDocPurchase.name.filter(
      (cockerel) => cockerel.BirdName === "Cockerel"
    );
  }
  let cockerelMortality;
  if (returnedDocMortality.name) {
    cockerelMortality = returnedDocMortality.name.filter(
      (cockerel) => cockerel.BirdName === "Cockerel"
    );
  }

  let cockerelSaleQty;
  if (cockerelSale) {
    cockerelSaleQty = cockerelSale.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let cockerelPurchaseQty;
  if (cockerelPurchase) {
    cockerelPurchaseQty = cockerelPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let cockerelMortalityQty;
  if (cockerelMortality) {
    cockerelMortalityQty = cockerelMortality.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }

  // cockerels------------------------------------------------------------------
  // turkeys------------------------------------------------------------------
  let turkeySale;
  if (returnedBirdSales.name) {
    turkeySale = returnedBirdSales.name.filter(
      (turkey) => turkey.BirdName === "Turkey"
    );
  }
  let turkeyPurchase;
  if (returnedDocPurchase.name) {
    turkeyPurchase = returnedDocPurchase.name.filter(
      (turkey) => turkey.BirdName === "Turkey"
    );
  }
  let turkeyMortality;
  if (returnedDocMortality.name) {
    turkeyMortality = returnedDocMortality.name.filter(
      (turkey) => turkey.BirdName === "Turkey"
    );
  }

  let turkeySaleQty;
  if (turkeySale) {
    turkeySaleQty = turkeySale.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let turkeyPurchaseQty;
  if (turkeyPurchase) {
    turkeyPurchaseQty = turkeyPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let turkeyMortalityQty;
  if (turkeyMortality) {
    turkeyMortalityQty = turkeyMortality.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // turkeys------------------------------------------------------------------
  // layers------------------------------------------------------------------
  let layerSale;
  if (returnedBirdSales.name) {
    layerSale = returnedBirdSales.name.filter(
      (layer) => layer.BirdName === "Layer"
    );
  }
  let layerPurchase;
  if (returnedDocPurchase.name) {
    layerPurchase = returnedDocPurchase.name.filter(
      (layer) => layer.BirdName === "Layer"
    );
  }
  let layerMortality;
  if (returnedDocMortality.name) {
    layerMortality = returnedDocMortality.name.filter(
      (layer) => layer.BirdName === "Layer"
    );
  }

  let layerSaleQty;
  if (layerSale) {
    layerSaleQty = layerSale.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let layerPurchaseQty;
  if (layerPurchase) {
    layerPurchaseQty = layerPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let layerMortalityQty;
  if (layerMortality) {
    layerMortalityQty = layerMortality.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // layers------------------------------------------------------------------

  // antibiotics start-------------------------------------------------------------------------
  let antibioticsPurchase;
  if (returnedDrugPurchase.name) {
    antibioticsPurchase = returnedDrugPurchase.name.filter(
      (antibiotic) =>
        antibiotic.DrugName === "Antibiotics" &&
        antibiotic.DrugForm === search &&
        antibiotic.Unit === unit
    );
  }
  let antibioticsUsed;
  if (returnedDrugConsumed.name) {
    antibioticsUsed = returnedDrugConsumed.name.filter(
      (antibiotic) =>
        antibiotic.DrugName === "Antibiotics" &&
        antibiotic.DrugForm === search &&
        antibiotic.Unit === unit
    );
  }

  let antibioticsPurchaseQty;
  if (antibioticsPurchase) {
    antibioticsPurchaseQty = antibioticsPurchase.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  let antibioticsUsedQty;
  if (antibioticsUsed) {
    antibioticsUsedQty = antibioticsUsed.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }
  // antibiotics start-------------------------------------------------------------------------
  // anticoccidiosis start-------------------------------------------------------------------------
  let anticoccidiosisPurchase;
  if (returnedDrugPurchase.name) {
    anticoccidiosisPurchase = returnedDrugPurchase.name.filter(
      (anticoccidiosis) =>
        anticoccidiosis.DrugName === "Anticoccidiosis" &&
        anticoccidiosis.DrugForm === search &&
        anticoccidiosis.Unit === unit
    );
  }
  let anticoccidiosisUsed;
  if (returnedDrugConsumed.name) {
    anticoccidiosisUsed = returnedDrugConsumed.name.filter(
      (anticoccidiosis) =>
        anticoccidiosis.DrugName === "Anticoccidiosis" &&
        anticoccidiosis.DrugForm === search &&
        anticoccidiosis.Unit === unit
    );
  }

  let anticoccidiosisPurchaseQty;
  if (anticoccidiosisPurchase) {
    anticoccidiosisPurchaseQty = anticoccidiosisPurchase.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  let anticoccidiosisUsedQty;
  if (anticoccidiosisUsed) {
    anticoccidiosisUsedQty = anticoccidiosisUsed.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }
  // anticoccidiosis start-------------------------------------------------------------------------
  // antiviral start-------------------------------------------------------------------------
  let antiviralPurchase;
  if (returnedDrugPurchase.name) {
    antiviralPurchase = returnedDrugPurchase.name.filter(
      (antiviral) =>
        antiviral.DrugName === "Antiviral" &&
        antiviral.DrugForm === search &&
        antiviral.Unit === unit
    );
  }
  let antiviralUsed;
  if (returnedDrugConsumed.name) {
    antiviralUsed = returnedDrugConsumed.name.filter(
      (antiviral) =>
        antiviral.DrugName === "Antiviral" &&
        antiviral.DrugForm === search &&
        antiviral.Unit === unit
    );
  }

  let antiviralPurchaseQty;
  if (antiviralPurchase) {
    antiviralPurchaseQty = antiviralPurchase.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  let antiviralUsedQty;
  if (antiviralUsed) {
    antiviralUsedQty = antiviralUsed.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }
  // antiviral start-------------------------------------------------------------------------
  // coryza start-------------------------------------------------------------------------
  let coryzaPurchase;
  if (returnedDrugPurchase.name) {
    coryzaPurchase = returnedDrugPurchase.name.filter(
      (coryza) =>
        coryza.DrugName === "Coryza" &&
        coryza.DrugForm === search &&
        coryza.Unit === unit
    );
  }
  let coryzaUsed;
  if (returnedDrugConsumed.name) {
    coryzaUsed = returnedDrugConsumed.name.filter(
      (coryza) =>
        coryza.DrugName === "Coryza" &&
        coryza.DrugForm === search &&
        coryza.Unit === unit
    );
  }

  let coryzaPurchaseQty;
  if (coryzaPurchase) {
    coryzaPurchaseQty = coryzaPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let coryzaUsedQty;
  if (coryzaUsed) {
    coryzaUsedQty = coryzaUsed.reduce((a, v) => (a = a + v.SatchetQtyUsed), 0);
  }
  // coryza start-------------------------------------------------------------------------
  // deworm start-------------------------------------------------------------------------
  let dewormPurchase;
  if (returnedDrugPurchase.name) {
    dewormPurchase = returnedDrugPurchase.name.filter(
      (deworm) =>
        deworm.DrugName === "Deworm" &&
        deworm.DrugForm === search &&
        deworm.Unit === unit
    );
  }
  let dewormUsed;
  if (returnedDrugConsumed.name) {
    dewormUsed = returnedDrugConsumed.name.filter(
      (deworm) =>
        deworm.DrugName === "Deworm" &&
        deworm.DrugForm === search &&
        deworm.Unit === unit
    );
  }

  let dewormPurchaseQty;
  if (dewormPurchase) {
    dewormPurchaseQty = dewormPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let dewormUsedQty;
  if (dewormUsed) {
    dewormUsedQty = dewormUsed.reduce((a, v) => (a = a + v.SatchetQtyUsed), 0);
  }
  // deworm start-------------------------------------------------------------------------
  // multivitamin start-------------------------------------------------------------------------
  let multivitaminPurchase;
  if (returnedDrugPurchase.name) {
    multivitaminPurchase = returnedDrugPurchase.name.filter(
      (multivitamin) =>
        multivitamin.DrugName === "Multivitamin" &&
        multivitamin.DrugForm === search &&
        multivitamin.Unit === unit
    );
  }
  let multivitaminUsed;
  if (returnedDrugConsumed.name) {
    multivitaminUsed = returnedDrugConsumed.name.filter(
      (multivitamin) =>
        multivitamin.DrugName === "Multivitamin" &&
        multivitamin.DrugForm === search &&
        multivitamin.Unit === unit
    );
  }

  let multivitaminPurchaseQty;
  if (multivitaminPurchase) {
    multivitaminPurchaseQty = multivitaminPurchase.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  let multivitaminUsedQty;
  if (multivitaminUsed) {
    multivitaminUsedQty = multivitaminUsed.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }
  // multivitamin start-------------------------------------------------------------------------
  // vaccine start-------------------------------------------------------------------------
  let vaccinePurchase;
  if (returnedDrugPurchase.name) {
    vaccinePurchase = returnedDrugPurchase.name.filter(
      (vaccine) =>
        vaccine.DrugName === "Vaccine" &&
        vaccine.DrugForm === search &&
        vaccine.Unit === unit
    );
  }
  let vaccineUsed;
  if (returnedDrugConsumed.name) {
    vaccineUsed = returnedDrugConsumed.name.filter(
      (vaccine) =>
        vaccine.DrugName === "Vaccine" &&
        vaccine.DrugForm === search &&
        vaccine.Unit === unit
    );
  }

  let vaccinePurchaseQty;
  if (vaccinePurchase) {
    vaccinePurchaseQty = vaccinePurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let vaccineUsedQty;
  if (vaccineUsed) {
    vaccineUsedQty = vaccineUsed.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }
  // vaccine start-------------------------------------------------------------------------

  let totalDrugPurchaseQty;
  if (returnedDrugPurchase.name) {
    totalDrugPurchaseQty =
      antibioticsPurchaseQty +
      anticoccidiosisPurchaseQty +
      antiviralPurchaseQty +
      coryzaPurchaseQty +
      dewormPurchaseQty +
      multivitaminPurchaseQty +
      vaccinePurchaseQty;
  }

  let totalDrugSatchetUsed;
  if (returnedDrugConsumed.name) {
    totalDrugSatchetUsed =
      antibioticsUsedQty +
      anticoccidiosisUsedQty +
      antiviralUsedQty +
      coryzaUsedQty +
      dewormUsedQty +
      multivitaminUsedQty +
      vaccineUsedQty;
  }

  const allDrugPurchaseQty =
    antibioticsUsedQty +
    anticoccidiosisUsedQty +
    antiviralUsedQty +
    coryzaUsedQty +
    dewormUsedQty +
    multivitaminUsedQty +
    vaccineUsedQty;

  // finisher start------------------------------------------------------------------------------
  let finisherPurchase;
  if (returnedFeedPurchase.name) {
    finisherPurchase = returnedFeedPurchase.name.filter(
      (finisher) => finisher.FeedName === "Finisher"
    );
  }
  let finisherUsed;
  if (returnedFeedConsumed.name) {
    finisherUsed = returnedFeedConsumed.name.filter(
      (finisher) => finisher.FeedName === "Finisher"
    );
  }

  let finisherPurchaseQty;
  if (finisherPurchase) {
    finisherPurchaseQty = finisherPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let finisherUsedQty;
  if (finisherUsed) {
    finisherUsedQty = finisherUsed.reduce((a, v) => (a = a + v.BagQtyUsed), 0);
  }
  // finisher start------------------------------------------------------------------------------

  // grower start------------------------------------------------------------------------------
  let growerPurchase;
  if (returnedFeedPurchase.name) {
    growerPurchase = returnedFeedPurchase.name.filter(
      (grower) => grower.FeedName === "Grower"
    );
  }
  let growerUsed;
  if (returnedFeedConsumed.name) {
    growerUsed = returnedFeedConsumed.name.filter(
      (grower) => grower.FeedName === "Grower"
    );
  }

  let growerPurchaseQty;
  if (growerPurchase) {
    growerPurchaseQty = growerPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let growerUsedQty;
  if (growerUsed) {
    growerUsedQty = growerUsed.reduce((a, v) => (a = a + v.BagQtyUsed), 0);
  }
  // grower start------------------------------------------------------------------------------
  // starter start------------------------------------------------------------------------------
  let starterPurchase;
  if (returnedFeedPurchase.name) {
    starterPurchase = returnedFeedPurchase.name.filter(
      (starter) => starter.FeedName === "Starter"
    );
  }
  let starterUsed;
  if (returnedFeedConsumed.name) {
    starterUsed = returnedFeedConsumed.name.filter(
      (starter) => starter.FeedName === "Starter"
    );
  }

  let starterPurchaseQty;
  if (starterPurchase) {
    starterPurchaseQty = starterPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let starterUsedQty;
  if (starterUsed) {
    starterUsedQty = starterUsed.reduce((a, v) => (a = a + v.BagQtyUsed), 0);
  }
  // starter start------------------------------------------------------------------------------

  return (
    <div className="dashboard">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}

      {authState ? (
        <div className="dashboard-container">
          <div className="dash-header">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="welcome">
              <h1>Inventory</h1>
              <p>Today, {current.toDateString()}</p>
            </div>
            <p> </p>
          </div>
          {returnedBirdSales.name &&
          returnedDocPurchase.name &&
          returnedFeedPurchase.name &&
          returnedDocMortality.name &&
          returnedDrugConsumed.name &&
          returnedFeedConsumed ? (
            <div className="dashboard-wrapper  animate__animated animate__fadeIn">
              {returnedDocMortality.name &&
              returnedDocPurchase.name &&
              returnedBirdSales.name &&
              returnedDocPurchase.name.length === 0 &&
              returnedDocMortality.name.length === 0 &&
              returnedBirdSales.name.length === 0 &&
              returnedDrugConsumed.name &&
              returnedDrugPurchase.name &&
              returnedDrugConsumed.name.length === 0 &&
              returnedDrugPurchase.name.length === 0 &&
              returnedFeedConsumed.name &&
              returnedFeedPurchase.name &&
              returnedFeedConsumed.name.length === 0 &&
              returnedFeedPurchase.name.length === 0 ? (
                <div className="empty-main-report">
                  <h1>You do not have any stock in your inventory yet.</h1>
                  <p>When you do, they would appear here</p>
                </div>
              ) : (
                <>
                  <div className="dash-bird-container dash">
                    {returnedDocMortality.name &&
                    returnedDocPurchase.name &&
                    returnedBirdSales.name &&
                    returnedDocPurchase.name.length === 0 &&
                    returnedDocMortality.name.length === 0 &&
                    returnedBirdSales.name.length === 0 ? (
                      <p>
                        You do not have any bird yet. when you do, they would
                        appear here...
                      </p>
                    ) : (
                      <>
                        <div className="inv-title">
                          <h3 className="gray">Birds Inventory</h3>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="xls-download"
                            table="birds-inventory"
                            filename="Afarmacco-Birds Inventory"
                            sheet="Birds Inventory"
                            buttonText={<BsDownload />}
                          />
                        </div>
                        {returnedBirdSales.name ? (
                          <table id="birds-inventory">
                            <tr>
                              <th>Bird</th>
                              <th>Purchased</th>
                              <th>Sold</th>
                              <th>Mortality</th>
                              <th>Balance</th>
                            </tr>
                            <tr>
                              <td>Broiler</td>
                              <td>{broilerPurchaseQty}</td>
                              <td>{broilerSaleQty}</td>
                              <td>{broilerMortalityQty}</td>
                              <td>
                                {broilerPurchaseQty -
                                  (broilerMortalityQty + broilerSaleQty)}
                              </td>
                            </tr>
                            <tr>
                              <td>Noiler</td>
                              <td>{noilerPurchaseQty}</td>
                              <td>{noilerSaleQty}</td>
                              <td>{noilerMortalityQty}</td>
                              <td>
                                {noilerPurchaseQty -
                                  (noilerMortalityQty + noilerSaleQty)}
                              </td>
                            </tr>
                            <tr>
                              <td>Cockerel</td>
                              <td>{cockerelPurchaseQty}</td>
                              <td>{cockerelSaleQty}</td>
                              <td>{cockerelMortalityQty}</td>
                              <td>
                                {cockerelPurchaseQty -
                                  (cockerelMortalityQty + cockerelSaleQty)}
                              </td>
                            </tr>
                            <tr>
                              <td>Turkey</td>
                              <td>{turkeyPurchaseQty}</td>
                              <td>{turkeySaleQty}</td>
                              <td>{turkeyMortalityQty}</td>
                              <td>
                                {turkeyPurchaseQty -
                                  (turkeyMortalityQty + turkeySaleQty)}
                              </td>
                            </tr>
                            <tr>
                              <td>Layer (DOC)</td>
                              <td>{layerPurchaseQty}</td>
                              <td>{layerSaleQty}</td>
                              <td>{layerMortalityQty}</td>
                              <td>
                                {layerPurchaseQty -
                                  (layerMortalityQty + layerSaleQty)}
                              </td>
                            </tr>
                            <tr>
                              <td>Layer (POL)</td>
                              <td>{totalPolLayers}</td>
                              <td>{totalPolSales}</td>
                              <td>{totalPolMortality}</td>
                              <td>
                                {totalPolLayers -
                                  (totalPolSales + totalPolMortality)}
                              </td>
                            </tr>
                            <tfoot className="total-container">
                              <tr>
                                <th
                                  id="total"
                                  className="total dashboard-total"
                                  colSpan="1"
                                >
                                  Total :
                                </th>
                                <td className="total dashboard-total">
                                  {totalBirdPurchaseQty + totalPolLayers}
                                </td>
                                <td className="total dashboard-total">
                                  {totalBirdSaleQty + totalPolSales}
                                </td>
                                <td className="total dashboard-total">
                                  {totalBirdDiedQty + totalPolMortality}
                                </td>
                                <td className="total dashboard-total">
                                  {totalBirdPurchaseQty +
                                    totalPolLayers -
                                    (totalBirdSaleQty +
                                      totalPolSales +
                                      (totalBirdDiedQty + totalPolMortality))}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        ) : (
                          <p>loading, please wait...</p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="dash-drug-container dash">
                    {returnedDrugConsumed.name &&
                    returnedDrugPurchase.name &&
                    returnedDrugConsumed.name.length === 0 &&
                    returnedDrugPurchase.name.length === 0 ? (
                      <p>
                        You do not have any drugs yet. when you do, they would
                        appear here...
                      </p>
                    ) : (
                      <>
                        <div className="inv-title">
                          <h3 className="gray">Drugs Inventory</h3>
                          <div>
                            <p>Container: </p>
                            <select
                              name="search"
                              id="search"
                              value={search}
                              placeholder="Search"
                              onChange={(e) => setSearch(e.target.value)}
                            >
                              <option></option>
                              <option>Satchet</option>
                              <option>Bag</option>
                              <option>Bottle</option>
                            </select>
                          </div>
                          <div>
                            <p>Unit: </p>
                            <select
                              name="unit"
                              id="unit"
                              className="unit"
                              value={unit}
                              placeholder="Unit"
                              onChange={(e) => setUnit(e.target.value)}
                            >
                              <option></option>
                              <option>Kg</option>
                              <option>Grams</option>
                              <option>Milligrams</option>
                              <option>Litres</option>
                              <option>Centilitres</option>
                              <option>Millilitres</option>
                            </select>
                          </div>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="xls-download"
                            table="drugs-inventory"
                            filename="Afarmacco-Drugs Inventory"
                            sheet="Drugs Inventory"
                            buttonText={<BsDownload />}
                          />
                        </div>
                        {returnedDrugPurchase.name ? (
                          <table id="drugs-inventory">
                            <tr>
                              <th>Drug</th>
                              <th>Purchased</th>
                              <th>Cosumed</th>
                              <th>Balance</th>
                            </tr>
                            <tr>
                              <td>Antibiotics</td>
                              <td>{antibioticsPurchaseQty}</td>
                              <td>{antibioticsUsedQty}</td>
                              <td>
                                {antibioticsPurchaseQty - antibioticsUsedQty}
                              </td>
                            </tr>
                            <tr>
                              <td>Anticoccidiosis</td>
                              <td>{anticoccidiosisPurchaseQty}</td>
                              <td>{anticoccidiosisUsedQty}</td>
                              <td>
                                {anticoccidiosisPurchaseQty -
                                  anticoccidiosisUsedQty}
                              </td>
                            </tr>
                            <tr>
                              <td>Antiviral</td>
                              <td>{antiviralPurchaseQty}</td>
                              <td>{antiviralUsedQty}</td>
                              <td>{antiviralPurchaseQty - antiviralUsedQty}</td>
                            </tr>
                            <tr>
                              <td>Coryza</td>
                              <td>{coryzaPurchaseQty}</td>
                              <td>{coryzaUsedQty}</td>
                              <td>{coryzaPurchaseQty - coryzaUsedQty}</td>
                            </tr>
                            <tr>
                              <td>Deworm</td>
                              <td>{dewormPurchaseQty}</td>
                              <td>{dewormUsedQty}</td>
                              <td>{dewormPurchaseQty - dewormUsedQty}</td>
                            </tr>
                            <tr>
                              <td>Multivitamin</td>
                              <td>{multivitaminPurchaseQty}</td>
                              <td>{multivitaminUsedQty}</td>
                              <td>
                                {multivitaminPurchaseQty - multivitaminUsedQty}
                              </td>
                            </tr>
                            <tr>
                              <td>Vaccine</td>
                              <td>{vaccinePurchaseQty}</td>
                              <td>{vaccineUsedQty}</td>
                              <td>{vaccinePurchaseQty - vaccineUsedQty}</td>
                            </tr>
                            <tfoot className="total-container">
                              <tr>
                                <th
                                  id="total"
                                  className="total dashboard-total"
                                  colSpan="1"
                                >
                                  Total :
                                </th>
                                <td className="total dashboard-total">
                                  {totalDrugPurchaseQty}
                                </td>
                                <td className="total dashboard-total">
                                  {totalDrugSatchetUsed}
                                </td>
                                <td className="total dashboard-total">
                                  {totalDrugPurchaseQty - totalDrugSatchetUsed}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        ) : (
                          <p>loading, please wait...</p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="dash-feed-container dash">
                    {returnedFeedConsumed.name &&
                    returnedFeedPurchase.name &&
                    returnedFeedConsumed.name.length === 0 &&
                    returnedFeedPurchase.name.length === 0 ? (
                      <p>
                        You do not have any feed yet. when you do, they would
                        appear here...
                      </p>
                    ) : (
                      <>
                        <div className="inv-title">
                          <h3 className="gray">Feed Inventory</h3>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="xls-download"
                            table="feeds-inventory"
                            filename="Afarmacco-Feeds Inventory"
                            sheet="Feeds Inventory"
                            buttonText={<BsDownload />}
                          />
                        </div>

                        {returnedFeedPurchase.name ? (
                          <table id="feeds-inventory">
                            <tr>
                              <th>Feed</th>
                              <th>Purchased (Kg)</th>
                              <th>Consumed (Kg)</th>
                              <th>Balance (Kg)</th>
                            </tr>
                            <tr>
                              <td>Starter</td>
                              <td>{starterPurchaseQty}</td>
                              <td>{starterUsedQty}</td>
                              <td>{starterPurchaseQty - starterUsedQty}</td>
                            </tr>
                            <tr>
                              <td>Grower</td>
                              <td>{growerPurchaseQty}</td>
                              <td>{growerUsedQty}</td>
                              <td>{growerPurchaseQty - growerUsedQty}</td>
                            </tr>
                            <tr>
                              <td>Finisher</td>
                              <td>{finisherPurchaseQty}</td>
                              <td>{finisherUsedQty}</td>
                              <td>{finisherPurchaseQty - finisherUsedQty}</td>
                            </tr>
                            <tfoot className="total-container">
                              <tr>
                                <th
                                  id="total"
                                  className="total dashboard-total"
                                  colSpan="1"
                                >
                                  Total :
                                </th>
                                <td className="total dashboard-total">
                                  {totalFeedPurchaseQty}
                                </td>
                                <td className="total dashboard-total">
                                  {totalFeedBagUsed}
                                </td>
                                <td className="total dashboard-total">
                                  {totalFeedPurchaseQty - totalFeedBagUsed}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        ) : (
                          <p>loading, please wait...</p>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
