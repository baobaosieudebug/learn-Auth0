import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import {getConfig} from "../config";
// const config = getConfig();
//
// const Profile = () => {
//     const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//     const [userMetadata, setUserMetadata] = useState(null);
//
//     useEffect(() => {
//         const getUserMetadata = async () => {
//             const domain = "dev-ocwjob8q.us.auth0.com";
//
//             try {
//                 const accessToken = await getAccessTokenSilently({
//                     audience: `https://${domain}/api/v2/`,
//                     scope: config.scope,
//                 });
//
//                 const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
//
//                 const metadataResponse = await fetch(userDetailsByIdUrl, {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//
//                 const { user_metadata } = await metadataResponse.json();
//
//                 setUserMetadata(user_metadata);
//             } catch (e) {
//                 console.log(e.message);
//             }
//         };
//
//         getUserMetadata();
//     }, [getAccessTokenSilently, user?.sub]);
//
//     return (
//         isAuthenticated && (
//             <div>
//                 <img src={user.picture} alt={user.name} />
//                 <h2>{user.name}</h2>
//                 <p>{user.email}</p>
//                 <h3>User Metadata</h3>
//                 {userMetadata ? (
//                     <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
//                 ) : (
//                     "No user metadata defined"
//                 )}
//             </div>
//         )
//     );
// };
//
// export default Profile;