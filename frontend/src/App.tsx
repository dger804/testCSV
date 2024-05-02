
import './App.css'

function App() {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []
    console.log(file)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("todo")
  }

  return (
    <>
      <h4>Challenge: Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={handleInputChange}
            name='file'
            type="file"
            accept='.csv'
          />
        </label>
        <button>
          Subir archivo
        </button>
      </form>
    </>
  )
}

export default App
