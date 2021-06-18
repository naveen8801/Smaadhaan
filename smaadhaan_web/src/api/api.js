import axios from 'axios';

// export const url =
//   'https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api';

export const url = 'http://localhost:5000/api';

export const login = (logindata) =>
  axios.post(`${url}/login`, logindata, { withCredentials: true });
export const signin = (signindata) =>
  axios.post(`${url}/signup`, signindata, { withCredentials: true });
export const getorgprofile = () =>
  axios.get(`${url}/profile`, { withCredentials: true });
export const getallrequests = () => axios.get(`${url}/all-request`);
export const sendsms = (number) =>
  axios.post(`${url}/outgoingsms`, number, { withCredentials: true });
export const acceptrequest = (id) =>
  axios.post(`${url}/accept-request`, id, { withCredentials: true });
export const logout = () =>
  axios.get(`${url}/logout`, { withCredentials: true });

/*  
router.post('/login', login);
router.post('/signup', register);
router.post('/incomingsms', incomingsms);
router.post('/outgoingsms', requireAuth, outgoingsms);
router.post('/submit-request', postrequest);
router.post('/accept-request', requireAuth, acceptRequest);
router.get('/profile', requireAuth, profile);
router.get('/all-request', getRequests);
router.get('/all-data', allData);
*/
