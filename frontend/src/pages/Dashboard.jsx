


const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))

  return (
      <div>
          <h2>Welcome, {user?.name}</h2>
          <p>{user?.email}</p>
          
          <button onClick={() =>
              {localStorage.clear(); window.location.href = '/login'}}>
          Logout
          </button>

      
      </div>
      
  )
}

export default Dashboard
