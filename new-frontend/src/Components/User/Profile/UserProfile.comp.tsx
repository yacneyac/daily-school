import React from "react";
import { Card, CardContent, CardHeader, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import UserPublicSettings from "./UserPublicSettings.comp";
import UserEmailSetting from "./UserEmailSetting.comp";
import UserPasswordSetting from "./UserPasswordSetting.comp";
import { BaseProgress } from "../../BaseComp/BaseProgress.comp";
import { StoreState } from "../../../types";

const UserProfile = () => {
  const { user, isLoading } = useSelector((state: StoreState) => state.user);

  // const accessToken = sessionStorage.getItem("accessToken");
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user.id && accessToken) {
  //     console.log("RUN getUserProfile in UserProfile");
  //     dispatch(getUserProfile());
  //   }
  // }, [user.id, dispatch]);

  console.log("UserProfile -->", user);

  return isLoading ? (
    <BaseProgress />
  ) : (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card className="userProfileCard">
            <CardHeader title="Public Settings" />
            <CardContent>
              <UserPublicSettings />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className="userProfileCard">
            <CardHeader title="Email" />
            <CardContent>
              <UserEmailSetting />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className="userProfileCard">
            <CardHeader title="Password" />
            <CardContent>
              <UserPasswordSetting />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
