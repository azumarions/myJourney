import Cookie from "universal-cookie"

const cookie = new Cookie();


 export const createProf = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile/`,
        {
          method: 'POST',
          body: JSON.stringify({ name: 'user' }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 401) {
          throw 'JWT Token not valid';
        } else if (res.ok) {
          return res.json();
        }
      });
    } catch (err) {
      alert(err);
    }
};

export const getProf = async () => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 401) {
        throw 'JWT Token not valid';
      } else if (res.ok) {
        console.log(res)
        return res.json();
      }
    });
  } catch (err) {
    alert(err);
  }
};

export const getMyProf = async () => {
  try {
    await fetch(
      `${process.env.NEXT_PUblic_RESTAPI_URL}/api/myprofile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    )
    .then((res) => {
      if (res.status == 401) {
        throw 'JWT Token not valid';
      } else if (res.ok) {
        return res.json();
      }
    });
  } catch (err) {
    alert(err);
  }
};

// export const fetchAsyncUpdateProf = createAsyncThunk(
//     "profile/put",
//     async (profile: PROPS_PROFILE) => {
//       const uploadData = new FormData();
//       uploadData.append("nickName", profile.nickName);
//       profile.img && uploadData.append("img", profile.img, profile.img.name);
//       const res = await axios.put(
//         `${apiUrl}api/profile/${profile.id}/`,
//         uploadData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `JWT ${localStorage.localJWT}`,
//           },
//         }
//       );
//       return res.data;
//     }
//   );
  
//   export const fetchAsyncGetMyProf = createAsyncThunk("profile/get", async () => {
//     const res = await axios.get(`${apiUrl}api/myprofile/`, {
//       headers: {
//         Authorization: `JWT ${localStorage.localJWT}`,
//       },
//     });
//     return res.data[0];
//   });
  
//   export const fetchAsyncGetProfs = createAsyncThunk("profiles/get", async () => {
//     const res = await axios.get(`${apiUrl}api/profile/`, {
//       headers: {
//         Authorization: `JWT ${localStorage.localJWT}`,
//       },
//     });
//     return res.data;
//   });