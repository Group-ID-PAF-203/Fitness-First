import { Dropdown, Menu } from "antd";
import { BellFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import NotificationService from "../../Services/NotificationService";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const snap = useSnapshot(state);
  useEffect(() => {
    NotificationService.getAllNotifications().then((res) => {
      let not = res.filter(
        (notfication) => snap.currentUser?.uid === notfication.userId
      );
      setNotifications(not);
    });
  }, []);

  const notificationMenu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item key={notification.id}>
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.description}</p>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={notificationMenu} trigger={["click"]}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <BellFilled />
      </a>
    </Dropdown>
  );
};

export default NotificationsDropdown;
