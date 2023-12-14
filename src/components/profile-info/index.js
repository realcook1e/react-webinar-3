import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

import "./style.css";

function ProfileInfo({ user, t }) {
  const cn = bem("ProfileInfo");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("profile.title")}</h2>
      <div className={cn("data")}>
        <div className={cn("name")}>
          <span className={cn("name--label")}>{t("profile.name")}: </span>
          <span className={cn("name--value")}>{user?.profile?.name}</span>
        </div>
        <div className={cn("phone")}>
          <span className={cn("phone--label")}>{t("profile.phone")}: </span>
          <span className={cn("phone--value")}>{user?.profile?.phone}</span>
        </div>
        <div className={cn("email")}>
          <span className={cn("email--label")}>email: </span>
          <span className={cn("email--value")}>{user?.email}</span>
        </div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default memo(ProfileInfo);
