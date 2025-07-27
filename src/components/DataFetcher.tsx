import { useEffect, useState } from 'react'
import { fetchData, fetchUserById } from '../utils/api'
import type { UserInterface } from '../types/user.interface'

const DataFetcher = () => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null)
  const [id, setId] = useState<number>(1)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [errorUsers, setErrorUsers] = useState<string | null>(null)
  const [errorUser, setErrorUser] = useState<string | null>(null)

  // Fetch all users once
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoadingUsers(true)
        const data = await fetchData()
        setUsers(data)
        setErrorUsers(null)
      } catch (error) {
        setErrorUsers((error as Error).message)
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchAllUsers()
  }, [])

  // Fetch selected user on ID change
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoadingUser(true)
        const user = await fetchUserById(id)
        setSelectedUser(user)
        setErrorUser(null)
      } catch (error) {
        setErrorUser((error as Error).message)
        setSelectedUser(null)
      } finally {
        setLoadingUser(false)
      }
    }

    if (id > 0) {
      getUser()
    }
  }, [id])

  return (
    <div>
      <h3>All Users</h3>
      {loadingUsers && <p>Loading users...</p>}
      {errorUsers && <p style={{ color: 'red' }}>{errorUsers}</p>}
      {users.length > 0 && (
        <ul className="list-group mb-4">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.name} — {user.email}
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h3>Get User by ID</h3>
      <div className="mb-3">
        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          value={id}
          min={1}
          max={10}
          onChange={(e) => setId(Number(e.target.value))}
          className="form-control"
        />
      </div>

      {loadingUser && <p>Loading user...</p>}
      {errorUser && <p style={{ color: 'red' }}>{errorUser}</p>}
      {selectedUser && (
        <div className="card p-3 mt-2">
          <h5>{selectedUser.name}</h5>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>
        </div>
      )}
    </div>
  )
}

export default DataFetcher
