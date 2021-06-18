import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getorgprofile, getallrequests } from './../../api/api';
import { useDataLayerValues } from '../../ContextApi/datalayer';
import InfoCard from './InfoCard/InfoCard';
import UserCard from './UserCard/UserCard';
function Profile() {
  const [userdetails, setuserdetails] = useState(null);
  const [{ details, AcceptedUser, AllRequest }, dispatch] =
    useDataLayerValues();
  useEffect(() => {
    try {
      const getprofile = getorgprofile().then((res) => {
        const datauser = {
          org_id: res.data._id,
          username: res.data.username,
          org_name: res.data.org_name,
          location: res.data.location,
        };
        const AcceptedUser = res.data.accepted_requests;
        dispatch({
          type: 'SET_DETAILS',
          details: datauser,
        });
        dispatch({
          type: 'SET_ACCEPTEDUSER',
          AcceptedUser: AcceptedUser,
        });
      });
      const getallusers = getallrequests().then((res) => {
        try {
          const allrequests = res.data;
          dispatch({
            type: 'SET_ALL_REQUESTS',
            AllRequest: allrequests,
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  
  return (
    <div className="profile">
      <div className="flexbox-details">
        <InfoCard value={details.org_name} title="Welcome" />
        <InfoCard value={details.org_id} title="User Id" />
        <InfoCard value={details.username} title="Username" />
        <InfoCard value={details.location} title="Location" />
        <InfoCard value={AcceptedUser.length} title="No.of Accepted Requests" />
      </div>
      <div className="full-flex">
        <div className="full">
          <h2 className="title_main_heading">Accepted Requests</h2>
          <div className="flexbox-details">
            {AcceptedUser.length === 0 ? (
              <h5 style={{ margin: '0' }}>
                There are no users accepted by you
              </h5>
            ) : (
              <>
                {AcceptedUser.map((i) => (
                  <UserCard
                    key={i._id}
                    accepted={i.accepted}
                    id={i._id}
                    name={i.name}
                    problem={i.problem}
                    contact_no={i.phone_number}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="full-flex">
        <div className="full">
          <h2 className="title_main_heading">Active Requests</h2>
          <div className="flexbox-details">
            {AllRequest.length === 0 ? (
              <h5 style={{ margin: '0' }}>
                There are no users accepted by you
              </h5>
            ) : (
              <>
                {AllRequest.map((i) => (
                  <UserCard
                    key={i._id}
                    accepted={i.accepted}
                    id={i._id}
                    name={i.name}
                    problem={i.problem}
                    contact_no={i.phone_number}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
