import DataFetcher from './components/DataFetcher'

const App = () => {
  return (
    <div className="container">
      <div className="col-6 mx-auto">
        <h2 className="text-center my-5">Users list</h2>
        <DataFetcher />
      </div>
    </div>
  )
}

export default App
