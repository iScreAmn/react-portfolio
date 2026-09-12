import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocaleHomeData } from "./useLocaleHomeData";

const ROUTE_SECTIONS = [
  { prefix: "/services", id: "services" },
  { prefix: "/portfolio", id: "portfolio" },
  { prefix: "/contacts", id: "contact" },
  { prefix: "/hobby", id: "hobby" },
  { prefix: "/about", id: "about" },
];

/**
 * Shared navigation state for the desktop nav bar and the mobile dropdown, so
 * both mark the same item as current and follow the same routing rules.
 */
export function useSiteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { navItems, navMenu } = useLocaleHomeData();
  const [activeSection, setActiveSection] = useState("home");

  const goToNavItem = useCallback(
    (item) => {
      setActiveSection(item.id);

      if (item.type === "route") {
        navigate(item.path);
        return;
      }

      // A section lives on the home page: route there first when we are away.
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: item.id } });
        return;
      }

      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    const matchedRoute = ROUTE_SECTIONS.find((route) =>
      location.pathname.startsWith(route.prefix)
    );

    if (matchedRoute) {
      setActiveSection(matchedRoute.id);
      return;
    }

    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sectionItems = navItems.filter((item) => item.type === "section");
      const scrollPosition = window.scrollY + 100;

      sectionItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(item.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navItems]);

  return { navItems, navMenu, activeSection, goToNavItem };
}
