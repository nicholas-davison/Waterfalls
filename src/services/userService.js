export const getUserByEmail = (email) => {
  return fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("https://fallsfinder-api-adhim.ondigitalocean.app/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserProfileById = async (userId) => {
  return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/users/${userId}`).then(res => res.json())
}

export const saveUserProfileChanges = async (userObj) => {
  return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/users/${userObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
}