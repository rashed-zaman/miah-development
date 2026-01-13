import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CategoryList({ categories }) {
  const router = useRouter();
  const [value, setValue] = useState("all");

  // ✅ Update tab based on current URL
  useEffect(() => {
    const path = router.asPath;
    if (path === "/blog") {
      setValue("all");
    } else if (path.startsWith("/blog/category/")) {
      const slug = path.split("/category/")[1];
      console.log({ slug });

      setValue(slug.replaceAll("-", " ").toUpperCase());
    }
  }, [router.asPath]);

  const handleChange = (event, newValue) => {
    setValue(newValue); // instant UI update
    if (newValue === "all") {
      router.push("/blog");
    } else {
      console.log("=========", newValue.replaceAll(" ", "-").toLowerCase());
      router.push(
        `/blog/category/${newValue.replaceAll(" ", "-").toLowerCase()}`
      );
    }
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto" // ✅ must be "auto", not boolean
      allowScrollButtonsMobile // ✅ ensures visible on mobile
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
        <Tab label={cat.name} value={cat.name.toUpperCase()} key={cat.id} />
      ))}
    </Tabs>
  );
}
