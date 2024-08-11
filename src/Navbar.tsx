import { MailOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, GetProp, MenuProps, MenuItemProps } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { LayoutState, NavItem, selectedNavItem } from "./RecoilState";
import { MenuItemGroupType } from "antd/es/menu/interface";

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
  { type: "divider" },
  { key: "2", label: "Domain Management" },
  { type: "divider" },
  { key: "3", label: "Order Metrics" },
];

export function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelectedNavItem] = useRecoilState(selectedNavItem);
  return (
    <div>
      <Menu
        defaultSelectedKeys={[NavItem.MerchantOnboarding]}
        mode="inline"
        items={items}
        onClick={({ key }) => {
          //@ts-ignore
          setSelectedNavItem(key);
        }}
      />
    </div>
  );
}
