import {
  BookOutlined,
  MailOutlined,
  MenuOutlined,
  PlusOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, GetProp, MenuProps } from "antd";
import { useRecoilState } from "recoil";
import { NavItem, SelectedNavItem } from "../../storage/RecoilState";
import { useNavigate } from "react-router-dom";

type MenuItem = GetProp<MenuProps, "items">[number];
const items: MenuItem[] = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Merchant Management",
    children: [
      {
        key: NavItem.MerchantOnboarding,
        icon: <UserAddOutlined />,
        label: "Add New Merchant",
      },
      {
        key: NavItem.MerchantList,
        icon: <UserOutlined />,
        label: "Onboarded Merchants",
      },
    ],
  },
  {
    key: "2",
    icon: <ShopOutlined />,
    label: "Restaurant Management",
    children: [
      {
        key: NavItem.RestaurantCreate,
        icon: <PlusOutlined />,
        label: "Add New Restaurant",
      },
      {
        key: NavItem.RestaurantList,
        icon: <MenuOutlined />,
        label: "Onboarded Restaurants",
      },
    ],
  },
  {
    key: NavItem.MenuDemo,
    label: "Menu Demo (Take a Tour)",
    icon: <BookOutlined />,
  },
  // { type: "divider" },
  // { key: "2", label: "Domain Management" },
  // { type: "divider" },
  // { key: "3", label: "Order Metrics" },
];

export function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedNavItem, setSelectedNavItem] = useRecoilState(SelectedNavItem);
  const navigate = useNavigate();

  const onMenuItemClick = ({ key }) => {
    switch (key) {
      case NavItem.MerchantOnboarding:
        navigate("/merchant/create");
        break;
      case NavItem.MerchantList:
        navigate("/merchant/list");
        break;
      case NavItem.RestaurantCreate:
        navigate("/restaurant/create");
        break;
      case NavItem.RestaurantList:
        navigate("/restaurant/list");
        break;
      case NavItem.MenuDemo:
        navigate("/menu");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Menu
      selectedKeys={[selectedNavItem]}
      defaultOpenKeys={["1"]}
      mode="inline"
      items={items}
      onClick={onMenuItemClick}
    />
  );
}
