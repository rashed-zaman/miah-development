// redirects.js

const redirects = [
  // MEN / Lungi
  {
    source: "/men/lungi/print-batik",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source: "/men/lungi/solid",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/men/lungi/stripe-check",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source: "/men/lungi/dobby-jacquard",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/men/lungi/block_print",
    destination: "/men/block-print-lungi",
    permanent: true,
  },

  // MEN / Panjabi
  {
    source: "/men/panjabi/premium",
    destination: "/men/turquoise-premium-panjabi",
    permanent: true,
  },
  {
    source: "/men/panjabi/garnet",
    destination: "/mens/panjabi-garnet",
    permanent: true,
  },
  {
    source: "/men/panjabi/opal",
    destination: "/mens/panjabi-opal",
    permanent: true,
  },

  // WOMEN / Salwar Kameez
  {
    source: "/women/salwar-kameez/print",
    destination: "/women/print-salwar-kameez",
    permanent: true,
  },
  {
    source: "/women/salwar-kameez/embroidery",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },

  // WOMEN / Saree cleanup
  {
    source: "/women/saree/others",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/women/saree/jamdani-sharee",
    destination: "/women/jamdani-saree",
    permanent: true,
  },

  // KIDS / Boys
  {
    source: "/kids/boys/kids-lungi",
    destination: "/kids/boys-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Pradhanno-44721",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Pradhanno-13377",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Pradhanno-58505",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Pradhanno-48645",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Pradhanno-48326",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Onuvob-14294",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-99675",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-74372",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-27000",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-89184",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-99246",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-24201",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Rainbow-31382",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-29073",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-99675",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-74372",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-27000",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-89184",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Rainbow-31382",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-99246",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-24201",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-29073",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-67291",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-38847",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Western-88675",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-70589",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-27339",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Torongo-74058",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-66086",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-85544",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Modina-31442",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Western-88675",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-84758",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-66086",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-67291",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Modina-31442",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-38847",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-70589",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-27339",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Torongo-74058",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-batik/Amanat-Shah-Lungi---Caribbean-85544",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Pradhanno-58505",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Pradhanno-58505",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Pradhanno-44721",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Pradhanno-13377",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Pradhanno-48326",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Pradhanno-13377",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Onuvob-14294",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Pradhanno-48645",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Pradhanno-48645",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Onuvob-14294",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-57091",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-16468",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Good-Luck-64607",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-54154",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-97250",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-86053",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-57091",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-92234",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-54154",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-97250",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Good-Luck-64607",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-39255",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-86053",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-16468",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-39255",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Crown-79478",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-92234",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Crown-79478",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-61143",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-89916",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-32798",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-31466",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-62083",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-19763",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-34785",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-69825",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-27251",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Premium-Print-Panjabi-76738",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/garnet/White-Viscose-Panjabi-32509",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-90240",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/men/panjabi/Mens-Classic-Panjabi-77732",
    destination: "/men/panjabi",
    permanent: true,
  },
  {
    source: "/product/women/saree/Medium-Orchid-Half-Silk-Saree-87960",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Multicolor-Digital-Print-Saree-29994",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Multicolor-Digital-Print-Saree-71261",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Sky-Blue-Tant-Saree-23894",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-48960",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-51905",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-71261",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-95396",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-29994",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-41727",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-32075",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-60444",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-77300",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-81590",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-34084",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Sky-Blue-Tant-Saree-23894",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Pastel-Violet-Tant-Saree-61975",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Bright-Gold-Tant-Saree-85190",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Pastel-Orange-Tant-Saree-84624",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Deep-Peach-Tant-Saree-69981",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Dark-Almond-Tant-Saree-73364",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Abaya-A-1072-34644",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Abaya-With-Stone-Work-21386",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/V---Neck-Straight-Abaya-39565",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Butterfly-Sleeve-Abaya-16157",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Abaya-A--1059-13095",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-89722",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-67754",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-35604",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-55487",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-55397",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-92893",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-42565",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-51376",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-82413",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-60620",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/product/men/gamcha/Gamcha---Prokash-69466",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source:
      "/product/women/salwar-kameez/embroidery/print-and-embroidery-salwar-kameez-1",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/embroidery/print-and-embroidery-salwar-kameez-1",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/women/salwar-kameez/embroidery/print-embroidery-salwar-kameez-2",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/embroidery/print-embroidery-salwar-kameez-1",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/embroidery/print-embroidery-salwar-kameez-2",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/women/salwar-kameez/embroidery/print-and-embroidery-salwar-kameez",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/embroidery/print-and-embroidery-salwar-kameez",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source:
      "/product/women/salwar-kameez/embroidery/print-embroidery-salwar-kameez-1",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/maroon-poplin-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/dark-eggplant-poplin-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/tea-green-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/red-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/products/subcat/voile/red-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/products/subcat/voile/tea-green-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/tea-green-poplin-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/blue-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },

  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Antorongo-96144",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Antorongo-96144",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source: "/product/women/saree/Cactus-Green-Tant-Saree-49287",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/orange-poplin-fabrics-1",
    destination: "/others/poplin",
    permanent: true,
  },
  {
    source: "/product/products/subcat/voile/olive-voile-fabrics-1",
    destination: "/others/voile",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/olive-voile-fabrics-1",
    destination: "/others/voile",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/orange-voile-fabrics-1",
    destination: "/others/voile",
    permanent: true,
  },
  {
    source: "/product/products/subcat/voile/orange-voile-fabrics-1",
    destination: "/others/voile",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/print-batik/Amanat-Shah-Lungi---Caribbean-84758",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Prachurjo-31114",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Prachurjo-31114",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/products/subcat/stripe-check",
    destination: "/",
    permanent: true,
  },
  {
    source: "/products/subcat/hand-craft-tant",
    destination: "/",
    permanent: true,
  },

  {
    source: "/others/cut-fabrics/voile",
    destination: "/others/voile",
    permanent: true,
  },
  {
    source: "/others/cut-fabrics/poplin",
    destination: "/others/poplin",
    permanent: true,
  },
  {
    source: "/products/subcat/poplin",
    destination: "/others/poplin",
    permanent: true,
  },
  {
    source: "/men/gamcha",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/products/cat/gamcha",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/others/gamcha/medium",
    destination: "/others/medium",
    permanent: true,
  },
  {
    source: "/others/gamcha/large",
    destination: "/others/large",
    permanent: true,
  },

  {
    source: "/index.html",
    destination: "/",
    permanent: true,
  },
  {
    source: "/2415",
    destination: "/",
    permanent: true,
  },
  {
    source: "/1288",
    destination: "/",
    permanent: true,
  },
  {
    source: "/eid-",
    destination: "/",
    permanent: true,
  },
  {
    source: "/eid",
    destination: "/",
    permanent: true,
  },
  {
    source: "/products/subcat/stripe-check",
    destination: "/",
    permanent: true,
  },
  {
    source: "/products/subcat/hand-craft-tant",
    destination: "/",
    permanent: true,
  },
  {
    source: "/men/untitched",
    destination: "/",
    permanent: true,
  },

  // Abaya redirects
  {
    source: "/women/abaya/abaya-modern",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/women/abaya-modern",
    destination: "/women/abaya-modern",
    permanent: true,
  },
  {
    source: "/women/abaya/abaya-gorgeous",
    destination: "/women/abaya-gorgeous",
    permanent: true,
  },
  {
    source: "/women/abaya/abaya-premium",
    destination: "/women/abaya-premium",
    permanent: true,
  },
  {
    source: "/women/abaya/abaya-luxury",
    destination: "/women/abaya-luxury",
    permanent: true,
  },

  // Saree redirects
  {
    source: "/women/saree/print-saree",
    destination: "/women/print-saree",
    permanent: true,
  },
  {
    source: "/women/saree/tant-saree",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/women/saree/tant",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/women/saree/tangail-saree",
    destination: "/women/tangail-saree",
    permanent: true,
  },
  {
    source: "/women/saree/jamdani-saree",
    destination: "/women/jamdani-saree",
    permanent: true,
  },
  {
    source: "/women/saree/jamdani-",
    destination: "/women/jamdani-saree",
    permanent: true,
  },
  {
    source: "/women/saree/others",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/women/saree/hand-paint-saree",
    destination: "/women/hand-paint-saree",
    permanent: true,
  },
  {
    source: "/women/saree/half-silk-saree",
    destination: "/women/half-silk-saree",
    permanent: true,
  },
  {
    source: "/women/saree/jamdani-sharee",
    destination: "/women/jamdani-saree",
    permanent: true,
  },
  // Panjabi redirects
  {
    source: "/men/panjabi/jasper",
    destination: "/men/panjabi-jasper",
    permanent: true,
  },

  // Inner Vest redirects
  {
    source: "/men/inner-vest/inner-vest-regular",
    destination: "/men/inner-vest",
    permanent: true,
  },

  // Dhoti redirects
  {
    source: "/men/dhoti/untitched",
    destination: "/men",
    permanent: true,
  },

  // Pants redirects
  {
    source: "/men/pants/joggers",
    destination: "/men/jogger-pants",
    permanent: true,
  },
  {
    source: "/men/pants/chinopant",
    destination: "/men/chino-pants",
    permanent: true,
  },
  {
    source: "/men/pents/men-cargo-joggers",
    destination: "/men/cargo-joggers-pants",
    permanent: true,
  },
  {
    source: "/men/pants/jeans-",
    destination: "/men/jeans-pants",
    permanent: true,
  },
  {
    source: "/men/denim-pants",
    destination: "/men/jeans-pants",
    permanent: true,
  },

  // T-Shirt redirects
  {
    source: "/men/t",
    destination: "/men/t-shirt",
    permanent: true,
  },
  {
    source: "/men/t-shirt/drop-cut-tshirt",
    destination: "/men/drop-cut-t-shirt",
    permanent: true,
  },
  {
    source: "/men/t-shirt/over-size-t-shirts",
    destination: "/men/over-size-t-shirts",
    permanent: true,
  },
  {
    source: "/men/t-shirt/Over-sized-t-Shirts",
    destination: "/men/over-size-t-shirts",
    permanent: true,
  },
  {
    source: "/men/t_shirt/Over-sized-t-Shirts",
    destination: "/men/over-size-t-shirts",
    permanent: true,
  },
  {
    source: "/men/t-shirt/regular-t-shirt",
    destination: "/men/regular-t-shirt",
    permanent: true,
  },
  {
    source: "/me/lungi",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/men/lungi/dobby-jacquard",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/men/dobby",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/men/lungi/hand-painted-lungi",
    destination: "/men/hand-painted-lungi",
    permanent: true,
  },
  // Men's Lungi redirects
  {
    source: "/men/print-batik",
    destination: "/men/print-batik-lungi",
    permanent: true,
  },
  {
    source: "/men/solid",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/men/dobby-jacquard",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source: "/men/block_print",
    destination: "/men/block-print-lungi",
    permanent: true,
  },

  // Men's Panjabi redirects
  {
    source: "/men/premium",
    destination: "/men/turquoise-premium-panjabi",
    permanent: true,
  },
  {
    source: "/men/garnet",
    destination: "/mens/panjabi-garnet",
    permanent: true,
  },
  {
    source: "/men/opal",
    destination: "/mens/panjabi-opal",
    permanent: true,
  },
  {
    source: "/men/jasper",
    destination: "/mens/panjabi-jasper",
    permanent: true,
  },

  // Men's Clothing redirects
  {
    source: "/men/inner-vest-regular",
    destination: "/men/inner-vest",
    permanent: true,
  },
  {
    source: "/men/untitched-dhoti",
    destination: "/men",
    permanent: true,
  },
  {
    source: "/men/joggers",
    destination: "/men/jogger-pants",
    permanent: true,
  },
  {
    source: "/men/chinopant",
    destination: "/men/chino-pants",
    permanent: true,
  },
  {
    source: "/men/men-cargo-joggers",
    destination: "/men/cargo-joggers-pants",
    permanent: true,
  },
  {
    source: "/men/tshirt",
    destination: "/men/t-shirt",
    permanent: true,
  },
  {
    source: "/men/drop-cut-tshirt",
    destination: "/men/drop-cut-t-shirt",
    permanent: true,
  },

  // Women's Clothing redirects
  {
    source: "/women/print",
    destination: "/women/print-salwar-kameez",
    permanent: true,
  },
  {
    source: "/women/embroidery",
    destination: "/women/embroidery-salwar-kameez",
    permanent: true,
  },
  {
    source: "/women/hand-craft-tant",
    destination: "/women/hand-craft-tant-salwar-kameez",
    permanent: true,
  },
  {
    source: "/women/abaya-modern",
    destination: "/women/abaya-modern",
    permanent: true,
  },

  // Kids redirects
  {
    source: "/kids/kids-lungi",
    destination: "/kids/boys-lungi",
    permanent: true,
  },

  // Logo image redirects (all to single canonical location)
  {
    source: "/kids/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/kids/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/lungi/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/women/saree/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/t-shirt/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/women/top/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/img/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/women/salwar-kameez/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/pants/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/others/gamcha/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/others/cut-fabrics/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/women/abaya/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/dhoti/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/dhoti/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/men/panjabi/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/exclusive-trendz-product/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/women/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/page/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/others/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/others/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/exclusive-trendz-product/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/page/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/img/banners/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },
  {
    source: "/women/img/img/miah-logo-white.png",
    destination: "/img/miah-logo-white.png",
    permanent: true,
  },

  // Product image redirects (all to homepage)
  {
    source: "/product/s_thumb/WEB-FORMATE-NEW-SAVE-04.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Cotton_Dhoti_1006_006_2.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/Cotton_Dhoti_1006_006_2.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Cotton_Dhoti_1006_006_1.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/Cotton_Dhoti_1006_006_1.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//WEB-FORMATE-NEW-SAVE-04.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//null",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/WEB-FORMATE-NEW-SAVE-04.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(3).jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(2).jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(4).jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/WEB-FORMATE-NEW-SAVE-03.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/WEB-FORMATE-NEW-SAVE-01.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/s_thumb/Standard__Saree_Tant_Saree_1062_0818_-4.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/s_thumb/Tant_Saree_Tant_1030_B_8152_1.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/s_thumb/Tant_Saree_Tant_1030_A_8151_1.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/s_thumb/Cotton_Dhoti_1006_006_1.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Tant_Saree_Tant_1030_A_8151_2.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Tant_Saree_Tant_1030_A_8151_1.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Standard__Saree_Tant_Saree_1061_0816_-4.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Standard__Saree_Tant_Saree_1061_0816_-2.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Standard__Saree_Tant_Saree_1062_0818_-2.jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product//Standard__Saree_Tant_Saree_1062_0818_-4.jpg",
    destination: "/",
    permanent: true,
  },

  // Next.js image URL redirects
  {
    source: "/_next/image",
    destination: "/",
    permanent: true,
    has: [
      {
        type: "query",
        key: "url",
        value: "https%3A%2F%2Fimages.miah.shop%2Fproduct%2F.*",
      },
    ],
  },

  // Men's Shirt redirect
  // {
  //   source: "/men/mens%20shirt",
  //   destination: "/men/shirt",
  //   permanent: true,
  // },
  {
    source: "/women/abaya-modern",
    destination: "/women/abaya-modern",
    permanent: true,
  },

  // Women's Salwar Kameez redirects
  {
    source: "/women/salwar-",
    destination: "/women/salwar-kameez",
    permanent: true,
  },
  {
    source: "/women/salwar-kameez/hand-craft-tant",
    destination: "/women/hand-craft-tant-salwar-kameez",
    permanent: true,
  },

  // Women's Abaya redirect
  {
    source: "/women/abaya-modern",
    destination: "/women/abaya-modern",
    permanent: true,
  },

  // Women's Top redirect
  {
    source: "/women/top/kurti",
    destination: "/women/kurti",
    permanent: true,
  },

  {
    source: "/men/others/gamcha",
    destination: "/others/gamcha",
    permanent: true,
  },
  {
    source: "/men/mens shirt/casual-shirts",
    destination: "/men/casual-shirts",
    permanent: true,
  },
  {
    source: "/men/shirt/casual-shirts",
    destination: "/men/casual-shirts",
    permanent: true,
  },

  {
    source: "/men/pants/jogger-pants",
    destination: "/men/jogger-pants",
    permanent: true,
  },
  {
    source: "/men/Bottoms/Mens Chino Pant",
    destination: "/men/chino-pants",
    permanent: true,
  },
  {
    source: "/men/mens shirt/dress-shirts",
    destination: "/men/dress-shirts",
    permanent: true,
  },

  { source: "/men/solid-", destination: "/men", permanent: true },
  { source: "/men/tshirt/cuttshirt", destination: "/men", permanent: true },

  {
    source: "/details/yellow-cotton-silk-saree-1",
    destination: "/women/half-silk-saree",
    permanent: true,
  },
  {
    source: "/men/pants/men-cargo-joggers",
    destination: "/men/cargo-joggers-pants",
    permanent: true,
  },
  {
    source: "/women/abaya-modern",
    destination: "/women/abaya-modern",
    permanent: true,
  },

  {
    source: "/products/subcat/voile",
    destination: "/others/voile",
    permanent: true,
  },

  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Ashapurno-28938",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Pradhanno-89660",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Ullash-32714",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Showpno-Bilash-42077",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/Amanat-Shah-Lungi---Showpno-Bilash-91538",
    destination: "/men/lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/solid/Amanat-Shah-Lungi---Ashapurno-96916",
    destination: "/men/lungi",
    permanent: true,
  },

  {
    source: "/product/products/subcat/solid/Amanat-Shah-Lungi---Apurbo-57270",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Ashapurno-96916",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Showkhin-63784",
    destination: "/men/solid-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/solid/Amanat-Shah-Lungi---Apurbo-57270",
    destination: "/men/solid-lungi",
    permanent: true,
  },

  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Prachurjo-44861",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/dobby-jacquard/Amanat-Shah-Lungi---Good-Luck-32146",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Prachurjo-44861",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/dobby-jacquard/Amanat-Shah-Lungi---Good-Luck-32146",
    destination: "/men/dobby-jacquard-lungi",
    permanent: true,
  },

  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Ullash-32714",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source: "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Ullash-32714",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Pradhanno-89660",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Ashapurno-28938",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Showpno-Bilash-42077",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Showpno-Bilash-91538",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Showpno-Bilash-42077",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Pradhanno-44721",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Antorongo-96144",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/products/subcat/stripe-check/Amanat-Shah-Lungi---Ashapurno-28938",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Showpno-Bilash-91538",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },
  {
    source:
      "/product/men/lungi/stripe-check/Amanat-Shah-Lungi---Pradhanno-89660",
    destination: "/men/stripe-check-lungi",
    permanent: true,
  },

  {
    source: "/product/women/saree/Pastel-Red-Half-Silk-Saree-54780",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Fluro-Orange-Half-Silk-Saree-37625",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Blue-Gray-Half-Silk-Saree-82856",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Tyrian-Purple-Half-Silk-Saree-70049",
    destination: "/women/saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/Magenta--Ocean-Blue-Half-Silk-Saree-87874",
    destination: "/women/saree",
    permanent: true,
  },

  {
    source:
      "/product/products/subcat/print-saree/Multicolor-Digital-Print-Saree-82060",
    destination: "/women/print-saree",
    permanent: true,
  },

  {
    source: "/product/women/saree/tant-saree/Orchid-Purple-Tant-Saree-57404",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Cactus-Green-Tant-Saree-49287",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source: "/product/women/saree/tant-saree/Mango-Orange-Tant-Saree-85399",
    destination: "/women/tant-saree",
    permanent: true,
  },
  {
    source:
      "/product/women/saree/tant-saree/Light-Purple-Blue-Tant-Saree-19951",
    destination: "/women/tant-saree",
    permanent: true,
  },

  {
    source: "/products/subcat/tangail-saree",
    destination: "/women/tangail-saree",
    permanent: true,
  },

  {
    source:
      "/product/women/abaya/abaya-modern/Floral-Design-Velvet-Abaya-60648",
    destination: "/women/abaya",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Abaya-A--1059-94724",
    destination: "/women/abaya",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Abaya-A-1049-32980",
    destination: "/women/abaya",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Abaya-A-1083-49961",
    destination: "/women/abaya",
    permanent: true,
  },
  {
    source:
      "/product/women/abaya/abaya-modern/Floral-Design-Velvet-Abaya-22304",
    destination: "/women/abaya",
    permanent: true,
  },
  {
    source: "/product/women/abaya/abaya-modern/Straight-Abaya-59297",
    destination: "/women/abaya",
    permanent: true,
  },

  {
    source: "/product/products/subcat/voile/yellow-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/yellow-voile-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },
  {
    source: "/product/others/cut-fabrics/hot-pink-poplin-fabrics-1",
    destination: "/others/cut-fabrics",
    permanent: true,
  },

  {
    source: "/product/men/gamcha/Gamcha---Prokash-37032",
    destination: "/others/gamcha",
    permanent: true,
  },

  {
    source: "/plugins/owl-carousel/assets/owl.video.play.png",
    destination: "/",
    permanent: true,
  },
  {
    source: "/dashboard/img/img/miah-logo-white.png",
    destination: "/",
    permanent: true,
  },

  {
    source: "/banner",
    destination: "/kids",
    permanent: true,
  },
  {
    source: "/banner/null",
    destination: "/men",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(4).jpg",
    destination: "/men/t-shirt",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(3).jpg",
    destination: "/men/t-shirt",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(2).jpg",
    destination: "/men/t-shirt",
    permanent: true,
  },

  {
    source: "/product/m_thumb/9135-(3).jpg",
    destination: "/",
    permanent: true, // 301 redirect
  },
  {
    source: "/product/m_thumb/9135-(2).jpg",
    destination: "/",
    permanent: true,
  },
  {
    source: "/product/m_thumb/9135-(4).jpg",
    destination: "/",
    permanent: true,
  },

  { source: "/_next/image", destination: "/", permanent: true },
];

module.exports = redirects;
