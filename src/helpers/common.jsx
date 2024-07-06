export const getMinMaxDate = (fromToday, fromMin) => {
  // Get current date
  const currentDate = new Date();
  // Calculate minDate
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + fromToday);
  // Calculate maxDate
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + fromMin);
  return [minDate, maxDate];
};

export const extractFileExtension = (name) => {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return ""; // No extension found
  }
  return name.substring(lastDotIndex + 1);
};

export const getProductUnits = () => {
  const units = [
    { lable: "Kilogram (kg)", value: "kg" },
    { lable: "Gram (g)", value: "g" },
    { lable: "Metric Ton (MT)", value: "MT" },
    { lable: "Pound (lb)", value: "lb" },
    { lable: "Ounce (oz)", value: "oz" },
    { lable: "Ton (T)", value: "T" },
    { lable: "Cubic Meter (cbm)", value: "cbm" },
    { lable: "Liter (L)", value: "L" },
    { lable: "Milliliter (mL)", value: "mL" },
    { lable: "Piece (pc)", value: "pc" },
    { lable: "Sheet (sh)", value: "sh" },
    { lable: "Roll (rl)", value: "rl" },
    { lable: "Bar (br)", value: "br" },
    { lable: "Gallon (gal)", value: "gal" },
    { lable: "Drum (dr)", value: "dr" },
    { lable: "Bag (bg)", value: "bg" },
    { lable: "Barrel (bbl)", value: "bbl" },
    { lable: "Meter (m)", value: "m" },
    { lable: "Yard (yd)", value: "yd" },
    { lable: "Bolt (bt)", value: "bt" },
    { lable: "Cubic Foot (cbf)", value: "cbf" },
    { lable: "Board Foot (bf)", value: "bf" },
    { lable: "Plank (plk)", value: "plk" },
    { lable: "Bundle (bdl)", value: "bdl" },
    { lable: "Pellet (plt)", value: "plt" },
    { lable: "Standard Cubic Feet (scf)", value: "scf" },
    { lable: "Cylinder (cy)", value: "cy" },
  ];

  return units;
};

export const getLableByValue = (value) => {
  const units = getProductUnits();
  const unit = units.find((unit) => unit.value === value);
  return unit ? unit?.lable : null;
};

export const convertFileSize = (size) => {
  const checkedSize = Math.floor((size / 1024).toFixed(2));
  if (checkedSize > 0) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / 1024).toFixed(2)} KB`;
  }
};

export const getCategoryLevel = () => {
  const propsData = {
    0: {
      name: "industry",
      label: "Industry",
      placeholder: "Choose Industry",
      rules: "Industry is required.",
    },
    1: {
      name: "category",
      label: "Category",
      placeholder: "Choose Category",
      rules: "Category is required.",
    },
    2: {
      name: "sub_category",
      label: "Sub Category",
      placeholder: "Choose Sub Category",
    },
    3: {
      name: "product",
      label: "Product",
      placeholder: "Choose Product",
    },
  };

  return propsData;
};
