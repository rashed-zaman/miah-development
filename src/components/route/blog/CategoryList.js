"use client";

import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function CategoryList({ categories }) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Next 15 replacement for asPath
  const [value, setValue] = useState("all");

  // ✅ Update tab based on current URL
  useEffect(() => {
    if (pathname === "/blog") {
      setValue("all");
    } else if (pathname.startsWith("/blog/category/")) {
      const slug = pathname.split("/category/")[1];
      setValue(slug.replaceAll("-", " ").toUpperCase());
    }
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue); // instant UI update

    if (newValue === "all") {
      router.push("/blog");
    } else {
      router.push(
        "/blog/category/" + newValue.replaceAll(" ", "-").toLowerCase()
      );
    }
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="scrollable categories"
      sx={{
        "& .MuiTab-root": {
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 500,
          fontFamily: "'Poppins', sans-serif",
          color: "#333",
        },
        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.3,
        },
      }}
    >
      <Tab label="All" value="all" />
      {categories.map((cat) => (
        <Tab
          key={cat.id}
          label={cat.name}
          value={cat.name.toUpperCase()}
        />
      ))}
    </Tabs>
  );
}
